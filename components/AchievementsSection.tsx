"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Briefcase,
  BookOpen,
  Trophy,
  ExternalLink,
  Star,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Card {
  platform: string;
  stat: string;
  label: string;
  color: string;
  bg: string;
  icon: React.ElementType;
  large?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const cards: Card[] = [
  {
    platform: "LeetCode",
    stat: "100+",
    label: "Problems Solved",
    color: "#FFA116",
    bg: "#FFF7ED",
    icon: Code2,
    large: true,
  },
  {
    platform: "Android Intern",
    stat: "2023",
    label: "Shrishti Innovative",
    color: "#3DDC84",
    bg: "#F0FDF4",
    icon: Briefcase,
  },
  {
    platform: "NIT Calicut",
    stat: "Workshop",
    label: "Data Mining 2024",
    color: "#E60023",
    bg: "#FFF0F0",
    icon: BookOpen,
  },
  {
    platform: "B.Tech Project",
    stat: "AI/ML",
    label: "RIAAQE - 2025",
    color: "#7C3AED",
    bg: "#F5F3FF",
    icon: Trophy,
  },
  {
    platform: "GitHub",
    stat: "10+",
    label: "Repositories",
    color: "#181717",
    bg: "#F8F8F8",
    icon: ExternalLink,
  },
  {
    platform: "KTU University",
    stat: "6.91",
    label: "CGPA - B.Tech",
    color: "#4285F4",
    bg: "#EFF6FF",
    icon: Star,
  },
];

const MARQUEE_TEXT =
  "React.js • Node.js • Python • Flutter • TypeScript • MongoDB • Three.js • GSAP • AI/ML • Android •";

// ─── Animated Counter Hook ────────────────────────────────────────────────────

function useAnimatedCounter(
  target: number,
  isDecimal: boolean,
  active: boolean,
  duration = 1800
): string {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let startTime: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setValue(current);

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, isDecimal]);

  if (isDecimal) return value.toFixed(2);
  return Math.floor(value).toString();
}

// ─── Stat Display ─────────────────────────────────────────────────────────────

type StatType = "counter-int" | "counter-decimal" | "text";

function getStatType(stat: string): StatType {
  if (stat === "6.91") return "counter-decimal";
  if (stat === "100+" || stat === "10+") return "counter-int";
  return "text";
}

function AnimatedStat({
  stat,
  color,
  active,
}: {
  stat: string;
  color: string;
  active: boolean;
}) {
  const type = getStatType(stat);

  const numericTarget =
    type === "counter-decimal"
      ? 6.91
      : type === "counter-int"
      ? parseInt(stat, 10)
      : 0;

  const counted = useAnimatedCounter(
    numericTarget,
    type === "counter-decimal",
    active && type !== "text"
  );

  if (type === "text") {
    // Pick a font size that won't overflow — short strings get big, long ones get smaller
    const fontSize =
      stat.length <= 4
        ? "text-3xl md:text-4xl lg:text-5xl"
        : stat.length <= 6
        ? "text-2xl md:text-3xl lg:text-4xl"
        : "text-xl md:text-2xl lg:text-3xl";

    return (
      <motion.span
        initial={{ opacity: 0, y: 6 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`${fontSize} font-black tracking-tight leading-none break-words w-full block`}
        style={{ color }}
      >
        {stat}
      </motion.span>
    );
  }

  const suffix = stat.endsWith("+") ? "+" : "";

  return (
    <span
      className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-none"
      style={{ color }}
    >
      {counted}
      {suffix}
    </span>
  );
}

// ─── Bento Card ───────────────────────────────────────────────────────────────

function BentoCard({
  card,
  index,
  sectionActive,
}: {
  card: Card;
  index: number;
  sectionActive: boolean;
}) {
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={
        sectionActive
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.95 }
      }
      transition={{
        duration: 0.55,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`relative flex flex-col justify-between rounded-2xl p-4 md:p-6 overflow-hidden shadow-sm border border-black/5 cursor-default ${
        card.large
          ? "col-span-1 sm:col-span-2 md:col-span-2 md:row-span-2"
          : "col-span-1"
      }`}
      style={{ backgroundColor: card.bg }}
    >
      {/* Background accent circle */}
      <div
        className="absolute -right-6 -top-6 w-28 h-28 rounded-full opacity-10 pointer-events-none"
        style={{ backgroundColor: card.color }}
      />

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 z-10 relative"
        style={{ backgroundColor: card.color + "22" }}
      >
        <Icon size={20} strokeWidth={2} style={{ color: card.color }} />
      </div>

      {/* Stat */}
      <div className="z-10 relative">
        <AnimatedStat
          stat={card.stat}
          color={card.color}
          active={sectionActive}
        />

        <p className="mt-1 text-sm font-semibold text-gray-500 leading-snug">
          {card.label}
        </p>

        <p
          className="mt-3 text-xs font-bold uppercase tracking-widest"
          style={{ color: card.color }}
        >
          {card.platform}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────

function Marquee() {
  // Duplicate text for seamless loop
  const repeated = `${MARQUEE_TEXT}  ${MARQUEE_TEXT}  `;

  return (
    <div className="relative mt-16 overflow-hidden py-4 border-y border-black/8">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 22,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <span className="text-sm font-semibold text-gray-400 tracking-wide pr-8">
          {repeated}
        </span>
        <span className="text-sm font-semibold text-gray-400 tracking-wide pr-8">
          {repeated}
        </span>
      </motion.div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="w-full py-16 md:py-24 px-4 sm:px-8 lg:px-16"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4"
        >
          06 / ACHIEVEMENTS
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 mb-14"
        >
          Built with{" "}
          <span className="italic font-black text-gray-300">passion.</span>
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[160px] gap-4">
          {cards.map((card, i) => (
            <BentoCard
              key={card.platform}
              card={card}
              index={i}
              sectionActive={isInView}
            />
          ))}
        </div>

        {/* Marquee */}
        <Marquee />
      </div>
    </section>
  );
}
