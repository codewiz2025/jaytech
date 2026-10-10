import Image from "next/image";
import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { PROJECTS } from "@/lib/projects";

export default function Footer() {
  const links = PROJECTS.filter((p) => p.featured).slice(0, 5);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand" aria-label="JayTech Digitals home">
              <Image src="/brand/logo.png" alt="" width={46} height={46} />
              <span className="brand-name">JAY-TECH<small>DIGITALS</small></span>
            </Link>
            <p style={{ marginTop: 18, maxWidth: 340 }}>Web, apps and digital solutions for businesses in Nigeria and beyond. <b style={{ color: "#fff" }}>{SITE.tagline}</b></p>
            <div className="socials">
              {SITE.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>)}
            </div>
          </div>
          <div>
            <h4>Navigate</h4>
            <ul>{NAV.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Featured work</h4>
            <ul>
              {links.map((p) => <li key={p.id}><a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a></li>)}
              <li><Link href="/portfolio">All 20 projects →</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><a href={`tel:${SITE.phoneIntl}`}>{SITE.phone}</a></li>
              <li><a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp us</a></li>
              <li><span style={{ color: "var(--muted)" }}>{SITE.location}</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} JayTech Digitals. Led by {SITE.ceo}.</span>
          <span>Websites · Apps · Digital Solutions</span>
        </div>
      </div>
    </footer>
  );
}
