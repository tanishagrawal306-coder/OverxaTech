import Hero from "@/sections/Hero";
import TrustedBy from "@/sections/TrustedBy";
import Services from "@/sections/Services";
import WhyChoose from "@/sections/WhyChoose";
import Process from "@/sections/Process";
import CaseStudies from "@/sections/CaseStudies";
import Testimonials from "@/sections/Testimonials";
import About from "@/sections/About";
import Stats from "@/sections/Stats";
import FAQ from "@/sections/FAQ";
import FinalCTA from "@/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Services />
      <WhyChoose />
      <Process />
      <CaseStudies />
      <Testimonials />
      <About />
      <Stats />
      <FAQ />
      <FinalCTA />
    </>
  );
}
