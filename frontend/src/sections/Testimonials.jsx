import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const total = TESTIMONIALS.length;

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 6000);
    return () => clearInterval(t);
  }, [total]);

  const t = TESTIMONIALS[idx];

  return (
    <section className="relative section">
      <div className="container-wide">
        <div className="max-w-2xl">
          <div className="font-mono-label text-[#00E5FF]">— Voices from partners</div>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-black tracking-tighter leading-[1.05]">
            Trusted by <span className="text-gradient">operators</span> who move fast.
          </h2>
        </div>

        <div className="mt-14 gradient-border">
          <div className="rounded-[1.5rem] glass-strong p-8 md:p-14 relative overflow-hidden">
            <Quote className="absolute -top-6 -left-2 text-white/5" size={180} />
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-[#00E5FF] text-[#00E5FF]" />)}
                </div>
                <p className="font-display text-2xl md:text-4xl leading-[1.2] font-extrabold tracking-tight text-white">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="h-14 w-14 rounded-full object-cover border border-white/10" />
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-[#A8B2D1]">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    data-testid={`testimonial-dot-${i}`}
                    className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-gradient-to-r from-[#6C63FF] to-[#00E5FF]" : "w-4 bg-white/20"}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIdx((i) => (i - 1 + total) % total)}
                  className="glass rounded-full p-2 hover:border-white/20 transition"
                  data-testid="testimonial-prev"
                  aria-label="Previous"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setIdx((i) => (i + 1) % total)}
                  className="glass rounded-full p-2 hover:border-white/20 transition"
                  data-testid="testimonial-next"
                  aria-label="Next"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
