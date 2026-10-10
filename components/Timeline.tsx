"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { JOURNEY } from "@/lib/site";
import { Reveal } from "./Motion";

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  return (
    <div className="timeline" ref={ref}>
      <div className="timeline-line" aria-hidden />
      <motion.div className="timeline-fill" style={{ scaleY }} aria-hidden />
      {JOURNEY.map((j, i) => (
        <Reveal key={j.year} className="t-item" delay={i * 0.05}>
          <div className="t-year">{j.year}</div>
          <h3>{j.title}</h3>
          <p>{j.text}</p>
        </Reveal>
      ))}
    </div>
  );
}
