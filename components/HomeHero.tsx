"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { SplitText } from "./Motion";
import { ArrowIcon } from "./Icons";

export default function HomeHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 120]);
  const fade = useTransform(scrollY, [0, 500], [1, 0.2]);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <motion.div style={{ opacity: fade }}>
          <motion.span className="eyebrow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.7 }}>Web · Apps · Digital Solutions</motion.span>
          <h1 id="hero-title" className="h1">
            <SplitText text="Grow your business with" delay={1.1} /><br />
            <SplitText text="technology that works." className="grad-text" by="words" delay={1.5} />
          </h1>
          <motion.p className="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.8 }}>
            JayTech Digitals designs and builds fast, modern websites, apps and digital solutions that turn visitors into customers — from Abuja, for businesses everywhere.
          </motion.p>
          <motion.div className="cta-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.8 }}>
            <Link href="/contact" className="btn btn-primary">Start a Project <ArrowIcon /></Link>
            <Link href="/portfolio" className="btn btn-ghost">Explore Our Work</Link>
          </motion.div>
        </motion.div>
        <motion.div className="hero-visual" style={{ y }} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}>
          <div className="hero-ring" aria-hidden /><div className="hero-ring r2" aria-hidden />
          <Image className="hero-logo" src="/brand/logo.png" alt="JayTech Digitals emblem" width={420} height={420} priority style={{ width: "68%", height: "68%" }} />
          <span className="chip c1" aria-hidden><i />Websites</span>
          <span className="chip c2" aria-hidden><i />Mobile Apps</span>
          <span className="chip c3" aria-hidden><i />AI Solutions</span>
          <span className="chip c4" aria-hidden><i />Branding &amp; SEO</span>
        </motion.div>
      </div>
      <div className="scroll-hint" aria-hidden />
    </section>
  );
}
