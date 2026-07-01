import { motion } from "framer-motion";
import { SERVICES } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="relative section">
      <div className="blob w-[500px] h-[500px] -top-20 right-0 bg-[#8B5CF6] opacity-20" />
      <div className="container-wide relative">
        <div className="max-w-3xl">
          <div className="font-mono-label text-[#00E5FF]">— What we build</div>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-black tracking-tighter leading-[1.05]">
            Every lever your business needs to <span className="text-gradient">grow faster</span>.
          </h2>
          <p className="mt-5 text-lg text-[#A8B2D1] max-w-2xl">
            AI, ads, funnels and infrastructure — delivered by a single senior team. No handoffs. No junior guesswork.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`group gradient-border ${i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`}
            >
              <div className="relative h-full rounded-[1.25rem] glass p-6 md:p-7 transition-transform duration-500 group-hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6C63FF]/30 via-[#8B5CF6]/20 to-[#00E5FF]/30 border border-white/10 shadow-[0_0_20px_rgba(108,99,255,0.25)]">
                    <s.icon size={20} className="text-white" />
                  </div>
                  <ArrowUpRight size={18} className="text-white/30 group-hover:text-[#00E5FF] transition-colors" />
                </div>
                <h3 className="mt-6 font-display text-xl md:text-2xl font-extrabold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm text-[#A8B2D1] leading-relaxed">{s.copy}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
