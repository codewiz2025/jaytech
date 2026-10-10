"use client";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { CATEGORIES, PROJECTS, type Category } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

export default function PortfolioGrid() {
  const [active, setActive] = useState<"All" | Category>("All");
  const list = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);
  const count = (c: "All" | Category) => (c === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === c).length);
  return (
    <LayoutGroup>
      <div className="filters" role="group" aria-label="Filter projects by category">
        {CATEGORIES.map((c) => (
          <button key={c} className="filter" aria-pressed={active === c} onClick={() => setActive(c)}>
            {active === c && <motion.span layoutId="filter-bg" className="filter-bg" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            {c}<span className="count">{count(c)}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">{list.length} projects shown</p>
      <motion.div layout className="grid grid-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => <ProjectCard key={p.id} p={p} priority={i < 3} />)}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}
