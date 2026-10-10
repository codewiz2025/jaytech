import type { Metadata } from "next";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { Reveal, SplitText, Stagger, StaggerItem } from "@/components/Motion";
import { ArrowIcon } from "@/components/Icons";
import { PROCESS, SERVICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Website design and development, web and mobile apps, branding, SEO, payment integration, AI chatbots, hosting and ongoing support from JayTech Digitals.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Services</span>
          <h1 className="h1"><SplitText text="Everything you need to" delay={0.5} /> <SplitText text="succeed online." by="words" className="grad-text" delay={0.95} /></h1>
          <p className="lead">From a first website to a full web application, we cover design, development, branding, marketing and long-term support under one roof.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container">
          <Stagger className="grid grid-3" gap={0.07}>
            {SERVICES.map((s) => <StaggerItem key={s.id}><ServiceCard s={s} full /></StaggerItem>)}
          </Stagger>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <Reveal><span className="eyebrow">Our process</span></Reveal>
            <Reveal delay={0.05}><h2 className="h2">How a project <span className="grad-text">comes together</span></h2></Reveal>
          </div>
          <Stagger className="steps">
            {PROCESS.map((s) => <StaggerItem key={s.n}><div className="card" style={{ height: "100%" }}><div className="step-n">{s.n}</div><h3>{s.title}</h3><p style={{ marginTop: 8 }}>{s.text}</p></div></StaggerItem>)}
          </Stagger>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="cta-band">
              <h2 className="h2">Not sure what you need?</h2>
              <p>Tell us about your business and goals — we&apos;ll recommend the right place to start.</p>
              <div className="cta-row"><Link href="/contact" className="btn btn-primary">Start a Project <ArrowIcon /></Link><Link href="/portfolio" className="btn btn-ghost">See our work</Link></div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
