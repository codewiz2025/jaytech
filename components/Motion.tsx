"use client";
import { motion, useInView, useMotionValue, animate, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";

const ease = [0.2, 0.8, 0.2, 1] as const;

export function Reveal({ children, delay = 0, y = 32, className, as = "div" }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" }) {
  const M = motion[as] as typeof motion.div;
  return (
    <M className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay, ease }}>
      {children}
    </M>
  );
}

export function Stagger({ children, className, gap = 0.09 }: { children: ReactNode; className?: string; gap?: number }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={{ hidden: { opacity: 0, y: 36, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } } }}>
      {children}
    </motion.div>
  );
}

/** Staggered character (or word) entrance. The visible text is aria-hidden; a screen-reader copy is provided. */
export function SplitText({ text, className, delay = 0, by = "chars", stagger = 0.028 }: { text: string; className?: string; delay?: number; by?: "chars" | "words"; stagger?: number }) {
  const words = text.split(" ");
  let i = 0;
  return (
    <span>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, wi) => (
          <span key={wi} className="word">
            {by === "words" ? (
              <motion.span className={`char ${className ?? ""}`} initial={{ opacity: 0, y: "0.7em", filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: delay + i++ * stagger * 4, ease }}>
                {w}
              </motion.span>
            ) : (
              [...w].map((c, ci) => (
                <motion.span key={ci} className={`char ${className ?? ""}`} initial={{ opacity: 0, y: "0.7em", rotate: 5 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.7, delay: delay + i++ * stagger, ease }}>
                  {c}
                </motion.span>
              ))
            )}
            {wi < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </span>
  );
}

export function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const v = useMotionValue(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { v.set(to); if (ref.current) ref.current.textContent = `${prefix}${to}${suffix}`; return; }
    const c = animate(v, to, { duration: 1.8, ease });
    const unsub = v.on("change", (n) => { if (ref.current) ref.current.textContent = `${prefix}${Math.round(n)}${suffix}`; });
    return () => { c.stop(); unsub(); };
  }, [inView, to, prefix, suffix, reduce, v]);
  return <span ref={ref}>{`${prefix}${to}${suffix}`}</span>;
}

/** Glass card whose glow follows the pointer. */
export function Spotlight({ children, className = "", ...rest }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return <div {...rest} className={`card ${className}`} onMouseMove={onMove}>{children}</div>;
}
