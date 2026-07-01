import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { MODAL } from "@/constants/testIds";
import { useBookCall } from "@/components/site/BookCallProvider";
import { submitContact } from "@/lib/api";
import { toast } from "sonner";

const SERVICE_OPTIONS = ["AI Automation", "Meta Ads", "Google Ads", "Website / Funnels", "SEO", "Not sure yet"];

export default function BookCallModal() {
  const { open, closeModal } = useBookCall();
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", service: "AI Automation", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Name, email and message are required.");
      return;
    }
    setLoading(true);
    try {
      await submitContact({ ...form, budget: "", message: form.message || "Requested a strategy call" });
      toast.success("Booked. We'll be in touch within 24 hours.");
      setForm({ name: "", business: "", email: "", phone: "", service: "AI Automation", message: "" });
      closeModal();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid={MODAL.bookRoot}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9990] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-[#050816]/80 backdrop-blur-md" onClick={closeModal} />
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg gradient-border overflow-hidden"
          >
            <div className="relative rounded-[1.25rem] glass-strong p-8">
              <button
                data-testid={MODAL.bookClose}
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 transition"
                aria-label="Close"
              >
                <X size={18} className="text-white/70" />
              </button>
              <div className="flex items-center gap-2 font-mono-label text-[#00E5FF]">
                <Sparkles size={14} /> Book a Strategy Call
              </div>
              <h3 className="mt-3 font-display text-3xl font-black leading-tight">
                Let&apos;s scope your <span className="text-gradient">growth engine</span>.
              </h3>
              <p className="mt-2 text-sm text-[#A8B2D1]">
                30 minutes with a senior operator. No slides, no pitch — just a plan.
              </p>

              <form onSubmit={onSubmit} className="mt-6 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field placeholder="Name" value={form.name} onChange={onChange("name")} testid="book-name" />
                  <Field placeholder="Business" value={form.business} onChange={onChange("business")} testid="book-business" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field placeholder="Email" type="email" value={form.email} onChange={onChange("email")} testid="book-email" />
                  <Field placeholder="Phone" value={form.phone} onChange={onChange("phone")} testid="book-phone" />
                </div>
                <select
                  data-testid="book-service"
                  value={form.service}
                  onChange={onChange("service")}
                  className="w-full rounded-xl bg-[#0b1224] border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/30 transition"
                >
                  {SERVICE_OPTIONS.map((s) => <option key={s} value={s} className="bg-[#0b1224]">{s}</option>)}
                </select>
                <textarea
                  data-testid="book-message"
                  rows={3}
                  placeholder="What are you trying to solve?"
                  value={form.message}
                  onChange={onChange("message")}
                  className="w-full rounded-xl bg-[#0b1224] border border-white/10 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/30 transition resize-none"
                />
                <button
                  type="submit"
                  data-testid={MODAL.bookSubmit}
                  disabled={loading}
                  className="glow-btn w-full disabled:opacity-70"
                >
                  {loading ? "Sending…" : (<><span>Book my call</span><ArrowRight size={16} className="ml-2" /></>)}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const Field = ({ testid, ...props }) => (
  <input
    data-testid={testid}
    {...props}
    className="w-full rounded-xl bg-[#0b1224] border border-white/10 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/30 transition"
  />
);
