import CountUp from "react-countup";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { STATS } from "@/lib/data";

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 border-y border-white/5 bg-[#080d1c]/40">
      <div className="container-wide">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="text-center md:text-left"
            >
              <div className="font-display text-6xl md:text-7xl font-black tracking-tighter">
                <span className="text-gradient">
                  {inView && <CountUp end={s.end} duration={2.4} separator="," />}
                  {s.suffix}
                </span>
              </div>
              <div className="mt-3 font-mono-label text-[#A8B2D1]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
