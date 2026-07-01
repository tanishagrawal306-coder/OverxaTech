import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROCESS } from "@/lib/data";

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" ref={ref} className="relative section">
      <div className="container-wide">
        <div className="max-w-2xl">
          <div className="font-mono-label text-[#00E5FF]">— How we work</div>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-black tracking-tighter leading-[1.05]">
            A process built for <span className="text-gradient">compounding wins</span>.
          </h2>
        </div>

        <div className="relative mt-16 md:pl-20">
          {/* Vertical animated line */}
          <div className="absolute left-6 md:left-10 top-2 bottom-2 w-[2px] bg-white/5 rounded-full overflow-hidden">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-[#6C63FF] via-[#8B5CF6] to-[#00E5FF] shadow-[0_0_20px_rgba(108,99,255,0.6)]"
            />
          </div>

          <ul className="space-y-10 md:space-y-14">
            {PROCESS.map((p, i) => (
              <motion.li
                key={p.step}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="relative pl-16 md:pl-24"
              >
                <span className="absolute left-0 md:left-4 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#101827] border border-white/10 shadow-[0_0_24px_rgba(108,99,255,0.35)]">
                  <span className="font-mono-label text-[#00E5FF]">{p.step}</span>
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold">{p.title}</h3>
                <p className="mt-2 text-[#A8B2D1] max-w-2xl leading-relaxed">{p.copy}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
