"use client";
import Image from "next/image";
import { motion } from "motion/react";
import type { Project } from "@/lib/projects";
import { ExternalIcon } from "./Icons";
import { Spotlight } from "./Motion";

function host(url: string) { try { return new URL(url).host.replace(/^www\./, ""); } catch { return url; } }

export default function ProjectCard({ p, priority = false }: { p: Project; priority?: boolean }) {
  const mono = p.name.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w[0])).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const [h1, h2] = p.hue;
  return (
    <motion.article layout initial={{ opacity: 0, scale: 0.92, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }} style={{ height: "100%" }}>
      <Spotlight className="project">
        <a className="project-link" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} — visit website (opens in a new tab)`}>
          <div className="thumb">
            {p.image ? (
              <Image src={p.image} alt={`Screenshot of ${p.name}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1020px) 50vw, 33vw" priority={priority} />
            ) : (
              <>
                <div className="thumb-art" aria-hidden style={{ background: `radial-gradient(circle at 20% 15%, hsl(${h1} 90% 60% / .75), transparent 55%), radial-gradient(circle at 85% 90%, hsl(${h2} 90% 55% / .7), transparent 55%), linear-gradient(135deg, hsl(${h1} 60% 14%), hsl(${h2} 60% 10%))` }} />
                <div className="thumb-mono" aria-hidden>{mono}</div>
              </>
            )}
            <span className="thumb-badge">{p.category}</span>
            {p.featured && <span className="thumb-badge feat">Featured</span>}
            <div className="thumb-hover" aria-hidden><b>Visit Website ↗</b></div>
          </div>
          <div className="project-body">
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
            <div className="project-foot"><span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>Visit Website <ExternalIcon /></span><small>{host(p.url)}</small></div>
          </div>
        </a>
      </Spotlight>
    </motion.article>
  );
}
