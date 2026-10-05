"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Award,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────────────── */

const educationEntries = [
  {
    id: "btech",
    number: "01",
    degree: "B.Tech Computer Science & Engineering",
    institution: "Carmel College of Engineering and Technology (CCET)",
    period: "2021 – 2025",
    detail: "CGPA: 6.91 | APJ Abdul Kalam Technological University (KTU)",
    color: "#3178C6",
    Icon: GraduationCap,
    description:
      "Pursuing B.Tech in Computer Science and Engineering with focus on software development, AI/ML, and web technologies at CCET, Alappuzha.",
  },
  {
    id: "hsc",
    number: "02",
    degree: "Higher Secondary (Computer Science)",
    institution: "Govt. Model Boys HSS, Haripad",
    period: "2019 – 2021",
    detail: "Score: 89% | Kerala Board",
    color: "#339933",
    Icon: BookOpen,
    description:
      "Completed higher secondary education with Computer Science stream, building strong fundamentals in programming and mathematics.",
  },
  {
    id: "sslc",
    number: "03",
    degree: "SSLC",
    institution: "SNEMHSS, Oachira",
    period: "2019",
    detail: "Score: 85% | Kerala Board",
    color: "#FF6B35",
    Icon: Award,
    description:
      "Completed SSLC with strong academic foundation, scoring 85% and establishing excellent learning habits.",
  },
] as const;

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  /* shared animation variants */
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      style={{ backgroundColor: "#FFFFFF" }}
      className="py-16 md:py-24"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14"
        >
          <p className="text-xs font-mono tracking-[0.22em] text-neutral-400 uppercase mb-4">
            04 / EDUCATION
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
            Academic journey.
          </h2>
        </motion.div>

        {/* ── Timeline rows ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="divide-y divide-neutral-100"
        >
          {educationEntries.map((entry) => {
            const isOpen = openId === entry.id;
            const { Icon } = entry;

            return (
              <motion.div key={entry.id} variants={rowVariants}>
                {/* ── Row header (always visible) ── */}
                <button
                  onClick={() => toggle(entry.id)}
                  className="w-full text-left py-6 group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  {/* flex-wrap so right-side meta wraps on very small screens */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:gap-x-6 md:flex-nowrap">
                    {/* Index number */}
                    <span className="font-mono text-sm text-neutral-300 w-6 shrink-0 select-none">
                      {entry.number}
                    </span>

                    {/* Colored dot + icon */}
                    <span
                      className="relative flex items-center justify-center w-9 h-9 rounded-full shrink-0"
                      style={{ backgroundColor: `${entry.color}18` }}
                    >
                      <Icon
                        size={16}
                        strokeWidth={2}
                        style={{ color: entry.color }}
                      />
                    </span>

                    {/* Text block – grows to fill space, pushes meta to the right */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                        <span className="font-semibold text-neutral-900 text-base md:text-lg leading-snug">
                          {entry.degree}
                        </span>
                        <span className="text-sm text-neutral-500 truncate max-w-[200px] sm:max-w-none">
                          {entry.institution}
                        </span>
                      </div>
                    </div>

                    {/* Right-side meta: period + badge + chevron – wraps together */}
                    <div className="flex items-center gap-2 shrink-0 flex-wrap">
                      <span className="font-mono text-xs text-neutral-400 whitespace-nowrap">
                        {entry.period}
                      </span>
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                        style={{
                          color: entry.color,
                          backgroundColor: `${entry.color}18`,
                        }}
                      >
                        {entry.detail}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="shrink-0 text-neutral-300 group-hover:text-neutral-500 transition-colors"
                      >
                        <ChevronRight size={18} strokeWidth={2} />
                      </motion.span>
                    </div>
                  </div>
                </button>

                {/* ── Expandable body ── */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-[calc(1.5rem+2.25rem+1.5rem)] md:pl-[calc(1.5rem+2.25rem+2.5rem)]">
                        {/* Left accent bar */}
                        <div className="relative pl-4 border-l-2" style={{ borderColor: entry.color }}>
                          <p className="text-sm text-neutral-600 leading-relaxed mb-5">
                            {entry.description}
                          </p>
                          <motion.a
                            href="#"
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.18 }}
                            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase"
                            style={{ color: entry.color }}
                          >
                            <ExternalLink size={13} strokeWidth={2.5} />
                            View Records
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
