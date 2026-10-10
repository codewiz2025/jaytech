import Link from "next/link";
import type { Service } from "@/lib/site";
import { ServiceIcon } from "./Icons";
import { Spotlight } from "./Motion";

export default function ServiceCard({ s, full = false }: { s: Service; full?: boolean }) {
  return (
    <Spotlight id={s.id} style={{ height: "100%", scrollMarginTop: 120 }}>
      <div className="icon-box"><ServiceIcon name={s.icon} /></div>
      <h3>{s.title}</h3>
      <p>{s.blurb}</p>
      {full && <ul className="ticks">{s.points.map((p) => <li key={p}>{p}</li>)}</ul>}
      <Link className="link-arrow" href={`/contact?service=${encodeURIComponent(s.title)}`} style={{ marginTop: full ? 0 : 18 }}>Enquire <span>→</span></Link>
    </Spotlight>
  );
}
