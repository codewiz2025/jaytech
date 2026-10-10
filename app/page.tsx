import Image from "next/image";
import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import { Counter, Reveal, Spotlight, Stagger, StaggerItem } from "@/components/Motion";
import { ArrowIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { PROCESS, SERVICES, SITE, TECH, WHY } from "@/lib/site";
import { PROJECTS } from "@/lib/projects";

export default function Home() {
  const featured = PROJECTS.filter((p) => p.featured);
  const marquee = [...SERVICES.map((s) => s.title), ...TECH];
  return (
    <>
      <HomeHero />

      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[...marquee, ...marquee].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      <section className="section">
        <div className="container about-split">
          <Reveal>
            <div className="frame">
              <Image src="/brand/banner.png" alt="JayTech Digitals — a developer building a modern website" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 560px" />
            </div>
          </Reveal>
          <div style={{ display: "grid", gap: 22 }}>
            <Reveal><span className="eyebrow">Who we are</span></Reveal>
            <Reveal delay={0.05}><h2 className="h2">Your hardest-working <span className="grad-text">digital salesperson</span>, built right.</h2></Reveal>
            <Reveal delay={0.1}><p className="lead">JayTech Digitals is a web design and software development agency founded by {SITE.ceo}. We help startups and established businesses in Nigeria and beyond get online with fast, mobile-friendly, SEO-ready websites and custom applications.</p></Reveal>
            <Reveal delay={0.15}><Link href="/about" className="link-arrow">More about us <span>→</span></Link></Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Stagger className="stats">
            <StaggerItem><Spotlight className="stat"><b className="grad-text"><Counter to={20} /></b><span>Live projects in our portfolio</span></Spotlight></StaggerItem>
            <StaggerItem><Spotlight className="stat"><b className="grad-text"><Counter to={8} /></b><span>Core digital services</span></Spotlight></StaggerItem>
            <StaggerItem><Spotlight className="stat"><b className="grad-text"><Counter to={10} prefix="2–" /></b><span>Days typical delivery, by project size</span></Spotlight></StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal><span className="eyebrow">What we do</span></Reveal>
            <Reveal delay={0.05}><h2 className="h2">Services built around <span className="grad-text">your growth</span></h2></Reveal>
          </div>
          <Stagger className="grid grid-4">
            {SERVICES.slice(0, 4).map((s) => <StaggerItem key={s.id}><ServiceCard s={s} /></StaggerItem>)}
          </Stagger>
          <Reveal className="cta-row" ><div style={{ marginTop: 36 }}><Link href="/services" className="btn btn-ghost">See all services <ArrowIcon /></Link></div></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal><span className="eyebrow">Selected work</span></Reveal>
            <Reveal delay={0.05}><h2 className="h2">Projects we&apos;re <span className="grad-text">proud of</span></h2></Reveal>
            <Reveal delay={0.1}><p className="lead">AI platforms, schools, stores and brands — every project links to the live website.</p></Reveal>
          </div>
          <div className="grid grid-3">
            {featured.slice(0, 6).map((p) => <ProjectCard key={p.id} p={p} />)}
          </div>
          <Reveal><div style={{ marginTop: 40, textAlign: "center" }}><Link href="/portfolio" className="btn btn-primary">View all 20 projects <ArrowIcon /></Link></div></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <Reveal><span className="eyebrow">Why JayTech</span></Reveal>
            <Reveal delay={0.05}><h2 className="h2">Reasons to <span className="grad-text">choose us</span></h2></Reveal>
          </div>
          <Stagger className="feature-grid">
            {WHY.map((w, i) => (
              <StaggerItem key={w.title}>
                <Spotlight style={{ height: "100%" }}>
                  <div className="why"><span className="why-n">0{i + 1}</span><div><h3 style={{ fontSize: "1.15rem" }}>{w.title}</h3><p style={{ marginTop: 8 }}>{w.text}</p></div></div>
                </Spotlight>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal><span className="eyebrow">How we work</span></Reveal>
            <Reveal delay={0.05}><h2 className="h2">From idea to launch in <span className="grad-text">six clear steps</span></h2></Reveal>
          </div>
          <Stagger className="steps">
            {PROCESS.map((s) => (
              <StaggerItem key={s.n}><Spotlight style={{ height: "100%" }}><div className="step-n">{s.n}</div><h3>{s.title}</h3><p style={{ marginTop: 8 }}>{s.text}</p></Spotlight></StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="cta-band">
              <span className="eyebrow">Let&apos;s build</span>
              <h2 className="h2" style={{ marginTop: 16 }}>Ready to boost your <span className="grad-text">online presence?</span></h2>
              <p>Tell us about your idea and we&apos;ll come back with a clear plan. {SITE.tagline}</p>
              <div className="cta-row">
                <Link href="/contact" className="btn btn-primary">Start a Project <ArrowIcon /></Link>
                <a className="btn btn-ghost" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> WhatsApp</a>
                <a className="btn btn-ghost" href={`tel:${SITE.phoneIntl}`}><PhoneIcon /> {SITE.phone}</a>
                <a className="btn btn-ghost" href={`mailto:${SITE.email}`}><MailIcon /> Email us</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
