import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SITE } from "@/lib/site";
import { BackgroundFx, Cursor, Loader, Nav, Providers, ScrollProgress, WhatsAppFloat } from "@/components/Shell";
import Footer from "@/components/Footer";

const description = "JayTech Digitals is a web design and software development agency in Abuja, Nigeria. Websites, web & mobile apps, branding, SEO and AI solutions that help businesses grow.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "JayTech Digitals — Websites, Apps & Digital Solutions", template: "%s | JayTech Digitals" },
  description,
  keywords: ["JayTech Digitals", "web design Nigeria", "web development Abuja", "software development Nigeria", "Fadayomi Ayokunle Jahswill", "branding", "AI chatbots"],
  authors: [{ name: SITE.ceo }],
  openGraph: {
    type: "website", siteName: SITE.name, title: "JayTech Digitals — Websites, Apps & Digital Solutions", description, locale: "en_NG",
    images: [{ url: "/brand/banner.png", width: 1536, height: 1024, alt: "JayTech Digitals — Your Vision. Our Tech." }],
  },
  twitter: { card: "summary_large_image", title: "JayTech Digitals", description, images: ["/brand/banner.png"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#050a18", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org", "@type": "Organization", name: SITE.name, url: SITE.url, logo: `${SITE.url}/brand/logo.png`,
  email: SITE.email, telephone: SITE.phoneIntl, founder: { "@type": "Person", name: SITE.ceo },
  address: { "@type": "PostalAddress", addressLocality: "Abuja", addressCountry: "NG" }, sameAs: SITE.socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <noscript><style>{".loader{display:none!important}.page-wipe{display:none!important}"}</style></noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>
          <a className="skip-link" href="#main">Skip to content</a>
          <Loader />
          <ScrollProgress />
          <BackgroundFx />
          <Cursor />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  );
}
