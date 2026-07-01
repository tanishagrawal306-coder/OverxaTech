import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useBookCall } from "@/components/site/BookCallProvider";

export default function FinalCTA() {
  const { openModal } = useBookCall();
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2rem] gradient-border"
        >
          <div className="rounded-[2rem] glass-strong p-12 md:p-20 text-center relative">
            <div className="blob w-[520px] h-[520px] -top-40 left-1/2 -translate-x-1/2 bg-[#6C63FF] opacity-30" />
            <div className="blob w-[420px] h-[420px] -bottom-40 right-10 bg-[#00E5FF] opacity-25" />
            <div className="relative">
              <div className="font-mono-label text-[#00E5FF]">— Ready to scale?</div>
              <h2 className="mt-4 font-display text-4xl md:text-7xl font-black tracking-tighter leading-[1] max-w-4xl mx-auto">
                Let&apos;s build an <span className="text-gradient">AI-powered</span> business together.
              </h2>
              <p className="mt-6 text-lg text-[#A8B2D1] max-w-xl mx-auto">
                A 30-minute call. A senior operator. A concrete plan for your first 90 days.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <button data-testid="final-cta-book" onClick={openModal} className="glow-btn">
                  <span>Book Free Strategy Call</span>
                  <ArrowRight size={18} className="ml-2" />
                </button>
                <a href="/contact" className="ghost-btn">Or send a detailed brief</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
