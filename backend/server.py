from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# Optional Resend integration
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "").strip()
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
NOTIFICATION_EMAIL = os.environ.get("NOTIFICATION_EMAIL", "").strip()

resend_client = None
if RESEND_API_KEY:
    try:
        import resend as _resend
        _resend.api_key = RESEND_API_KEY
        resend_client = _resend
    except Exception as _e:
        resend_client = None

# App + router
app = FastAPI(title="OverxaTech API")
api_router = APIRouter(prefix="/api")

# ---------- Models ----------
class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    business: Optional[str] = Field(default="", max_length=160)
    email: EmailStr
    phone: Optional[str] = Field(default="", max_length=40)
    service: Optional[str] = Field(default="", max_length=80)
    budget: Optional[str] = Field(default="", max_length=80)
    message: str = Field(min_length=1, max_length=4000)


class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    business: Optional[str] = ""
    email: EmailStr
    phone: Optional[str] = ""
    service: Optional[str] = ""
    budget: Optional[str] = ""
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# ---------- Helpers ----------
def _contact_email_html(c: Contact) -> str:
    return f"""
    <div style="font-family:Arial,sans-serif;background:#050816;color:#fff;padding:32px;border-radius:16px;max-width:640px;margin:auto;">
      <h2 style="margin:0 0 16px 0;color:#00E5FF;">New Lead — OverxaTech</h2>
      <table style="width:100%;border-collapse:collapse;color:#A8B2D1;">
        <tr><td style="padding:6px 0;"><strong style="color:#fff;">Name:</strong></td><td>{c.name}</td></tr>
        <tr><td style="padding:6px 0;"><strong style="color:#fff;">Business:</strong></td><td>{c.business or '-'}</td></tr>
        <tr><td style="padding:6px 0;"><strong style="color:#fff;">Email:</strong></td><td>{c.email}</td></tr>
        <tr><td style="padding:6px 0;"><strong style="color:#fff;">Phone:</strong></td><td>{c.phone or '-'}</td></tr>
        <tr><td style="padding:6px 0;"><strong style="color:#fff;">Service:</strong></td><td>{c.service or '-'}</td></tr>
        <tr><td style="padding:6px 0;"><strong style="color:#fff;">Budget:</strong></td><td>{c.budget or '-'}</td></tr>
      </table>
      <p style="margin-top:16px;color:#fff;"><strong>Message</strong></p>
      <p style="color:#A8B2D1;white-space:pre-line;">{c.message}</p>
      <p style="margin-top:24px;color:#6C63FF;font-size:12px;">Received {c.created_at.isoformat()}</p>
    </div>
    """


async def _send_notification(c: Contact) -> None:
    if not resend_client or not NOTIFICATION_EMAIL:
        return
    params = {
        "from": SENDER_EMAIL,
        "to": [NOTIFICATION_EMAIL],
        "subject": f"New Lead — {c.name} ({c.business or 'OverxaTech'})",
        "html": _contact_email_html(c),
    }
    try:
        await asyncio.to_thread(resend_client.Emails.send, params)
    except Exception as e:
        logging.getLogger(__name__).error(f"Resend send failed: {e}")


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "OverxaTech API online"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "email_enabled": bool(resend_client and NOTIFICATION_EMAIL)}


@api_router.post("/contact", response_model=Contact, status_code=201)
async def create_contact(payload: ContactCreate):
    contact = Contact(**payload.model_dump())
    doc = contact.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    try:
        await db.contacts.insert_one(doc)
    except Exception as e:
        logging.getLogger(__name__).error(f"Mongo insert failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to save contact")
    # Fire and forget email
    asyncio.create_task(_send_notification(contact))
    return contact


@api_router.get("/contacts", response_model=List[Contact])
async def list_contacts():
    docs = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    for d in docs:
        if isinstance(d.get("created_at"), str):
            d["created_at"] = datetime.fromisoformat(d["created_at"])
    return docs


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for c in checks:
        if isinstance(c.get("timestamp"), str):
            c["timestamp"] = datetime.fromisoformat(c["timestamp"])
    return checks


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
