"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Database"
  | "Mobile"
  | "Tools"
  | "Creative"
  | "AI/ML";

interface TechElement {
  symbol: string;
  name: string;
  number: number;
  category: Category;
  color: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TECH_ELEMENTS: TechElement[] = [
  { symbol: "C",   name: "C",           number: 1,  category: "Languages", color: "#00599C" },
  { symbol: "C++", name: "C++",         number: 2,  category: "Languages", color: "#00549D" },
  { symbol: "Py",  name: "Python",      number: 3,  category: "Languages", color: "#3776AB" },
  { symbol: "Js",  name: "JavaScript",  number: 4,  category: "Languages", color: "#F7DF1E" },
  { symbol: "Ts",  name: "TypeScript",  number: 5,  category: "Languages", color: "#3178C6" },
  { symbol: "Php", name: "PHP",         number: 6,  category: "Languages", color: "#777BB4" },
  { symbol: "Ra",  name: "React.js",    number: 7,  category: "Frontend",  color: "#61DAFB" },
  { symbol: "Ht",  name: "HTML5",       number: 8,  category: "Frontend",  color: "#E34F26" },
  { symbol: "Cs",  name: "CSS3",        number: 9,  category: "Frontend",  color: "#1572B6" },
  { symbol: "Th",  name: "Three.js",    number: 10, category: "Frontend",  color: "#000000" },
  { symbol: "Gs",  name: "GSAP",        number: 11, category: "Frontend",  color: "#88CE02" },
  { symbol: "Nd",  name: "Node.js",     number: 12, category: "Backend",   color: "#339933" },
  { symbol: "Ex",  name: "Express",     number: 13, category: "Backend",   color: "#404040" },
  { symbol: "Mg",  name: "MongoDB",     number: 14, category: "Database",  color: "#47A248" },
  { symbol: "Sq",  name: "SQL",         number: 15, category: "Database",  color: "#CC2927" },
  { symbol: "Fl",  name: "Flutter",     number: 16, category: "Mobile",    color: "#02569B" },
  { symbol: "An",  name: "Android",     number: 17, category: "Mobile",    color: "#3DDC84" },
  { symbol: "Gi",  name: "Git",         number: 18, category: "Tools",     color: "#F05032" },
  { symbol: "Lx",  name: "Linux",       number: 19, category: "Tools",     color: "#FCC624" },
  { symbol: "Ap",  name: "Apache",      number: 20, category: "Tools",     color: "#D22128" },
  { symbol: "Dns", name: "DNS",         number: 21, category: "Tools",     color: "#0078D4" },
  { symbol: "Pr",  name: "Premiere",    number: 22, category: "Creative",  color: "#9999FF" },
  { symbol: "Ae",  name: "After Fx",    number: 23, category: "Creative",  color: "#9999FF" },
  { symbol: "Ps",  name: "Photoshop",   number: 24, category: "Creative",  color: "#31A8FF" },
  { symbol: "Ai",  name: "AI / ML",     number: 25, category: "AI/ML",     color: "#FF6B35" },
  { symbol: "Ml",  name: "Mach. Learn", number: 26, category: "AI/ML",     color: "#FF8C42" },
];

const CATEGORIES: Category[] = [
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "Mobile",
  "Tools",
  "Creative",
  "AI/ML",
];

// Periodic-table-style layout: each row is a list of element numbers (1-based).
// `null` values are gap spacers for authentic PT feel.
const PT_LAYOUT: (number | null)[][] = [
  [1,    2,    null, null, null, null, 7,    8,    9   ],
  [3,    4,    null, null, null, null, 10,   11,   null],
  [5,    6,    null, null, null, null, null, null, null],
  [null, null, 12,   13,   null, null, null, null, null],
  [null, null, 14,   15,   null, null, null, null, null],
  [null, null, null, null, 16,   17,   null, null, null],
  [null, null, 18,   19,   20,   21,   null, null, null],
  [null, null, 22,   23,   24,   null, null, null, null],
  [null, null, null, null, null, null, 25,   26,   null],
];

// ─── Category meta ────────────────────────────────────────────────────────────

const CATEGORY_TINT: Record<Category, string> = {
  Languages: "#EEF4FF",
  Frontend:  "#F0FAFB",
  Backend:   "#F0FFF4",
  Database:  "#F5F0FF",
  Mobile:    "#F0FFF8",
  Tools:     "#FFF5F0",
  Creative:  "#F5F0FF",
  "AI/ML":   "#FFF3EE",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Languages: "Core programming languages I use to build software systems.",
  Frontend:  "Libraries and frameworks powering the UI layer.",
  Backend:   "Server-side runtimes and frameworks for APIs.",
  Database:  "Relational and NoSQL data stores I work with.",
  Mobile:    "Cross-platform and native mobile development toolkits.",
  Tools:     "Dev tooling, infrastructure, and networking essentials.",
  Creative:  "Adobe suite tools for video, motion, and visual design.",
  "AI/ML":   "Machine learning and artificial intelligence technologies.",
};

const ELEMENT_DESCRIPTIONS: Record<string, string> = {
  "C":           "The foundational systems language — fast, explicit, and close to the metal.",
  "C++":         "High-performance systems language used in competitive programming and low-level engineering.",
  "Python":      "Versatile scripting language used in data science, automation, and web backends.",
  "JavaScript":  "The ubiquitous language of the web, running in every browser and on Node.",
  "TypeScript":  "Typed superset of JavaScript that scales large codebases with confidence.",
  "PHP":         "Server-side scripting language widely used for dynamic web applications.",
  "React.js":    "Declarative component model for building reactive, composable UIs.",
  "HTML5":       "Semantic markup language that forms the structure of every web page.",
  "CSS3":        "Stylesheet language for visual design, animations, and responsive layouts.",
  "Three.js":    "WebGL-powered 3D library for rendering immersive experiences in the browser.",
  "GSAP":        "Industry-leading JavaScript animation library for smooth, high-performance motion.",
  "Node.js":     "JavaScript runtime on the server, enabling fast I/O-driven applications.",
  "Express":     "Minimal, unopinionated Node.js web framework for REST APIs.",
  "MongoDB":     "Document-oriented NoSQL database for flexible schema designs.",
  "SQL":         "Declarative language for querying and managing relational databases.",
  "Flutter":     "Google's cross-platform UI toolkit for building natively compiled mobile apps.",
  "Android":     "Native Android development with Kotlin/Java for the Google ecosystem.",
  "Git":         "Distributed version control system for tracking and collaborating on code.",
  "Linux":       "Open-source OS and server environment I use for development and deployment.",
  "Apache":      "Widely deployed open-source HTTP server for hosting web applications.",
  "DNS":         "Domain Name System configuration and management for reliable networking.",
  "Premiere":    "Adobe Premiere Pro for professional video editing and post-production.",
  "After Fx":    "Adobe After Effects for motion graphics, VFX, and compositing.",
  "Photoshop":   "Adobe Photoshop for image editing, compositing, and digital art.",
  "AI / ML":     "Applying artificial intelligence concepts to build intelligent applications.",
  "Mach. Learn": "Training and deploying machine learning models for predictive tasks.",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

interface ElementCardProps {
  el: TechElement;
  dimmed: boolean;
  selected: boolean;
  onHover: (el: TechElement | null) => void;
  onClick: (el: TechElement) => void;
  index: number;
  /** Compact size for mobile/tablet simple grid */
  compact?: boolean;
}

function ElementCard({ el, dimmed, selected, onHover, onClick, index, compact = false }: ElementCardProps) {
  const bg = CATEGORY_TINT[el.category];
  const size = compact ? "w-[64px] h-[64px]" : "w-[78px] h-[78px]";
  const symbolSize = compact ? "text-[18px]" : "text-[22px]";
  const nameSize = compact ? "text-[7px]" : "text-[8px]";

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{
        opacity: dimmed ? 0.18 : 1,
        scale: 1,
        transition: { duration: 0.25, delay: index * 0.018 },
      }}
      whileHover={dimmed ? {} : { scale: 1.08, zIndex: 10 }}
      whileTap={dimmed ? {} : { scale: 0.97 }}
      onClick={() => onClick(el)}
      onMouseEnter={() => !dimmed && onHover(el)}
      onMouseLeave={() => onHover(null)}
      style={{ backgroundColor: bg }}
      className={[
        "relative flex flex-col items-start justify-between flex-shrink-0",
        size,
        "rounded-sm p-[6px] cursor-pointer",
        "text-left transition-shadow duration-200",
        selected
          ? "ring-2 ring-[#1C1C1C] shadow-[0_6px_20px_rgba(0,0,0,0.18)]"
          : "ring-1 ring-[#D0CFBF] hover:ring-2 hover:ring-[#1C1C1C] hover:shadow-[0_6px_20px_rgba(0,0,0,0.14)]",
      ].join(" ")}
    >
      {/* Atomic number */}
      <span className="text-[9px] font-mono text-[#555] leading-none">
        {el.number}
      </span>

      {/* Symbol */}
      <span
        className={`w-full text-center ${symbolSize} font-bold leading-none`}
        style={{ color: el.color === "#000000" ? "#1C1C1C" : el.color }}
      >
        {el.symbol}
      </span>

      {/* Name */}
      <span className={`w-full text-center ${nameSize} text-[#444] leading-tight truncate`}>
        {el.name}
      </span>

      {/* Category dot */}
      <span
        className="absolute top-[6px] right-[6px] w-[5px] h-[5px] rounded-full"
        style={{ backgroundColor: el.color === "#000000" ? "#555" : el.color }}
      />
    </motion.button>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────

interface DetailPanelProps {
  el: TechElement | null;
  /** When true, panel slides in from below (mobile/tablet) instead of from right */
  slideFromBottom?: boolean;
}

function DetailPanel({ el, slideFromBottom = false }: DetailPanelProps) {
  const enterAnim = slideFromBottom
    ? { opacity: 0, y: 24 }
    : { opacity: 0, x: 40 };
  const exitAnim = slideFromBottom
    ? { opacity: 0, y: 24 }
    : { opacity: 0, x: 40 };

  return (
    <AnimatePresence mode="wait">
      {el ? (
        <motion.div
          key={el.name}
          initial={enterAnim}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={exitAnim}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="flex flex-col gap-5 p-6 rounded-xl bg-white border border-[#E0DFD0] shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
          style={{ minHeight: 200 }}
        >
          {/* Big symbol circle */}
          <div className="flex items-center gap-4">
            <div
              className="w-[70px] h-[70px] rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
              style={{ backgroundColor: el.color === "#000000" ? "#1C1C1C" : el.color + "22", border: `2px solid ${el.color === "#000000" ? "#1C1C1C" : el.color}` }}
            >
              <span
                className="text-[22px] font-extrabold"
                style={{ color: el.color === "#000000" ? "#1C1C1C" : el.color }}
              >
                {el.symbol}
              </span>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-[#888] font-mono">
                {el.category}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-[#1C1C1C] leading-tight">
                {el.name}
              </h3>
              <p className="text-[12px] text-[#888] font-mono">
                No. {String(el.number).padStart(2, "0")}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#E8E7D8]" />

          {/* Description */}
          <p className="text-sm text-[#444] leading-relaxed">
            {ELEMENT_DESCRIPTIONS[el.name] ?? "A powerful tool in my developer toolkit."}
          </p>

          {/* Family label */}
          <div
            className="mt-auto text-[11px] font-mono px-3 py-1.5 rounded-full self-start"
            style={{
              backgroundColor: CATEGORY_TINT[el.category],
              color: "#444",
              border: "1px solid #D8D7C8",
            }}
          >
            Family: {el.category}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="placeholder"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-dashed border-[#C8C7B8] text-[#AAA]"
          style={{ minHeight: 200 }}
        >
          <span className="text-5xl">⚗️</span>
          <p className="text-sm font-mono text-center">
            Hover or click an element
            <br />
            to inspect it
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState<Category | null>(null);
  const [hoveredEl, setHoveredEl] = useState<TechElement | null>(null);
  const [selectedEl, setSelectedEl] = useState<TechElement | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const panelEl = hoveredEl ?? selectedEl;

  const handleElementClick = (el: TechElement) => {
    setSelectedEl((prev) => (prev?.name === el.name ? null : el));
  };

  const handleFilterClick = (cat: Category) => {
    setActiveFilter((prev) => (prev === cat ? null : cat));
    setSelectedEl(null);
    setHoveredEl(null);
  };

  const isDimmed = (el: TechElement) =>
    activeFilter !== null && el.category !== activeFilter;

  // Build element lookup by number
  const elByNumber = new Map<number, TechElement>(
    TECH_ELEMENTS.map((e) => [e.number, e])
  );

  // Filtered list for the simple grid (mobile / tablet)
  const filteredElements = activeFilter
    ? TECH_ELEMENTS.filter((e) => e.category === activeFilter)
    : TECH_ELEMENTS;

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ backgroundColor: "#F5F4E8" }}
      className="w-full overflow-hidden py-16 md:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-12"
        >
          <p className="text-xs font-mono tracking-[0.2em] text-[#888] uppercase mb-3">
            02 / SKILLS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1C1C] leading-tight mb-4">
            The periodic table
            <br />
            of my stack
          </h2>
          <p className="text-xs sm:text-sm text-[#666] font-mono">
            26+ elements in 08 families.&nbsp; Hover or click to highlight.&nbsp; Click a family to filter.
          </p>
        </motion.div>

        {/* ── Filter Buttons ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-2 mb-8 md:mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className="relative px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-[#C8C7B8] overflow-hidden transition-colors duration-200"
              style={{
                color: activeFilter === cat ? "#F5F4E8" : "#333",
              }}
            >
              {/* Animated fill */}
              {activeFilter === cat && (
                <motion.span
                  layoutId="filter-bg"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: "#1C1C1C" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}

          {activeFilter && (
            <button
              onClick={() => setActiveFilter(null)}
              className="px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono text-[#888] border border-dashed border-[#C8C7B8] hover:text-[#333] transition-colors"
            >
              ✕ clear
            </button>
          )}
        </motion.div>

        {/* ── Main Layout: Table + Panel ──────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          {/* ── Periodic Table Grid ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 w-full"
          >
            {/* Legend */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
              {CATEGORIES.map((cat) => (
                <div key={cat} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[#666] font-mono">
                  <span
                    className="w-3 h-3 rounded-sm inline-block flex-shrink-0"
                    style={{ backgroundColor: CATEGORY_TINT[cat], border: "1px solid #C8C7B8" }}
                  />
                  {cat}
                </div>
              ))}
            </div>

            {/* ── Mobile / Tablet: simple responsive grid (hidden on lg+) ── */}
            <div className="lg:hidden">
              <motion.div
                layout
                className={[
                  "grid gap-2",
                  // 4 cols on mobile, 5 on sm/md tablet
                  "grid-cols-4 sm:grid-cols-5",
                ].join(" ")}
              >
                <AnimatePresence>
                  {filteredElements.map((el, idx) => (
                    <ElementCard
                      key={el.number}
                      el={el}
                      dimmed={false}
                      selected={selectedEl?.name === el.name}
                      onHover={setHoveredEl}
                      onClick={handleElementClick}
                      index={idx}
                      compact
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* ── Desktop: periodic-table layout (hidden below lg) ── */}
            <div className="hidden lg:block overflow-x-auto pb-2">
              <div className="flex flex-col gap-1.5 w-fit">
                {PT_LAYOUT.map((row, rowIdx) => (
                  <div key={rowIdx} className="flex gap-1.5">
                    {row.map((num, colIdx) => {
                      if (num === null) {
                        return (
                          <div
                            key={`gap-${rowIdx}-${colIdx}`}
                            className="w-[78px] h-[78px] flex-shrink-0"
                          />
                        );
                      }
                      const el = elByNumber.get(num);
                      if (!el) return null;
                      return (
                        <ElementCard
                          key={el.number}
                          el={el}
                          dimmed={isDimmed(el)}
                          selected={selectedEl?.name === el.name}
                          onHover={setHoveredEl}
                          onClick={handleElementClick}
                          index={rowIdx * 10 + colIdx}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Category description bar */}
            <AnimatePresence mode="wait">
              {activeFilter && (
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-5 sm:mt-6 overflow-hidden"
                >
                  <div
                    className="rounded-lg px-4 sm:px-5 py-3 text-xs sm:text-sm text-[#444] font-mono border border-[#D8D7C8]"
                    style={{ backgroundColor: CATEGORY_TINT[activeFilter] }}
                  >
                    <span className="font-bold text-[#1C1C1C]">{activeFilter}: </span>
                    {CATEGORY_DESCRIPTIONS[activeFilter]}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Detail Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 0, y: 24 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[260px] lg:flex-shrink-0"
          >
            {/* On mobile/tablet the panel appears below (sticky is lg-only) */}
            <div className="lg:sticky lg:top-24">
              <DetailPanel el={panelEl} slideFromBottom />
            </div>
          </motion.div>
        </div>

        {/* ── Stats row ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 md:mt-14 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4"
        >
          {CATEGORIES.map((cat) => {
            const count = TECH_ELEMENTS.filter((e) => e.category === cat).length;
            return (
              <div
                key={cat}
                className="flex flex-col items-center gap-1 py-3 sm:py-4 rounded-lg border border-[#D8D7C8] cursor-pointer transition-transform duration-150 hover:scale-[1.03] active:scale-95"
                style={{ backgroundColor: CATEGORY_TINT[cat] }}
                onClick={() => handleFilterClick(cat)}
              >
                <span className="text-xl sm:text-2xl font-bold text-[#1C1C1C]">{count}</span>
                <span className="text-[9px] sm:text-[10px] font-mono text-[#666] uppercase tracking-wider text-center px-1">
                  {cat}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
