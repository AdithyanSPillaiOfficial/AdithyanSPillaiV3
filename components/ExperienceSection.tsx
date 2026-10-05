"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useDragControls,
} from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Briefcase,
  Code,
  BarChart2,
  Cpu,
  LucideIcon,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type EntryType = "education" | "work" | "project";

interface TimelineEntry {
  year: string;
  type: EntryType;
  title: string;
  org: string;
  detail: string;
  icon: LucideIcon;
  position: "above" | "below";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ENTRIES: TimelineEntry[] = [
  {
    year: "2019",
    type: "education",
    title: "SSLC",
    org: "SNEMHSS, Oachira",
    detail: "Score: 85% | Kerala Board",
    icon: GraduationCap,
    position: "above",
  },
  {
    year: "2019–2021",
    type: "education",
    title: "Higher Secondary (CS)",
    org: "Govt. Model Boys HSS, Haripad",
    detail: "Score: 89% | Kerala Board",
    icon: BookOpen,
    position: "below",
  },
  {
    year: "2021–2025",
    type: "education",
    title: "B.Tech Computer Science",
    org: "CCET, Alappuzha | KTU",
    detail: "CGPA: 6.91",
    icon: GraduationCap,
    position: "above",
  },
  {
    year: "2023",
    type: "work",
    title: "Android Dev Intern",
    org: "Shrishti Innovative, Trivandrum",
    detail: "Gained practical skills in Android app design and implementation",
    icon: Briefcase,
    position: "below",
  },
  {
    year: "2023",
    type: "project",
    title: "Digital Library System",
    org: "B.Tech Mini Project",
    detail: "Built a digital library for college with book search and PYQ access",
    icon: Code,
    position: "above",
  },
  {
    year: "2024",
    type: "work",
    title: "Data Mining Workshop",
    org: "NIT Calicut",
    detail: "Enhanced knowledge in data analysis and mining techniques",
    icon: BarChart2,
    position: "below",
  },
  {
    year: "2024",
    type: "project",
    title: "EXamin & EduCCET",
    org: "Personal Projects",
    detail: "Built exam software and student academic mobile app",
    icon: Code,
    position: "above",
  },
  {
    year: "2024–2025",
    type: "project",
    title: "RIAAQE – B.Tech Main Project",
    org: "AI/ML Research Project",
    detail: "Real-time interview analysis with adaptive questioning using AI",
    icon: Cpu,
    position: "below",
  },
];

const YEAR_LABELS = ["2019", "2020", "2021", "2022", "2023", "2024", "2025"];

// ─── Type theme helper ─────────────────────────────────────────────────────────

const TYPE_THEME: Record<
  EntryType,
  {
    label: string;
    badge: string;
    iconBg: string;
    iconText: string;
    stem: string;
    dot: string;
    dotBorder: string;
  }
> = {
  education: {
    label: "Education",
    badge: "bg-blue-100 text-blue-700",
    iconBg: "bg-blue-50",
    iconText: "text-blue-600",
    stem: "bg-blue-300",
    dot: "border-blue-400",
    dotBorder: "border-blue-400",
  },
  work: {
    label: "Work",
    badge: "bg-green-100 text-green-700",
    iconBg: "bg-green-50",
    iconText: "text-green-600",
    stem: "bg-green-300",
    dot: "border-green-400",
    dotBorder: "border-green-400",
  },
  project: {
    label: "Project",
    badge: "bg-purple-100 text-purple-700",
    iconBg: "bg-purple-50",
    iconText: "text-purple-600",
    stem: "bg-purple-300",
    dot: "border-purple-400",
    dotBorder: "border-purple-400",
  },
};

// ─── Badge ─────────────────────────────────────────────────────────────────────

function TypeBadge({ type }: { type: EntryType }) {
  const theme = TYPE_THEME[type];
  return (
    <span
      className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide ${theme.badge}`}
    >
      {theme.label}
    </span>
  );
}

// ─── Card variants (desktop) ───────────────────────────────────────────────────

const cardVariants = {
  hidden: (above: boolean) => ({
    opacity: 0,
    y: above ? -40 : 40,
  }),
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Desktop card inner content ────────────────────────────────────────────────

function CardContent({ entry, above }: { entry: TimelineEntry; above: boolean }) {
  const theme = TYPE_THEME[entry.type];
  const Icon = entry.icon;

  return (
    <motion.div
      custom={above}
      variants={cardVariants}
      className="flex flex-col gap-3 w-64 rounded-xl bg-white border border-gray-100 shadow-md p-5"
      whileHover={{
        y: above ? -4 : 4,
        boxShadow: "0 12px 40px rgba(0,0,0,0.10)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Icon circle */}
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full ${theme.iconBg} ${theme.iconText}`}
      >
        <Icon size={20} strokeWidth={1.8} />
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 flex-wrap">
        <TypeBadge type={entry.type} />
        <span className="text-xs text-gray-400 font-medium">{entry.year}</span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold text-gray-900 leading-snug">
        {entry.title}
      </h3>

      {/* Org */}
      <p className="text-xs text-gray-500 leading-snug">{entry.org}</p>

      {/* Detail */}
      <p className="text-xs text-gray-400 leading-relaxed">{entry.detail}</p>
    </motion.div>
  );
}

// ─── Mobile vertical card ──────────────────────────────────────────────────────

const mobileCardVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function MobileCard({ entry }: { entry: TimelineEntry }) {
  const theme = TYPE_THEME[entry.type];
  const Icon = entry.icon;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative flex items-start gap-4 pb-8 last:pb-0">
      {/* Dot on the vertical line */}
      <div className="relative flex-shrink-0 flex flex-col items-center" style={{ width: 20 }}>
        <div
          className={`w-4 h-4 rounded-full border-2 bg-white ${theme.dotBorder} z-10 mt-1`}
          style={{ boxShadow: "0 0 0 3px #F5F4E8" }}
        />
      </div>

      {/* Card */}
      <motion.div
        variants={mobileCardVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex-1 flex flex-col gap-2 rounded-xl bg-white border border-gray-100 shadow-md p-4"
        whileHover={{ boxShadow: "0 12px 40px rgba(0,0,0,0.10)" }}
      >
        {/* Icon + meta row */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 ${theme.iconBg} ${theme.iconText}`}
          >
            <Icon size={18} strokeWidth={1.8} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <TypeBadge type={entry.type} />
            <span className="text-xs text-gray-400 font-medium">{entry.year}</span>
          </div>
        </div>

        <h3 className="text-sm font-bold text-gray-900 leading-snug">
          {entry.title}
        </h3>
        <p className="text-xs text-gray-500 leading-snug">{entry.org}</p>
        <p className="text-xs text-gray-400 leading-relaxed">{entry.detail}</p>
      </motion.div>
    </div>
  );
}

// ─── Mobile vertical timeline ──────────────────────────────────────────────────

function MobileTimeline({ isInView }: { isInView: boolean }) {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Left border line + cards */}
      <div className="relative border-l-2 border-gray-200 pl-2">
        {ENTRIES.map((entry, index) => (
          <MobileCard key={index} entry={entry} />
        ))}
      </div>
    </div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Section entry animation
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Parallax: as user scrolls through section, shift timeline left
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-16 md:py-24 overflow-hidden"
      style={{ background: "#F5F4E8" }}
    >
      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <motion.p
          className="text-xs tracking-[0.25em] font-semibold text-gray-400 uppercase mb-3"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          05 / EXPERIENCE
        </motion.p>
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Journey so far.
        </motion.h2>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* MOBILE: vertical stacked timeline (<768px)                           */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="block md:hidden">
        <MobileTimeline isInView={isInView} />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* DESKTOP: horizontal draggable timeline (≥768px) — unchanged          */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
        {/* ── Timeline Wrapper ── */}
        <div className="relative" style={{ height: 520 }}>
          {/* Giant muted year labels (absolute, behind everything) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center overflow-hidden select-none"
            style={{ zIndex: 0 }}
          >
            {YEAR_LABELS.map((y, i) => (
              <span
                key={y}
                className="text-gray-900 font-black shrink-0"
                style={{
                  fontSize: "clamp(80px, 14vw, 160px)",
                  opacity: 0.07,
                  letterSpacing: "-0.04em",
                  marginLeft: i === 0 ? "4vw" : "6vw",
                  lineHeight: 1,
                }}
              >
                {y}
              </span>
            ))}
          </div>

          {/* Draggable + parallax track */}
          <motion.div
            ref={trackRef}
            drag="x"
            dragControls={dragControls}
            dragConstraints={{ left: -1400, right: 0 }}
            dragElastic={0.08}
            style={{ x: trackX, cursor: "grab", zIndex: 1 }}
            whileDrag={{ cursor: "grabbing" }}
            className="absolute inset-0 flex items-center"
          >
            {/* Inner scroll track */}
            <motion.div
              className="relative flex items-center"
              style={{
                width: "max-content",
                paddingLeft: "8vw",
                paddingRight: "8vw",
                height: "100%",
              }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.18 } },
              }}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Horizontal line */}
              <div
                className="absolute left-0 right-0 bg-gray-300"
                style={{ top: "50%", height: 2, transform: "translateY(-50%)", zIndex: 0 }}
              />

              {/* Cards */}
              {ENTRIES.map((entry, index) => {
                const above = entry.position === "above";
                const theme = TYPE_THEME[entry.type];

                return (
                  <div
                    key={index}
                    className="relative flex flex-col items-center"
                    style={{
                      width: 280,
                      height: "100%",
                      flexShrink: 0,
                      marginRight: index < ENTRIES.length - 1 ? 48 : 0,
                      justifyContent: "center",
                    }}
                  >
                    {above ? (
                      <>
                        {/* Top half: card + stem */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "calc(50% + 1px)",
                            left: 0,
                            right: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          <CardContent entry={entry} above={true} />
                          {/* Stem below card */}
                          <div
                            className={`w-px ${theme.stem}`}
                            style={{ height: 48 }}
                          />
                        </div>

                        {/* Dot on line */}
                        <div
                          className={`w-4 h-4 rounded-full border-2 bg-white ${theme.dot}`}
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 2,
                          }}
                        />
                      </>
                    ) : (
                      <>
                        {/* Dot on line */}
                        <div
                          className={`w-4 h-4 rounded-full border-2 bg-white ${theme.dot}`}
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 2,
                          }}
                        />

                        {/* Bottom half: stem + card */}
                        <div
                          style={{
                            position: "absolute",
                            top: "calc(50% + 1px)",
                            left: 0,
                            right: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          {/* Stem above card */}
                          <div
                            className={`w-px ${theme.stem}`}
                            style={{ height: 48 }}
                          />
                          <CardContent entry={entry} above={false} />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Drag hint */}
        <motion.p
          className="text-center text-xs text-gray-400 mt-6 select-none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          ← drag to explore →
        </motion.p>
      </div>
    </section>
  );
}
