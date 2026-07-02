"""Backend regression tests for OverxaTech contact API (iteration 2)."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL") or open("/app/frontend/.env").read().split("REACT_APP_BACKEND_URL=")[1].split("\n")[0].strip()
API = f"{BASE_URL.rstrip('/')}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Health check
def test_health(client):
    r = client.get(f"{API}/health", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data["status"] == "ok"
    assert "email_enabled" in data


# Happy path
def test_contact_valid_full_payload(client):
    payload = {
        "name": "TEST_Alice Iteration2",
        "business": "TEST Corp",
        "email": "test_iter2@example.com",
        "phone": "+91 99999 88888",
        "service": "AI Automation",
        "budget": "$5k – $10k / mo",
        "message": "This is an iteration 2 regression test message."
    }
    r = client.post(f"{API}/contact", json=payload, timeout=15)
    assert r.status_code == 201, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["message"] == payload["message"]
    assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
    assert "created_at" in data
    # Verify persistence
    list_r = client.get(f"{API}/contacts", timeout=15)
    assert list_r.status_code == 200
    ids = [c["id"] for c in list_r.json()]
    assert data["id"] in ids


# Happy path minimal (BookCall modal payload style: no budget)
def test_contact_valid_bookcall_payload(client):
    payload = {
        "name": "TEST_BookCallUser",
        "business": "",
        "email": "test_bookcall@example.com",
        "phone": "",
        "service": "AI Automation",
        "budget": "",
        "message": "Requested a strategy call"
    }
    r = client.post(f"{API}/contact", json=payload, timeout=15)
    assert r.status_code == 201, r.text
    data = r.json()
    assert data["email"] == payload["email"]


# Validation - invalid email
def test_contact_invalid_email(client):
    payload = {"name": "TEST_Bob", "email": "foo@bar", "message": "hello"}
    r = client.post(f"{API}/contact", json=payload, timeout=15)
    assert r.status_code == 422
    body = r.json()
    assert "detail" in body
    assert isinstance(body["detail"], list)


# Validation - missing required name
def test_contact_missing_name(client):
    payload = {"name": "", "email": "test@example.com", "message": "hello"}
    r = client.post(f"{API}/contact", json=payload, timeout=15)
    assert r.status_code == 422


# Validation - missing required message
def test_contact_missing_message(client):
    payload = {"name": "TEST_NoMsg", "email": "test@example.com", "message": ""}
    r = client.post(f"{API}/contact", json=payload, timeout=15)
    assert r.status_code == 422


# GET /api/contacts sanity
def test_list_contacts(client):
    r = client.get(f"{API}/contacts", timeout=15)
    assert r.status_code == 200
    body = r.json()
    assert isinstance(body, list)


# Legacy status endpoints
def test_status_create_and_list(client):
    r = client.post(f"{API}/status", json={"client_name": "TEST_iter2"}, timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data["client_name"] == "TEST_iter2"
    r2 = client.get(f"{API}/status", timeout=15)
    assert r2.status_code == 200
