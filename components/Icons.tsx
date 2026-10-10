import type { Service } from "@/lib/site";

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function ServiceIcon({ name }: { name: Service["icon"] }) {
  const common = { viewBox: "0 0 24 24", "aria-hidden": true as const, ...P };
  switch (name) {
    case "globe": return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" /></svg>;
    case "app": return <svg {...common}><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 21h8M12 18v3M9 10l-2 2 2 2M15 10l2 2-2 2" /></svg>;
    case "phone": return <svg {...common}><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></svg>;
    case "brush": return <svg {...common}><path d="M14 4l6 6-8.5 8.5a3 3 0 0 1-4.2 0l-1.8-1.8a3 3 0 0 1 0-4.2L14 4zM4 21c2 0 3-1 3-3" /></svg>;
    case "chart": return <svg {...common}><path d="M4 20V10M10 20V4M16 20v-8M22 20H2" /><path d="M4 7l6-3 6 5 5-4" /></svg>;
    case "card": return <svg {...common}><rect x="2.5" y="5" width="19" height="14" rx="2.5" /><path d="M2.5 10h19M6.5 15h4" /></svg>;
    case "cloud": return <svg {...common}><path d="M7 18a4.5 4.5 0 1 1 1-8.9A6 6 0 0 1 19.5 11 3.5 3.5 0 0 1 18 18H7z" /></svg>;
    case "shield": return <svg {...common}><path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" /><path d="M9 12l2.2 2.2L15.5 10" /></svg>;
    case "bot": return <svg {...common}><rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 4v4M9 13h.01M15 13h.01M9.5 16.5h5M2 13v2M22 13v2" /></svg>;
  }
}

export const MailIcon = () => <svg viewBox="0 0 24 24" aria-hidden {...P}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7l8.5 6 8.5-6" /></svg>;
export const PhoneIcon = () => <svg viewBox="0 0 24 24" aria-hidden {...P}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>;
export const PinIcon = () => <svg viewBox="0 0 24 24" aria-hidden {...P}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>;
export const ArrowIcon = () => <svg className="arrow" width="18" height="18" viewBox="0 0 24 24" aria-hidden {...P}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const ExternalIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden {...P}><path d="M7 17L17 7M9 7h8v8" /></svg>;
export const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden {...P}>
    <path d="M3.5 20.5l1.3-4.4A8.5 8.5 0 1 1 8 19.3l-4.5 1.2z" />
    <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2.2-1.1-.9.9c-1-.4-2-1.400-2.400-2.400l.9-.9L10.800 7.700 9 8.500z" />
  </svg>
);
