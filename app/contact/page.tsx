import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";
import { Reveal, SplitText, Spotlight } from "@/components/Motion";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with JayTech Digitals. Email admin.jaytech@gmail.com, call 08164584620 or message us on WhatsApp.",
  alternates: { canonical: "/contact" },
};

export default async function Contact({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const items = [
    { icon: <MailIcon />, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: <PhoneIcon />, label: "Phone", value: SITE.phone, href: `tel:${SITE.phoneIntl}` },
    { icon: <WhatsAppIcon />, label: "WhatsApp", value: "Chat with us", href: SITE.whatsapp, ext: true },
    { icon: <PinIcon />, label: "Based in", value: "Abuja, Nigeria — serving clients worldwide" },
  ];
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1 className="h1"><SplitText text="Let's build" delay={0.5} /> <SplitText text="something great." by="words" className="grad-text" delay={0.8} /></h1>
          <p className="lead">Share a few details about your project and we&apos;ll get back to you. Prefer to talk? Call, email or message us on WhatsApp.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container contact-grid">
          <div style={{ display: "grid", gap: 14 }}>
            {items.map((it, i) => {
              const body = (<><div className="icon-box">{it.icon}</div><div><small>{it.label}</small><b>{it.value}</b></div></>);
              return (
                <Reveal key={it.label} delay={i * 0.07}>
                  {it.href ? <a className="contact-item" href={it.href} {...(it.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{body}</a> : <div className="contact-item">{body}</div>}
                </Reveal>
              );
            })}
            <Reveal delay={0.3}><Spotlight><h3 style={{ fontSize: "1.1rem" }}>What happens next?</h3><ul className="ticks"><li>We review your enquiry</li><li>We reply to discuss goals, scope and timeline</li><li>You get a clear plan before any work starts</li></ul></Spotlight></Reveal>
          </div>
          <Reveal delay={0.1}>
            <Spotlight style={{ padding: "clamp(22px, 4vw, 40px)" }}>
              <h2 style={{ fontSize: "1.6rem", marginBottom: 6 }}>Project enquiry</h2>
              <p style={{ marginBottom: 24 }}>Fields marked * are required.</p>
              <ContactForm initialService={service} />
            </Spotlight>
          </Reveal>
        </div>
      </section>
    </>
  );
}
