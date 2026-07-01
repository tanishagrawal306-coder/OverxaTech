import { motion } from "framer-motion";
import { CASE_STUDIES } from "@/lib/data";

export default function CaseStudies() {
  return (
    <section id="cases" className="relative section">
      <div className="blob w-[520px] h-[520px] top-40 -left-40 bg-[#6C63FF] opacity-20" />
      <div className="container-wide relative">
        <div className="max-w-3xl">
          <div className="font-mono-label text-[#00E5FF]">— Selected case studies</div>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-black tracking-tighter leading-[1.05]">
            Results we&apos;re quietly <span className="text-gradient">proud of</span>.
          </h2>
        </div>

        <div className="mt-14 space-y-10 md:space-y-14">
          {CASE_STUDIES.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="gradient-border"
            >
              <div className="rounded-[1.5rem] glass overflow-hidden">
                <div className={`grid md:grid-cols-12 ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}>
                  <div className="md:col-span-7 p-8 md:p-12">
                    <div className="inline-flex items-center gap-2 font-mono-label text-[#00E5FF]">
                      <span className="h-1 w-1 rounded-full bg-[#00E5FF]" /> {c.tag}
                    </div>
                    <h3 className="mt-4 font-display text-2xl md:text-4xl font-black leading-tight">
                      {c.title}
                    </h3>
                    <div className="mt-6 space-y-4 text-[#A8B2D1]">
                      <p><span className="font-mono-label text-white mr-2">Problem</span>{c.problem}</p>
                      <p><span className="font-mono-label text-white mr-2">Solution</span>{c.solution}</p>
                    </div>
                    <div className="mt-7 grid grid-cols-3 gap-3">
                      {c.result.map((r) => (
                        <div key={r.k} className="rounded-xl bg-[#0b1224]/70 border border-white/5 p-4">
                          <div className="font-mono-label text-[#A8B2D1]">{r.k}</div>
                          <div className="mt-1 font-display text-2xl md:text-3xl font-black text-gradient">{r.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-5 relative min-h-[280px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/30 via-[#8B5CF6]/20 to-[#00E5FF]/20" />
                    <img src={c.image} alt={c.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity" />
                    <div className="relative h-full flex items-end p-8">
                      <MiniChart data={c.chart} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniChart({ data }) {
  const max = Math.max(...data);
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 90}`)
    .join(" ");
  return (
    <div className="w-full">
      <div className="font-mono-label text-white/60 mb-2">12-week growth</div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-32">
        <defs>
          <linearGradient id="chart-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6C63FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="chart-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#6C63FF" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>
        </defs>
        <polygon points={`0,100 ${points} 100,100`} fill="url(#chart-grad)" />
        <polyline points={points} fill="none" stroke="url(#chart-line)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
