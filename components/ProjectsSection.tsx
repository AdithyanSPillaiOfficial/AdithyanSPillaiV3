"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  LayoutGroup,
} from "framer-motion";
import { ExternalLink, ChevronRight, Shield, AlertTriangle, CheckCircle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  short: string;
  title: string;
  tags: string[];
  description: string;
  features: string[];
  tech: string[];
  github: string;
  hasPreview?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: "riaaqe",
    short: "RIAAQE",
    title: "Realtime Interview Analysis & Adaptive Questioning Engine",
    tags: ["MAIN PROJECT", "AI/ML", "REAL-TIME"],
    description:
      "An AI-enabled tool to assess participant confidence via audio/video cues, featuring real-time analysis and adaptive question suggestions for interviewers based on responses. Built as B.Tech Main Project (2024-2025).",
    features: [
      "Audio/video confidence analysis",
      "Real-time adaptive questions",
      "Interviewer dashboard",
      "AI-powered insights",
    ],
    tech: ["Python", "AI/ML", "React", "Node.js"],
    github: "#",
    hasPreview: true,
  },
  {
    id: "examin",
    short: "EXamin",
    title: "EXamin — Computer-Based Testing Platform",
    tags: ["WEB APP", "EXAM SOFTWARE", "FULLSTACK"],
    description:
      "A full-featured computer-based testing platform with section-based MCQ division, question palette, and easy navigation. Built with modern web technologies.",
    features: [
      "Computer-based testing",
      "Section-based MCQs",
      "Question palette navigation",
      "User-friendly interface",
    ],
    tech: ["React JS", "Node JS", "Express", "MongoDB"],
    github: "#",
  },
  {
    id: "educcet",
    short: "EduCCET",
    title: "EduCCET — Student Academic App",
    tags: ["MOBILE APP", "EDUCATION", "FLUTTER"],
    description:
      "A mobile application for CCET students to explore B.Tech syllabus, credits, and course criteria, enhancing accessibility and academic planning.",
    features: [
      "Syllabus explorer",
      "Credit tracker",
      "Course criteria",
      "Academic planning",
    ],
    tech: ["Flutter", "Dart", "Mobile"],
    github: "#",
  },
  {
    id: "digilib",
    short: "DigiLib",
    title: "Digital Library System",
    tags: ["MINI PROJECT", "WEB APP", "LIBRARY"],
    description:
      "A digital library system for college providing search and access to books, notes, and previous year question papers, aimed at improving study material availability.",
    features: [
      "Book search & access",
      "Notes repository",
      "PYQ access",
      "Anytime anywhere access",
    ],
    tech: ["Web Technologies", "Database"],
    github: "#",
  },
];

// ─── Tech badge colour map ────────────────────────────────────────────────────

const TECH_COLORS: Record<string, { bg: string; text: string }> = {
  "Next.js":          { bg: "#18181B", text: "#FFFFFF" },
  React:              { bg: "#0EA5E9", text: "#FFFFFF" },
  "React JS":         { bg: "#0EA5E9", text: "#FFFFFF" },
  Python:             { bg: "#3B82F6", text: "#FFFFFF" },
  "AI/ML":            { bg: "#8B5CF6", text: "#FFFFFF" },
  "Node.js":          { bg: "#84CC16", text: "#1A1A1A" },
  "Node JS":          { bg: "#84CC16", text: "#1A1A1A" },
  Express:            { bg: "#374151", text: "#F9FAFB" },
  MongoDB:            { bg: "#22C55E", text: "#FFFFFF" },
  Flutter:            { bg: "#06B6D4", text: "#FFFFFF" },
  Dart:               { bg: "#0EA5E9", text: "#FFFFFF" },
  Mobile:             { bg: "#F97316", text: "#FFFFFF" },
  "Web Technologies": { bg: "#6366F1", text: "#FFFFFF" },
  Database:           { bg: "#10B981", text: "#FFFFFF" },
};

// ─── RIAAQE Preview Card ──────────────────────────────────────────────────────

function RIAAQEPreview() {
  const bars = [4, 7, 5, 9, 6, 8, 4, 7, 5, 9, 6, 8, 5, 7, 4];

  return (
    <div
      className="rounded-2xl p-5 w-full max-w-xs flex flex-col gap-4"
      style={{
        background: "#1a1a2e",
        boxShadow:
          "inset 0 2px 8px rgba(0,0,0,0.4), 0 4px 24px rgba(0,0,0,0.5)",
        border: "1px solid rgba(0,255,150,0.15)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
          />
          <span className="text-[10px] font-bold tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.45)" }}>
            Analysis Active
          </span>
        </div>
        <span
          className="text-[9px] font-mono px-2 py-0.5 rounded-full"
          style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }}
        >
          LIVE
        </span>
      </div>

      {/* Confidence Score */}
      <div className="flex flex-col items-center gap-1">
        <span
          className="text-6xl font-black tabular-nums"
          style={{ color: "#22c55e", textShadow: "0 0 24px rgba(34,197,94,0.5)" }}
        >
          87<span className="text-3xl" style={{ color: "rgba(34,197,94,0.6)" }}>%</span>
        </span>
        <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
          Confidence Level
        </span>
      </div>

      {/* Waveform bars */}
      <div className="flex items-end justify-center gap-[3px] h-10">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="rounded-sm"
            style={{
              width: 4,
              background: i % 3 === 0
                ? "#22c55e"
                : i % 3 === 1
                ? "rgba(34,197,94,0.6)"
                : "rgba(34,197,94,0.3)",
            }}
            animate={{
              height: [`${h * 3}px`, `${(h + 3) * 3}px`, `${h * 3}px`],
            }}
            transition={{
              duration: 0.8 + i * 0.05,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.07,
            }}
          />
        ))}
      </div>

      {/* Metric labels */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Confidence", value: "87%" },
          { label: "Engagement", value: "91%" },
          { label: "Clarity",    value: "79%" },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 rounded-xl py-2 px-1"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <span className="text-sm font-bold" style={{ color: "#22c55e" }}>
              {value}
            </span>
            <span className="text-[9px] tracking-wide text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Collapsed Panel ──────────────────────────────────────────────────────────

function CollapsedPanel({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      layoutId={`panel-${project.id}`}
      onClick={onClick}
      className="relative flex items-center justify-center cursor-pointer overflow-hidden rounded-2xl"
      style={{
        flex: "0 0 19%",
        minWidth: 60,
        background: index % 2 === 0 ? "#1A1A1A" : "#2D2D2D",
        border: "1.5px solid rgba(255,255,255,0.07)",
      }}
      whileHover={{ flex: "0 0 22%", transition: { duration: 0.25 } }}
      transition={{ layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
    >
      {/* Vertical number */}
      <span
        className="absolute top-6 left-0 right-0 text-center text-[10px] font-mono text-white/20 tracking-widest"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Vertical title */}
      <span
        className="text-sm font-bold tracking-widest text-white/70 select-none"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
          letterSpacing: "0.15em",
        }}
      >
        {project.short}
      </span>

      {/* Hover cue */}
      <ChevronRight
        size={14}
        className="absolute bottom-5 text-white/30"
      />
    </motion.div>
  );
}

// ─── Expanded Panel ───────────────────────────────────────────────────────────

function ExpandedPanel({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      layoutId={`panel-${project.id}`}
      className="relative flex flex-col overflow-hidden rounded-2xl"
      style={{
        flex: "0 0 58%",
        background: "#1A1A1A",
        border: "1.5px solid rgba(255,255,255,0.10)",
        cursor: "default",
      }}
      transition={{ layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`content-${project.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="flex flex-col h-full p-8"
        >
          {/* Top row */}
          <div className="flex items-start justify-between mb-6">
            <div>
              {/* Index */}
              <span className="text-[10px] font-mono text-white/30 tracking-widest block mb-2">
                {String(index + 1).padStart(2, "0")} / PROJECT
              </span>
              {/* Title */}
              <h3 className="text-2xl font-black text-white leading-tight mb-3">
                {project.title}
              </h3>
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-bold tracking-widest px-2 py-1 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.55)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* GitHub button */}
            <a
              href={project.github}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.08)";
              }}
            >
              <ExternalLink size={14} />
              GitHub
            </a>
          </div>

          {/* Main content */}
          <div className="flex gap-8 flex-1">
            {/* Left col */}
            <div className="flex-1 flex flex-col gap-5">
              {/* Description */}
              <p className="text-sm leading-relaxed text-white/55">
                {project.description}
              </p>

              {/* Features */}
              <div>
                <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase block mb-3">
                  Key Features
                </span>
                <ul className="space-y-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/65">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "#A3E635" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech badges */}
              <div>
                <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase block mb-3">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => {
                    const c = TECH_COLORS[t] ?? { bg: "#374151", text: "#F9FAFB" };
                    return (
                      <span
                        key={t}
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: c.bg, color: c.text }}
                      >
                        {t}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right col: preview */}
            {project.hasPreview && (
              <div className="flex items-center justify-center flex-shrink-0">
                <RIAAQEPreview />
              </div>
            )}
          </div>

          {/* Collapse hint */}
          <button
            onClick={onClick}
            className="mt-6 self-start text-[10px] font-bold tracking-widest text-white/25 hover:text-white/50 transition-colors uppercase"
          >
            ← Collapse
          </button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ProjectsSection() {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  const toggle = (id: string) => {
    setActiveId((prev) => (prev === id ? PROJECTS[0].id : id));
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        background: "#F5F4E8",
        paddingTop: 100,
        paddingBottom: 100,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-14"
        >
          <span
            className="text-xs font-bold tracking-widest uppercase block mb-4"
            style={{ color: "#A8A89A" }}
          >
            03 / SELECTED WORK
          </span>
          <h2
            className="text-5xl lg:text-6xl font-black leading-none"
            style={{ color: "#1A1A1A" }}
          >
            Things I&apos;ve Built
          </h2>
        </motion.div>

        {/* ── Desktop Accordion (lg+) ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="hidden lg:block"
        >
          <LayoutGroup>
            <div
              className="flex gap-4"
              style={{ height: 520 }}
            >
              {PROJECTS.map((project, index) =>
                project.id === activeId ? (
                  <ExpandedPanel
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={() => {
                      // clicking collapse on active → keep first active
                      const next = PROJECTS.find((p) => p.id !== project.id);
                      if (next) setActiveId(next.id);
                    }}
                  />
                ) : (
                  <CollapsedPanel
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={() => toggle(project.id)}
                  />
                )
              )}
            </div>
          </LayoutGroup>

          {/* Desktop bottom note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-xs tracking-widest uppercase text-center"
            style={{ color: "#A8A89A" }}
          >
            Click a panel to explore
          </motion.p>
        </motion.div>

        {/* ── Mobile / Tablet Card Stack (<lg) ── */}
        <div className="flex flex-col gap-6 lg:hidden">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.15 + index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="w-full rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 flex flex-col gap-5"
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Index */}
                  <span className="text-[10px] font-mono tracking-widest block mb-1" style={{ color: "#A8A89A" }}>
                    {String(index + 1).padStart(2, "0")} / PROJECT
                  </span>
                  {/* Title */}
                  <h3 className="text-lg font-black leading-snug" style={{ color: "#1A1A1A" }}>
                    {project.title}
                  </h3>
                </div>

                {/* GitHub link */}
                <a
                  href={project.github}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                  style={{
                    background: "#1A1A1A",
                    color: "#FFFFFF",
                  }}
                >
                  <ExternalLink size={12} />
                  GitHub
                </a>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-bold tracking-widest px-2 py-1 rounded-full"
                    style={{
                      background: "rgba(0,0,0,0.06)",
                      color: "rgba(0,0,0,0.5)",
                      border: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                {project.description}
              </p>

              {/* Features */}
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase block mb-2" style={{ color: "#A8A89A" }}>
                  Key Features
                </span>
                <ul className="space-y-1.5">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "#444" }}>
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "#84CC16" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech badges */}
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase block mb-2" style={{ color: "#A8A89A" }}>
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => {
                    const c = TECH_COLORS[t] ?? { bg: "#374151", text: "#F9FAFB" };
                    return (
                      <span
                        key={t}
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: c.bg, color: c.text }}
                      >
                        {t}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* RIAAQE preview (mobile) */}
              {project.hasPreview && (
                <div className="flex justify-center pt-2">
                  <RIAAQEPreview />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
