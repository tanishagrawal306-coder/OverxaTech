import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { CONTACT } from "@/constants/testIds";
import { submitContact } from "@/lib/api";
import { toast } from "sonner";

const SERVICE_OPTIONS = ["AI Automation", "Meta Ads", "Google Ads", "Website / Funnels", "SEO", "Analytics", "Other"];
const BUDGET_OPTIONS = ["< $5k / mo", "$5k – $10k / mo", "$10k – $25k / mo", "$25k+ / mo", "Not sure yet"];

const initialForm = { name: "", business: "", email: "", phone: "", service: "AI Automation", budget: "$5k – $10k / mo", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const change = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!EMAIL_RE.test(form.email.trim())) e.email = "Please enter a valid email.";
    if (!form.message.trim()) e.message = "Please tell us a bit about your project.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please check the highlighted fields.");
      return;
    }
    setLoading(true);
    try {
      await submitContact(form);
      toast.success("Thanks — we'll be in touch within 24 hours.");
      setSent(true);
      setForm(initialForm);
      setErrors({});
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      let msg = "We couldn't send your enquiry. Please try again.";
      if (Array.isArray(detail) && detail[0]?.msg) {
        const field = detail[0].loc?.slice(-1)?.[0] || "field";
        msg = `${field}: ${detail[0].msg}`;
      } else if (typeof detail === "string") {
        msg = detail;
      } else if (err?.message === "Network Error") {
        msg = "Network error — please check your connection and retry.";
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="blob w-[600px] h-[600px] top-10 -left-40 bg-[#6C63FF]" />
      <div className="blob w-[520px] h-[520px] bottom-0 right-0 bg-[#00E5FF]" />
      <div className="container-wide relative grid gap-16 lg:grid-cols-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="lg:col-span-5"
        >
          <div className="flex items-center gap-2 font-mono-label text-[#00E5FF]">
            <Sparkles size={14} /> Let&apos;s Talk
          </div>
          <h1 className="mt-4 font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter">
            Build something <span className="text-gradient">unignorable</span>.
          </h1>
          <p className="mt-6 text-lg text-[#A8B2D1] max-w-md leading-relaxed">
            Tell us where you are and where you want to be. We&apos;ll respond within 24 hours with a proposed plan.
          </p>

          <div className="mt-10 space-y-5">
            <ContactRow icon={Mail} label="Email" value="info.overxatech@gmail.com" href="mailto:info.overxatech@gmail.com" />
            <ContactRow icon={Phone} label="Phone" value="+91 96645 88762" href="tel:+919664588762" />
            <ContactRow icon={MapPin} label="Location" value="Grand Square 201, nr. Taj Hotel, Sindhubhavan Road, Ahmedabad, Gujarat, India" />
          </div>
        </motion.div>

        <motion.form
          onSubmit={submit}
          noValidate
          data-testid={CONTACT.form}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-7 gradient-border"
        >
          <div className="rounded-[1.25rem] glass-strong p-8 md:p-10">
            <h2 className="font-display text-2xl font-extrabold mb-6">Project Enquiry</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Field id={CONTACT.name} label="Full name *" value={form.name} onChange={change("name")} error={errors.name} placeholder="Jane Cooper" />
              <Field id={CONTACT.business} label="Business" value={form.business} onChange={change("business")} placeholder="Acme Inc." />
              <Field id={CONTACT.email} label="Work email *" type="email" value={form.email} onChange={change("email")} error={errors.email} placeholder="you@company.com" />
              <Field id={CONTACT.phone} label="Phone" value={form.phone} onChange={change("phone")} placeholder="+91 98765 43210" />
              <Select id={CONTACT.service} label="Service of interest" value={form.service} onChange={change("service")} options={SERVICE_OPTIONS} />
              <Select id={CONTACT.budget} label="Monthly budget" value={form.budget} onChange={change("budget")} options={BUDGET_OPTIONS} />
            </div>
            <div className="mt-4">
              <label className="block font-mono-label text-[#A8B2D1] mb-2">Tell us about your project *</label>
              <textarea
                data-testid={CONTACT.message}
                rows={5}
                value={form.message}
                onChange={change("message")}
                aria-invalid={!!errors.message}
                className={`w-full rounded-xl bg-[#0b1224] border px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 transition resize-none ${
                  errors.message ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/30" : "border-white/10 focus:border-[#6C63FF] focus:ring-[#6C63FF]/30"
                }`}
                placeholder="Where you are, where you want to go, timelines, anything else…"
              />
              {errors.message && <FieldError text={errors.message} />}
            </div>
            <button
              type="submit"
              data-testid={CONTACT.submit}
              disabled={loading}
              className="glow-btn mt-6 disabled:opacity-70"
            >
              {loading ? "Sending…" : sent ? "Sent ✓" : (<><span>Send enquiry</span><ArrowRight size={16} className="ml-2" /></>)}
            </button>
            <p className="mt-4 text-xs text-[#A8B2D1]">We reply within 24 hours. Your info is confidential.</p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

const ContactRow = ({ icon: Icon, label, value, href }) => (
  <div className="flex items-start gap-4">
    <div className="glass rounded-xl p-3">
      <Icon size={18} className="text-[#00E5FF]" />
    </div>
    <div>
      <div className="font-mono-label text-[#A8B2D1]">{label}</div>
      {href ? (
        <a href={href} className="text-white text-base hover:text-[#00E5FF] transition-colors">{value}</a>
      ) : (
        <div className="text-white text-base max-w-sm leading-relaxed">{value}</div>
      )}
    </div>
  </div>
);

const Field = ({ id, label, error, ...props }) => (
  <div>
    <label className="block font-mono-label text-[#A8B2D1] mb-2">{label}</label>
    <input
      data-testid={id}
      aria-invalid={!!error}
      {...props}
      className={`w-full rounded-xl bg-[#0b1224] border px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 transition ${
        error ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/30" : "border-white/10 focus:border-[#6C63FF] focus:ring-[#6C63FF]/30"
      }`}
    />
    {error && <FieldError text={error} />}
  </div>
);

const Select = ({ id, label, value, onChange, options }) => (
  <div>
    <label className="block font-mono-label text-[#A8B2D1] mb-2">{label}</label>
    <select
      data-testid={id}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl bg-[#0b1224] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/30 transition"
    >
      {options.map((o) => <option key={o} value={o} className="bg-[#0b1224]">{o}</option>)}
    </select>
  </div>
);

const FieldError = ({ text }) => (
  <div data-testid="field-error" className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
    <AlertCircle size={12} /> {text}
  </div>
);
