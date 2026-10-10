"use client";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SITE } from "@/lib/site";
import { ArrowIcon, WhatsAppIcon } from "./Icons";

type Values = { name: string; email: string; phone: string; service: string; budget: string; message: string };
const EMPTY: Values = { name: "", email: "", phone: "", service: "Website Design & Development", budget: "", message: "" };
const SERVICES = ["Website Design & Development", "Web App Development", "Mobile App Development", "Graphic Design & Branding", "Digital Marketing & SEO", "Payments & API Integration", "AI Chatbots & Automation", "Hosting, Support & Maintenance", "Not sure yet"];

function validate(v: Values) {
  const e: Partial<Record<keyof Values, string>> = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter a valid email address.";
  if (v.phone && !/^[+\d][\d\s()-]{6,}$/.test(v.phone)) e.phone = "Enter a valid phone number.";
  if (v.message.trim().length < 10) e.message = "Tell us a little more (at least 10 characters).";
  return e;
}

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "unconfigured" } | { kind: "error"; msg: string };

export default function ContactForm({ initialService }: { initialService?: string }) {
  const [v, setV] = useState<Values>({ ...EMPTY, service: initialService && SERVICES.includes(initialService) ? initialService : EMPTY.service });
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [trap, setTrap] = useState("");

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    setV((o) => ({ ...o, [k]: e.target.value }));
    if (errors[k]) setErrors((o) => ({ ...o, [k]: undefined }));
  };

  const summary = `Hello JayTech Digitals,\n\nName: ${v.name}\nEmail: ${v.email}${v.phone ? `\nPhone: ${v.phone}` : ""}\nService: ${v.service}${v.budget ? `\nBudget: ${v.budget}` : ""}\n\n${v.message}`;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) {
      (document.querySelector(".field.err input, .field.err textarea") as HTMLElement | null)?.focus();
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...v, website: trap }) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) { setStatus({ kind: "sent" }); setV({ ...EMPTY, service: v.service }); return; }
      if (data.configured === false) { setStatus({ kind: "unconfigured" }); return; }
      setStatus({ kind: "error", msg: data.error || "Something went wrong. Please try again or contact us directly." });
    } catch {
      setStatus({ kind: "error", msg: "Network error. Please check your connection and try again." });
    }
  }

  const f = (k: keyof Values) => `field ${errors[k] ? "err" : ""}`;
  const sending = status.kind === "sending";

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-describedby="form-status">
      <div className="two">
        <div className={f("name")}>
          <label htmlFor="name">Full name *</label>
          <input id="name" name="name" autoComplete="name" value={v.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
          {errors.name && <span id="e-name" className="err-msg" role="alert">{errors.name}</span>}
        </div>
        <div className={f("email")}>
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" autoComplete="email" value={v.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} />
          {errors.email && <span id="e-email" className="err-msg" role="alert">{errors.email}</span>}
        </div>
      </div>
      <div className="two">
        <div className={f("phone")}>
          <label htmlFor="phone">Phone / WhatsApp</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "e-phone" : undefined} />
          {errors.phone && <span id="e-phone" className="err-msg" role="alert">{errors.phone}</span>}
        </div>
        <div className="field">
          <label htmlFor="service">I&apos;m interested in</label>
          <select id="service" name="service" value={v.service} onChange={set("service")}>{SERVICES.map((s) => <option key={s}>{s}</option>)}</select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="budget">Budget (optional)</label>
        <input id="budget" name="budget" placeholder="e.g. ₦20,000" value={v.budget} onChange={set("budget")} />
      </div>
      <div className={f("message")}>
        <label htmlFor="message">Tell us about your project *</label>
        <textarea id="message" name="message" value={v.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "e-message" : undefined} />
        {errors.message && <span id="e-message" className="err-msg" role="alert">{errors.message}</span>}
      </div>
      <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden name="website" value={trap} onChange={(e) => setTrap(e.target.value)} />
      <button className="btn btn-primary" type="submit" disabled={sending} style={{ justifySelf: "start" }}>
        {sending ? (<><span className="spinner" aria-hidden /> Sending…</>) : (<>Send Enquiry <ArrowIcon /></>)}
      </button>

      <div id="form-status" aria-live="polite">
        <AnimatePresence mode="wait">
          {status.kind === "sent" && (
            <motion.div key="s" className="notice ok" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <b>Thank you — your enquiry was sent.</b> We&apos;ll get back to you as soon as we can.
            </motion.div>
          )}
          {status.kind === "unconfigured" && (
            <motion.div key="u" className="notice warn" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <b>Online delivery isn&apos;t switched on for this site yet, so your message was not sent.</b> Your details are still in the form — send them in one tap instead:
              <div className="cta-row">
                <a className="btn btn-primary" href={`${SITE.whatsapp}?text=${encodeURIComponent(summary)}`} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Send on WhatsApp</a>
                <a className="btn btn-ghost" href={`mailto:${SITE.email}?subject=${encodeURIComponent("Project enquiry: " + v.service)}&body=${encodeURIComponent(summary)}`}>Open in email app</a>
              </div>
            </motion.div>
          )}
          {status.kind === "error" && (
            <motion.div key="e" className="notice bad" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert">
              <b>We couldn&apos;t send that.</b> {status.msg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
