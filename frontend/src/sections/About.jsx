import { motion } from "framer-motion";
import { CORE_VALUES } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative section">
      <div className="blob w-[500px] h-[500px] top-0 right-0 bg-[#00E5FF] opacity-20" />
      <div className="container-wide relative grid gap-14 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="lg:col-span-6"
        >
          <div className="font-mono-label text-[#00E5FF]">— About OverxaTech</div>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-black tracking-tighter leading-[1.05]">
            Technology with a <span className="text-gradient">human touch</span>.
          </h2>
          <p className="mt-6 text-lg text-[#A8B2D1] leading-relaxed max-w-xl">
            We believe AI should enhance human creativity — not replace it. OverxaTech is a small, senior team of designers, engineers and growth operators who&apos;ve built at Stripe, Meta, Notion and Vercel-scale companies.
          </p>
          <p className="mt-5 text-lg text-[#A8B2D1] leading-relaxed max-w-xl">
            We partner with a handful of ambitious teams each year. When you work with us, you work with us — no juniors, no offshoring, no theatre.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 max-w-xl">
            <div className="gradient-border">
              <div className="rounded-[1.25rem] glass p-6 h-full">
                <div className="font-mono-label text-[#00E5FF]">Mission</div>
                <p className="mt-2 text-white">
                  Give ambitious businesses an unfair advantage through AI.
                </p>
              </div>
            </div>
            <div className="gradient-border">
              <div className="rounded-[1.25rem] glass p-6 h-full">
                <div className="font-mono-label text-[#00E5FF]">Vision</div>
                <p className="mt-2 text-white">
                  A world where every operator has an AI co-founder in their pocket.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-6"
        >
          <div className="font-mono-label text-[#A8B2D1] mb-4">Core Values</div>
          <div className="grid gap-4 sm:grid-cols-2">
            {CORE_VALUES.map((v, i) => (
              <div key={v.title} className="gradient-border">
                <div className="rounded-[1.25rem] glass p-6 h-full">
                  <div className="font-display text-3xl font-black text-gradient">{String(i + 1).padStart(2, "0")}</div>
                  <div className="mt-3 font-display text-lg font-extrabold">{v.title}</div>
                  <div className="mt-2 text-sm text-[#A8B2D1]">{v.copy}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
