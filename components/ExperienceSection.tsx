"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
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

// Card width + gap used to calculate total track width
const CARD_W   = 280;
const CARD_GAP = 56;

// Year labels that travel with the track (spaced evenly)
const YEAR_LABELS = ["2019", "2020", "2021", "2022", "2023", "2024", "2025"];

// ─── Type theme ───────────────────────────────────────────────────────────────

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

// ─── Badge ────────────────────────────────────────────────────────────────────

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

// ─── Desktop card ─────────────────────────────────────────────────────────────

function CardContent({
  entry,
  above,
}: {
  entry: TimelineEntry;
  above: boolean;
}) {
  const theme = TYPE_THEME[entry.type];
  const Icon  = entry.icon;

  return (
    <motion.div
      className="flex flex-col gap-3 rounded-xl bg-white border border-gray-100 shadow-md p-5"
      style={{ width: CARD_W }}
      initial={{ opacity: 0, y: above ? -30 : 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{
        y: above ? -4 : 4,
        boxShadow: "0 12px 40px rgba(0,0,0,0.10)",
      }}
    >
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full ${theme.iconBg} ${theme.iconText}`}
      >
        <Icon size={20} strokeWidth={1.8} />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <TypeBadge type={entry.type} />
        <span className="text-xs text-gray-400 font-medium">{entry.year}</span>
      </div>

      <h3 className="text-sm font-bold text-gray-900 leading-snug">
        {entry.title}
      </h3>
      <p className="text-xs text-gray-500 leading-snug">{entry.org}</p>
      <p className="text-xs text-gray-400 leading-relaxed">{entry.detail}</p>
    </motion.div>
  );
}

// ─── Mobile card ──────────────────────────────────────────────────────────────

function MobileCard({ entry }: { entry: TimelineEntry }) {
  const theme  = TYPE_THEME[entry.type];
  const Icon   = entry.icon;
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative flex items-start gap-4 pb-8 last:pb-0">
      <div
        className="relative flex-shrink-0 flex flex-col items-center"
        style={{ width: 20 }}
      >
        <div
          className={`w-4 h-4 rounded-full border-2 bg-white ${theme.dotBorder} z-10 mt-1`}
          style={{ boxShadow: "0 0 0 3px #F5F4E8" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="flex-1 flex flex-col gap-2 rounded-xl bg-white border border-gray-100 shadow-md p-4"
        whileHover={{ boxShadow: "0 12px 40px rgba(0,0,0,0.10)" }}
      >
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

// ─── Mobile timeline ──────────────────────────────────────────────────────────

function MobileTimeline() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="relative border-l-2 border-gray-200 pl-2">
        {ENTRIES.map((entry, i) => (
          <MobileCard key={i} entry={entry} />
        ))}
      </div>
    </div>
  );
}

// ─── Desktop horizontal timeline with scroll-hijack ───────────────────────────

function DesktopTimeline({ isInView }: { isInView: boolean }) {
  // Total scrollable distance for the track
  // (n cards × width + (n-1) gaps + 2 × 8vw padding estimated as 160px each side)
  const PADDING     = 160; // px approximation for 8vw at 1200px viewport
  const TRACK_W     = ENTRIES.length * (CARD_W + CARD_GAP) + PADDING * 2;
  const MAX_SCROLL  = TRACK_W - (typeof window !== "undefined" ? window.innerWidth : 1200);

  const sectionRef   = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const yearTrackRef = useRef<HTMLDivElement>(null);

  // Spring-smoothed x value for the track
  const rawX    = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 100, damping: 22, mass: 0.8 });

  // Whether wheel scroll is currently "locked" to horizontal
  const locked    = useRef(false);
  const animating = useRef(false);

  // Clamp helper
  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!sectionRef.current) return;

      const rect      = sectionRef.current.getBoundingClientRect();
      const inSection =
        rect.top <= window.innerHeight * 0.5 &&
        rect.bottom >= window.innerHeight * 0.5;

      if (!inSection) return;

      const current = rawX.get();
      const atStart = current >= 0;
      const atEnd   = current <= -MAX_SCROLL;

      // Allow normal vertical scroll when already at extremes and scrolling outward
      if (atStart && e.deltaY < 0) return;
      if (atEnd  && e.deltaY > 0) return;

      // Otherwise hijack
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY * 1.8;
      const next  = clamp(current - delta, -MAX_SCROLL, 0);
      rawX.set(next);
    },
    [rawX, MAX_SCROLL, clamp]
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // Drag support (touch / mouse)
  const dragStartX = useRef(0);
  const dragStartRaw = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current    = e.clientX;
    dragStartRaw.current  = rawX.get();
    trackRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!trackRef.current?.hasPointerCapture(e.pointerId)) return;
    const delta = e.clientX - dragStartX.current;
    rawX.set(clamp(dragStartRaw.current + delta, -MAX_SCROLL, 0));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    trackRef.current?.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={sectionRef}
      className="relative select-none"
      style={{ height: 520 }}
    >
      {/* ── Year labels — travel with the track ── */}
      <motion.div
        aria-hidden
        style={{ x: springX, zIndex: 0 }}
        className="pointer-events-none absolute inset-0 flex items-center overflow-visible select-none"
      >
        <div
          className="flex items-center"
          style={{ paddingLeft: PADDING, gap: "8vw" }}
        >
          {YEAR_LABELS.map((y) => (
            <span
              key={y}
              className="text-gray-900 font-black shrink-0 leading-none"
              style={{
                fontSize: "clamp(72px, 12vw, 150px)",
                opacity: 0.06,
                letterSpacing: "-0.04em",
              }}
            >
              {y}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Draggable card track ── */}
      <motion.div
        ref={trackRef}
        style={{ x: springX, cursor: "grab", zIndex: 1 }}
        whileTap={{ cursor: "grabbing" }}
        className="absolute inset-0 flex items-center"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div
          className="relative flex items-center"
          style={{
            width: "max-content",
            paddingLeft: PADDING,
            paddingRight: PADDING,
            height: "100%",
          }}
        >
          {/* Horizontal centre line */}
          <div
            className="absolute left-0 right-0 bg-gray-300"
            style={{
              top: "50%",
              height: 2,
              transform: "translateY(-50%)",
              zIndex: 0,
              width: TRACK_W,
            }}
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
                  width: CARD_W,
                  height: "100%",
                  flexShrink: 0,
                  marginRight: index < ENTRIES.length - 1 ? CARD_GAP : 0,
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
                      {isInView && <CardContent entry={entry} above />}
                      <div className={`w-px ${theme.stem}`} style={{ height: 48 }} />
                    </div>

                    {/* Dot */}
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
                    {/* Dot */}
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
                      <div className={`w-px ${theme.stem}`} style={{ height: 48 }} />
                      {isInView && <CardContent entry={entry} above={false} />}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Edge fade hints */}
      <div
        className="pointer-events-none absolute left-0 inset-y-0 w-24 z-10"
        style={{
          background: "linear-gradient(to right, #F5F4E8 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 inset-y-0 w-24 z-10"
        style={{
          background: "linear-gradient(to left, #F5F4E8 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-100px" });

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

      {/* Mobile */}
      <div className="block md:hidden">
        <MobileTimeline />
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <DesktopTimeline isInView={isInView} />

        <motion.p
          className="text-center text-xs text-gray-400 mt-6 select-none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          scroll or drag to explore →
        </motion.p>
      </div>
    </section>
  );
}
