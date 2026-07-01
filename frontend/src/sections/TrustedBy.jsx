import Marquee from "react-fast-marquee";
import { CLIENT_LOGOS } from "@/lib/data";

export default function TrustedBy() {
  return (
    <section className="relative py-16 border-y border-white/5 bg-[#080d1c]/40">
      <div className="container-wide">
        <div className="text-center font-mono-label text-[#A8B2D1] mb-8">
          Trusted by growing businesses
        </div>
        <Marquee gradient gradientColor="#050816" gradientWidth={100} speed={40} pauseOnHover>
          {CLIENT_LOGOS.concat(CLIENT_LOGOS).map((l, i) => (
            <span
              key={i}
              className="mx-10 font-display text-xl md:text-2xl font-extrabold tracking-widest text-white/40 hover:text-white transition-colors"
            >
              {l}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
