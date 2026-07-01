import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/lib/data";

export default function FAQ() {
  return (
    <section id="faq" className="relative section">
      <div className="container-wide grid gap-12 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="lg:col-span-5"
        >
          <div className="font-mono-label text-[#00E5FF]">— Common questions</div>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-black tracking-tighter leading-[1.05]">
            Everything you&apos;re <span className="text-gradient">wondering</span>.
          </h2>
          <p className="mt-6 text-[#A8B2D1] max-w-md">
            If your question isn&apos;t answered here, book a call — we&apos;ll walk you through anything, no strings.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                data-testid={`faq-item-${i}`}
                className="rounded-2xl border border-white/8 bg-[#101827]/60 backdrop-blur px-5 md:px-6 data-[state=open]:border-[#6C63FF]/40 data-[state=open]:shadow-[0_0_30px_rgba(108,99,255,0.15)] transition-all"
              >
                <AccordionTrigger className="text-left font-display text-lg md:text-xl font-extrabold hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#A8B2D1] leading-relaxed pb-6">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
