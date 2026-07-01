import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, TrendingUp, Zap, Cpu } from "lucide-react";
import { HERO } from "@/constants/testIds";
import { useBookCall } from "@/components/site/BookCallProvider";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const { openModal } = useBookCall();

  return (
    <section ref={ref} className="relative min-h-[100vh] pt-32 md:pt-40 pb-20 overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 grid-bg opacity-70 pointer-events-none" />
      <div className="blob w-[520px] h-[520px] -top-32 -left-32 bg-[#6C63FF] animate-blob-move" />
      <div className="blob w-[520px] h-[520px] top-40 right-[-100px] bg-[#00E5FF] animate-blob-move" style={{ animationDelay: "-6s" }} />
      <div className="blob w-[420px] h-[420px] bottom-[-100px] left-1/3 bg-[#8B5CF6] animate-blob-move" style={{ animationDelay: "-12s" }} />

      <motion.div style={{ y, scale, opacity }} className="container-wide relative grid gap-12 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 font-mono-label text-[#00E5FF]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00E5FF] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00E5FF]" />
            </span>
            AI Growth Agency · Now taking Q2 partners
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.95] tracking-tighter"
          >
            We build <span className="text-gradient">AI systems</span><br />
            that scale businesses.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-7 max-w-2xl text-lg md:text-xl text-[#A8B2D1] leading-relaxed"
          >
            We help ambitious businesses automate operations, generate more leads, grow revenue and dominate their market — with AI automation, Meta &amp; Google Ads, and high-converting websites.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button data-testid={HERO.ctaBook} onClick={openModal} className="glow-btn">
              <span>Book Free Strategy Call</span>
              <ArrowRight size={18} className="ml-2" />
            </button>
            <a data-testid={HERO.ctaView} href="#cases" className="ghost-btn">View Our Work</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.75 }}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#A8B2D1]"
          >
            <span className="flex items-center gap-2"><TrendingUp size={16} className="text-[#00E5FF]" /> 300% avg ROI</span>
            <span className="flex items-center gap-2"><Zap size={16} className="text-[#8B5CF6]" /> Live in 3 weeks</span>
            <span className="flex items-center gap-2"><Cpu size={16} className="text-[#6C63FF]" /> AI-native delivery</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          <DashboardMock />
        </motion.div>
      </motion.div>
    </section>
  );
}

function DashboardMock() {
  const bars = [40, 62, 48, 78, 90, 70, 96];
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-[#6C63FF]/30 via-[#8B5CF6]/20 to-[#00E5FF]/30 blur-3xl" />
      <div className="relative gradient-border">
        <div className="rounded-[1.25rem] glass-strong p-5 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#00E5FF] flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
              <div>
                <div className="text-xs text-[#A8B2D1] font-mono-label">Growth OS</div>
                <div className="text-sm font-semibold">Q2 Pipeline</div>
              </div>
            </div>
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-400/70" />
              <span className="h-2 w-2 rounded-full bg-amber-400/70" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { k: "Revenue", v: "$482k", d: "+38%" },
              { k: "Leads", v: "1,284", d: "+62%" },
              { k: "CPL", v: "$14.20", d: "-41%" },
            ].map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }}
                className="rounded-xl bg-[#0b1224]/80 border border-white/5 p-3"
              >
                <div className="text-[10px] font-mono-label text-[#A8B2D1]">{s.k}</div>
                <div className="text-lg font-bold mt-1">{s.v}</div>
                <div className="text-[10px] text-[#00E5FF] mt-1">{s.d}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 rounded-xl bg-[#0b1224]/80 border border-white/5 p-4">
            <div className="flex items-center justify-between text-xs text-[#A8B2D1] font-mono-label mb-3">
              <span>Weekly Pipeline</span>
              <span className="text-[#00E5FF]">▲ 68%</span>
            </div>
            <div className="flex items-end gap-2 h-28">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.9, delay: 0.8 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-[#6C63FF] via-[#8B5CF6] to-[#00E5FF] shadow-[0_0_12px_rgba(108,99,255,0.5)]"
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-[#0b1224]/80 border border-white/5 p-3 text-xs">
            <div className="flex items-center gap-2 text-[#A8B2D1]">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
              AI agent live · 12 conversations
            </div>
            <span className="text-white/70">28 booked today</span>
          </div>
        </div>
      </div>

      {/* Floating chips */}
      <motion.div
        animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -left-6 glass rounded-2xl px-3 py-2 text-xs flex items-center gap-2"
      >
        <Zap size={14} className="text-[#00E5FF]" /> New lead — Meridian
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-4 -right-4 glass rounded-2xl px-3 py-2 text-xs flex items-center gap-2"
      >
        <TrendingUp size={14} className="text-[#8B5CF6]" /> ROAS 4.72×
      </motion.div>
    </div>
  );
}
