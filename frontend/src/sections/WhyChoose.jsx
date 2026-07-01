import { motion } from "framer-motion";
import { WHY_CHOOSE } from "@/lib/data";

export default function WhyChoose() {
  return (
    <section className="relative section">
      <div className="container-wide">
        <div className="grid gap-10 md:grid-cols-12 items-end">
          <div className="md:col-span-6">
            <div className="font-mono-label text-[#00E5FF]">— Why teams choose OverxaTech</div>
            <h2 className="mt-4 font-display text-4xl md:text-6xl font-black tracking-tighter leading-[1.05]">
              Elite operators. <span className="text-gradient">Real outcomes.</span>
            </h2>
          </div>
          <p className="md:col-span-6 text-lg text-[#A8B2D1] max-w-lg">
            Four principles we won&apos;t compromise on — the reason clients stay an average of 22 months.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group gradient-border"
            >
              <div className="rounded-[1.25rem] glass p-7 h-full transition-transform duration-500 group-hover:-translate-y-1">
                <div className="font-display text-5xl font-black text-gradient opacity-80">{w.label}</div>
                <h3 className="mt-5 font-display text-xl font-extrabold">{w.title}</h3>
                <p className="mt-3 text-sm text-[#A8B2D1] leading-relaxed">{w.copy}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
