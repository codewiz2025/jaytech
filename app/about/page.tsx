import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Timeline from "@/components/Timeline";
import { Reveal, SplitText, Spotlight, Stagger, StaggerItem } from "@/components/Motion";
import { ArrowIcon } from "@/components/Icons";
import { JOURNEY, SITE, TECH, VALUES } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "The story, mission and values behind JayTech Digitals, led by CEO Fadayomi Ayokunle Jahswill — a web design and software development agency in Abuja, Nigeria.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">About us</span>
          <h1 className="h1"><SplitText text="Technology with" delay={0.5} /> <SplitText text="a human touch." by="words" className="grad-text" delay={0.9} /></h1>
          <p className="lead">JayTech Digitals — also known as JAY-TECH — is a web design and software development agency based in Abuja, helping businesses across Nigeria and beyond build a powerful digital presence.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container grid grid-2">
          <Reveal><Spotlight style={{ height: "100%" }}><span className="eyebrow">Our mission</span><h3 style={{ margin: "16px 0 10px", fontSize: "1.6rem" }}>Democratise high-quality digital solutions.</h3><p>We exist to make world-class websites and apps accessible to startups and enterprises alike — with honest pricing, fast delivery and support that doesn&apos;t disappear after launch.</p></Spotlight></Reveal>
          <Reveal delay={0.1}><Spotlight style={{ height: "100%" }}><span className="eyebrow">Our vision</span><h3 style={{ margin: "16px 0 10px", fontSize: "1.6rem" }}>Close the digital gap.</h3><p>We want every business — from a single-person brand to a growing company — to have a professional, fast and trustworthy presence online, and the tools to grow from there.</p></Spotlight></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container about-split">
          <Reveal>
            <div className="frame">
              <Image src="/brand/mascot.png" alt="JayTech mascot working late at a laptop beside the words Discipline, Focus, Consistency, Success" width={1254} height={1254} sizes="(max-width: 900px) 100vw, 560px" />
              <div className="ceo-badge"><b>{SITE.ceo}</b><span>Founder &amp; CEO, JayTech Digitals</span></div>
            </div>
          </Reveal>
          <div style={{ display: "grid", gap: 22 }}>
            <Reveal><span className="eyebrow">Meet the CEO</span></Reveal>
            <Reveal delay={0.05}><h2 className="h2">Led by <span className="grad-text">Fadayomi Ayokunle Jahswill</span></h2></Reveal>
            <Reveal delay={0.1}><p className="lead">Jahswill founded JayTech Digitals in 2022 after seeing too many Nigerian businesses struggle to get online with quality, affordable websites. He leads the company&apos;s development and creative direction.</p></Reveal>
            <Reveal delay={0.15}><p className="quote">&ldquo;We treat every project like it&apos;s our own startup.&rdquo;</p></Reveal>
            <Reveal delay={0.2}><div className="cta-row"><Link href="/contact" className="btn btn-primary">Work with us <ArrowIcon /></Link></div></Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <Reveal><span className="eyebrow">Our approach</span></Reveal>
            <Reveal delay={0.05}><h2 className="h2">Craft, creativity &amp; <span className="grad-text">innovation</span></h2></Reveal>
            <Reveal delay={0.1}><p className="lead">We combine clean, performance-minded code with considered design. Every site is mobile-first, SEO-ready and tailored to the business behind it — not forced into a one-size-fits-all template.</p></Reveal>
          </div>
          <Stagger className="grid grid-4">
            {VALUES.map((v, i) => (
              <StaggerItem key={v.title}><Spotlight style={{ height: "100%" }}><div className="step-n">0{i + 1}</div><h3>{v.title}</h3><p style={{ marginTop: 8 }}>{v.text}</p></Spotlight></StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <Reveal><span className="eyebrow">Our journey</span></Reveal>
            <Reveal delay={0.05}><h2 className="h2">The JayTech <span className="grad-text">story so far</span></h2></Reveal>
          </div>
          <Timeline />
          <span className="sr-only">{JOURNEY.length} milestones</span>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head center"><Reveal><span className="eyebrow">Tools we use</span></Reveal></div>
          <Reveal><div className="tech">{TECH.map((t) => <span key={t}>{t}</span>)}</div></Reveal>
        </div>
      </section>
    </>
  );
}
