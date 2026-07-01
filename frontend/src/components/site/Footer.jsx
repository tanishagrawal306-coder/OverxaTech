import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const columns = [
  {
    title: "Company",
    items: [
      { label: "About", href: "/#about" },
      { label: "Case Studies", href: "/#cases" },
      { label: "Process", href: "/#process" },
      { label: "Careers", href: "/contact" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "AI Automation", href: "/#services" },
      { label: "Paid Media", href: "/#services" },
      { label: "Websites & Funnels", href: "/#services" },
      { label: "SEO & Content", href: "/#services" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#050816] pt-24 pb-8">
      <div className="blob w-[520px] h-[520px] -left-40 -bottom-40 bg-[#6C63FF] opacity-20" />
      <div className="container-wide relative">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2">
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#6C63FF] via-[#8B5CF6] to-[#00E5FF]">
                <span className="font-display text-white font-black">O</span>
              </span>
              <span className="font-display text-xl font-extrabold">Overxa<span className="text-gradient">Tech</span></span>
            </Link>
            <p className="mt-5 max-w-md text-[#A8B2D1] leading-relaxed">
              Where human creativity meets AI automation. We build growth systems for ambitious teams.
            </p>
            <div className="mt-8 flex gap-3">
              {[Twitter, Linkedin, Instagram, Github].map((Icon, i) => (
                <a key={i} href="#" className="glass rounded-full p-3 hover:border-white/20 transition-colors">
                  <Icon size={16} className="text-[#A8B2D1]" />
                </a>
              ))}
            </div>
          </div>
          {columns.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <div className="font-mono-label text-[#A8B2D1] mb-4">{c.title}</div>
              <ul className="space-y-3">
                {c.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.href} className="text-sm text-white/80 hover:text-white transition-colors">
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="md:col-span-1" />
        </div>

        <div className="mt-20 select-none">
          <div className="font-display text-[16vw] leading-none font-black tracking-tighter">
            <span className="text-white/[0.04]">OVERXA</span>
            <span className="text-gradient opacity-30">TECH</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#A8B2D1]">
          <span>© {new Date().getFullYear()} OverxaTech. Where Human Creativity Meets AI Automation.</span>
          <span>Crafted with intention · Built for scale</span>
        </div>
      </div>
    </footer>
  );
}
