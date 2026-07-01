import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV } from "@/constants/testIds";
import { useBookCall } from "@/components/site/BookCallProvider";

const links = [
  { label: "Services", href: "/#services", testid: NAV.linkServices },
  { label: "Process", href: "/#process", testid: NAV.linkProcess },
  { label: "Work", href: "/#cases", testid: NAV.linkCases },
  { label: "About", href: "/#about", testid: NAV.linkAbout },
  { label: "FAQ", href: "/#faq", testid: NAV.linkFaq },
  { label: "Contact", href: "/contact", testid: NAV.linkContact },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openModal } = useBookCall();
  const { pathname } = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-[#050816]/70 border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between h-16 md:h-20">
        <Link to="/" data-testid={NAV.logo} className="flex items-center gap-2">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#6C63FF] via-[#8B5CF6] to-[#00E5FF] shadow-[0_0_20px_rgba(108,99,255,0.55)]">
            <span className="font-display text-white font-black text-sm">O</span>
          </span>
          <span className="font-display text-lg md:text-xl font-extrabold tracking-tight">
            Overxa<span className="text-gradient">Tech</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-testid={l.testid}
              className="text-sm text-[#A8B2D1] hover:text-white transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button data-testid={NAV.ctaBook} onClick={openModal} className="glow-btn text-sm px-6 h-11">
            Book Strategy Call
          </button>
        </div>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen((v) => !v)}
          data-testid={NAV.mobileToggle}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/5 bg-[#050816]/95 backdrop-blur-xl">
          <div className="container-wide py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.label} href={l.href} data-testid={l.testid + "-mobile"} className="text-[#A8B2D1] hover:text-white text-base">
                {l.label}
              </a>
            ))}
            <button onClick={openModal} className="glow-btn text-sm w-full">Book Strategy Call</button>
          </div>
        </div>
      )}
    </header>
  );
}
