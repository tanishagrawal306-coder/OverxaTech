import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR = "a, button, [role='button'], input, textarea, select, [data-cursor='hover']";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let dotX = 0, dotY = 0, ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
    const move = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    const raf = () => {
      dotX += (mouseX - dotX) * 0.6;
      dotY += (mouseY - dotY) * 0.6;
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`;
      frame = requestAnimationFrame(raf);
    };
    let frame = requestAnimationFrame(raf);
    window.addEventListener("mousemove", move);

    const over = (e) => {
      if (e.target.closest && e.target.closest(HOVER_SELECTOR)) setHovering(true);
    };
    const out = (e) => {
      if (e.target.closest && e.target.closest(HOVER_SELECTOR)) setHovering(false);
    };
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className={`cursor-ring ${hovering ? "is-hover" : ""}`} aria-hidden />
    </>
  );
}
