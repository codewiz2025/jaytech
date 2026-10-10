export const SITE = {
  name: "JayTech Digitals",
  short: "JAY-TECH",
  tagline: "Your Vision. Our Tech.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jaytech.online",
  email: "admin.jaytech@gmail.com",
  phone: "08164584620",
  phoneIntl: "+2348164584620",
  whatsapp: "https://wa.me/2348164584620",
  location: "Abuja, Nigeria — serving clients worldwide",
  ceo: "Fadayomi Ayokunle Jahswill",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ayokunle-fadayomi-959b7a403/" },
    { label: "YouTube", href: "https://www.youtube.com/@coolprof2025" },
    { label: "GitHub", href: "https://github.com/codewiz2025" },
  ],
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
] as const;

export type Service = {
  id: string;
  title: string;
  blurb: string;
  icon: "globe" | "app" | "phone" | "brush" | "chart" | "card" | "cloud" | "shield" | "bot";
  points: string[];
};

export const SERVICES: Service[] = [
  { id: "web-design", title: "Website Design & Development", icon: "globe", blurb: "Modern, responsive, conversion-focused websites — from single-page brand sites to multi-page business platforms.", points: ["Mobile-first responsive design", "Fast, SEO-ready builds", "Contact and booking integrations"] },
  { id: "web-apps", title: "Web App Development", icon: "app", blurb: "Custom dashboards, portals, booking systems and SaaS MVPs built around how your business actually works.", points: ["Admin panels & dashboards", "Learning and management platforms", "Scalable architecture"] },
  { id: "mobile", title: "Mobile App Development", icon: "phone", blurb: "Mobile experiences that put your product in your customers' hands.", points: ["Android & iOS delivery", "Clean, intuitive interfaces", "Built to grow with you"] },
  { id: "branding", title: "Graphic Design & Branding", icon: "brush", blurb: "Logos, colour systems, typography and flyers that make your business instantly recognisable.", points: ["Logo & identity design", "Brand guidelines", "Flyers and marketing visuals"] },
  { id: "marketing", title: "Digital Marketing & SEO", icon: "chart", blurb: "On-page SEO, speed optimisation and analytics so the right people find you and you can measure what works.", points: ["On-page SEO", "Performance optimisation", "Analytics & tracking"] },
  { id: "payments", title: "Payments & API Integration", icon: "card", blurb: "Connect your site to the payment and data services your customers already use.", points: ["Paystack, Flutterwave & Stripe", "Third-party API integration", "Secure checkout flows"] },
  { id: "ai", title: "AI Chatbots & Automation", icon: "bot", blurb: "Conversational AI experiences like our J2Bot platforms, tailored to support and engage your audience.", points: ["Custom chat experiences", "AI-assisted tools", "Guided by your use case"] },
  { id: "support", title: "Hosting, Support & Maintenance", icon: "shield", blurb: "Domain and hosting guidance, deployment, updates, backups and ongoing support after launch.", points: ["Deployment & domain setup", "SSL & security basics", "Ongoing updates & support"] },
];

export const PROCESS = [
  { n: "01", title: "Consultation", text: "We dig into your business, goals and audience." },
  { n: "02", title: "Strategy & UI", text: "Wireframes, modern design and clear user flows." },
  { n: "03", title: "Development", text: "Clean, fast code built to perform on every device." },
  { n: "04", title: "Testing", text: "Cross-browser, speed and mobile quality checks." },
  { n: "05", title: "Launch", text: "Deployment with SEO configuration done properly." },
  { n: "06", title: "Growth Support", text: "Maintenance, audits and optimisation as you grow." },
];

export const WHY = [
  { title: "Fast delivery", text: "Most projects are delivered within 2–10 days, depending on complexity." },
  { title: "Built to convert", text: "Every site is designed to turn visitors into customers." },
  { title: "Mobile first", text: "Flawless on phones, tablets and desktops." },
  { title: "Custom, not cookie-cutter", text: "Tailor-made apps and dashboards, not just templates." },
  { title: "Local expertise", text: "We understand Nigerian payment gateways, hosting and customers." },
  { title: "Long-term partner", text: "Maintenance, updates and scaling advice after launch." },
];

export const VALUES = [
  { title: "Integrity", text: "Honest communication and delivering what we promise." },
  { title: "Innovation", text: "Staying ahead of tech trends to give clients an edge." },
  { title: "Client-centric", text: "Your goals come first — your success is ours." },
  { title: "Global reach", text: "World-class solutions for Nigerian businesses and beyond." },
];

export const JOURNEY = [
  { year: "2022", title: "JayTech Digitals is founded", text: "Fadayomi Jahswill starts the company to bridge the digital gap for businesses in Nigeria." },
  { year: "2024", title: "J2Bot launches", text: "Our AI-powered chatbot platform enters the portfolio." },
  { year: "2025", title: "Full-stack & brand identity", text: "Services expand to full-stack development and brand identity." },
  { year: "2026", title: "A growing portfolio", text: "Education, e-commerce, AI, fashion and business platforms live across the web." },
];

export const TECH = ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Node.js", "Python", "Django", "Firebase", "Figma", "Webflow", "Netlify", "Vercel", "GitHub"];
