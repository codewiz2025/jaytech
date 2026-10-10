"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { NAV, SERVICES, SITE } from "@/lib/site";
import { ArrowIcon, WhatsAppIcon } from "./Icons";

export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Loader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("jt-loaded") === "1"; sessionStorage.setItem("jt-loaded", "1"); } catch {}
    const t = setTimeout(() => setShow(false), seen ? 60 : 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="loader" role="status" aria-label="Loading" exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} initial={{ clipPath: "inset(0 0 0% 0)" }}>
          <div className="loader-inner">
            <Image className="loader-logo" src="/brand/logo.png" alt="" width={96} height={96} priority />
            <div className="loader-bar"><motion.i initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 0.85, ease: "easeInOut" }} /></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return <motion.div className="progress" style={{ scaleX }} aria-hidden />;
}

export function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 220, damping: 22 }), ry = useSpring(y, { stiffness: 220, damping: 22 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const ok = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(ok);
    if (!ok) return;
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); setHover(!!(e.target as HTMLElement)?.closest?.("a, button, input, select, textarea, [role=button]")); };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  if (!enabled) return null;
  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden />
      <motion.div className={`cursor-ring ${hover ? "hover" : ""}`} style={{ x: rx, y: ry }} aria-hidden />
    </>
  );
}

export function BackgroundFx() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [0, 260]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -200]);
  return (
    <div className="bg-fx" aria-hidden>
      <div className="bg-grid" />
      <motion.div className="orb a" style={{ y: y1 }} />
      <motion.div className="orb b" style={{ y: y2 }} />
      <div className="orb c" />
    </div>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div className="page-wipe" initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} style={{ transformOrigin: "top" }} transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }} aria-hidden />
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}>
        {children}
      </motion.div>
    </>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setOpen(false); setDd(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setDd(false); } };
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);
  const isActive = (h: string) => (h === "/" ? pathname === "/" : pathname.startsWith(h));

  return (
    <>
      <div className="nav-wrap">
        <motion.nav className={`nav ${scrolled || open ? "scrolled" : ""}`} aria-label="Main" initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
          <Link href="/" className="brand" aria-label="JayTech Digitals home">
            <Image src="/brand/logo.png" alt="" width={42} height={42} priority />
            <span className="brand-name">JAY-TECH<small>DIGITALS</small></span>
          </Link>
          <ul className="nav-links">
            {NAV.map((n) => (
              <li key={n.href} style={{ position: "relative" }} onMouseEnter={() => n.href === "/services" && setDd(true)} onMouseLeave={() => n.href === "/services" && setDd(false)} onBlur={(e) => { if (n.href === "/services" && !e.currentTarget.contains(e.relatedTarget as Node)) setDd(false); }}>
                <Link href={n.href} className={`nav-link ${isActive(n.href) ? "active" : ""}`} aria-current={isActive(n.href) ? "page" : undefined} aria-haspopup={n.href === "/services" ? "true" : undefined} aria-expanded={n.href === "/services" ? dd : undefined} onFocus={() => n.href === "/services" && setDd(true)}>
                  {isActive(n.href) && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  {n.label}
                </Link>
                {n.href === "/services" && (
                  <AnimatePresence>
                    {dd && (
                      <motion.div initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }} transition={{ duration: 0.2 }}
                        style={{ position: "absolute", top: "100%", left: "50%", translate: "-50% 0", paddingTop: 12, width: 300 }}>
                        <div className="card" style={{ padding: 10, borderRadius: 18, background: "rgba(6,14,36,.96)" }}>
                          {SERVICES.map((s) => (
                            <Link key={s.id} href={`/services#${s.id}`} className="nav-link" style={{ fontSize: ".9rem", padding: "9px 14px" }}>{s.title}</Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>
          <div className="nav-cta">
            <Link href="/contact" className="btn btn-primary">Start a Project <ArrowIcon /></Link>
            <button className={`menu-btn ${open ? "open" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
              <span /><span /><span />
            </button>
          </div>
        </motion.nav>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" className="mobile-menu" initial={{ clipPath: "circle(0% at 90% 5%)" }} animate={{ clipPath: "circle(150% at 90% 5%)" }} exit={{ clipPath: "circle(0% at 90% 5%)" }} transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}>
            {NAV.map((n, i) => (
              <motion.div key={n.href} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.07 }}>
                <Link href={n.href} className={`m-link ${isActive(n.href) ? "active" : ""}`}><small>0{i + 1}</small>{n.label}</Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: 28 }}>
              <Link href="/contact" className="btn btn-primary">Start a Project <ArrowIcon /></Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function WhatsAppFloat() {
  return (
    <motion.a className="wa-float" href={`${SITE.whatsapp}?text=${encodeURIComponent("Hello JayTech Digitals, I'd like to discuss a project.")}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with JayTech Digitals on WhatsApp"
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.6, type: "spring", stiffness: 260, damping: 18 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.94 }}>
      <WhatsAppIcon />
    </motion.a>
  );
}
