import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { CONTACT } from "@/constants/testIds";
import { submitContact } from "@/lib/api";
import { toast } from "sonner";

const SERVICE_OPTIONS = ["AI Automation", "Meta Ads", "Google Ads", "Website / Funnels", "SEO", "Analytics", "Other"];
const BUDGET_OPTIONS = ["< $5k / mo", "$5k – $10k / mo", "$10k – $25k / mo", "$25k+ / mo", "Not sure yet"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", service: "AI Automation", budget: "$5k – $10k / mo", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const change = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    setLoading(true);
    try {
      await submitContact(form);
      toast.success("Thanks — we'll be in touch within 24 hours.");
      setSent(true);
      setForm({ name: "", business: "", email: "", phone: "", service: "AI Automation", budget: "$5k – $10k / mo", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
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
          data-testid={CONTACT.form}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-7 gradient-border"
        >
          <div className="rounded-[1.25rem] glass-strong p-8 md:p-10">
            <h2 className="font-display text-2xl font-extrabold mb-6">Project Enquiry</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Field id={CONTACT.name} label="Full name" value={form.name} onChange={change("name")} required />
              <Field id={CONTACT.business} label="Business" value={form.business} onChange={change("business")} />
              <Field id={CONTACT.email} label="Work email" type="email" value={form.email} onChange={change("email")} required />
              <Field id={CONTACT.phone} label="Phone" value={form.phone} onChange={change("phone")} />
              <Select id={CONTACT.service} label="Service of interest" value={form.service} onChange={change("service")} options={SERVICE_OPTIONS} />
              <Select id={CONTACT.budget} label="Monthly budget" value={form.budget} onChange={change("budget")} options={BUDGET_OPTIONS} />
            </div>
            <div className="mt-4">
              <label className="block font-mono-label text-[#A8B2D1] mb-2">Tell us about your project</label>
              <textarea
                data-testid={CONTACT.message}
                rows={5}
                value={form.message}
                onChange={change("message")}
                required
                className="w-full rounded-xl bg-[#0b1224] border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/30 transition resize-none"
                placeholder="Where you are, where you want to go, timelines, anything else…"
              />
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

const Field = ({ id, label, ...props }) => (
  <div>
    <label className="block font-mono-label text-[#A8B2D1] mb-2">{label}</label>
    <input
      data-testid={id}
      {...props}
      className="w-full rounded-xl bg-[#0b1224] border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/30 transition"
    />
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
