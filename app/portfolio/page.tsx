import type { Metadata } from "next";
import Link from "next/link";
import PortfolioGrid from "@/components/PortfolioGrid";
import { Reveal, SplitText } from "@/components/Motion";
import { ArrowIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore 20 live projects by JayTech Digitals — AI platforms, education, e-commerce, business websites and creative projects.",
  alternates: { canonical: "/portfolio" },
};

export default function Portfolio() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Portfolio</span>
          <h1 className="h1"><SplitText text="Work that" delay={0.5} /> <SplitText text="speaks for itself." by="words" className="grad-text" delay={0.8} /></h1>
          <p className="lead">Twenty live projects across AI, education, e-commerce, business and creative work. Click any card to visit the real website in a new tab.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container">
          <PortfolioGrid />
          <Reveal>
            <div className="cta-band" style={{ marginTop: 90 }}>
              <h2 className="h2">Want to be our next project?</h2>
              <p>Let&apos;s talk about what you&apos;d like to build.</p>
              <div className="cta-row"><Link href="/contact" className="btn btn-primary">Start a Project <ArrowIcon /></Link></div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
