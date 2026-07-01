import { AnimatePresence, motion } from "framer-motion";

export default function PageLoader({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          data-testid="page-loader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[9998] bg-[#050816] flex items-center justify-center"
        >
          <div className="relative">
            <motion.div
              initial={{ letterSpacing: "-0.1em", opacity: 0 }}
              animate={{ letterSpacing: "0.05em", opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl md:text-6xl font-black text-white"
            >
              OVERXA<span className="text-gradient">TECH</span>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, delay: 0.2, ease: "easeInOut" }}
              className="mt-6 h-[2px] w-full origin-left bg-gradient-to-r from-[#6C63FF] via-[#8B5CF6] to-[#00E5FF]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
