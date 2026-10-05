"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
import { FileText, ExternalLink, Link2 } from "lucide-react";

// ─── Skill Tags ─────────────────────────────────────────────────────────────
const SKILLS = ["Full-Stack", "Mobile Dev", "AI/ML", "Open Source"];

// ─── Action Buttons ──────────────────────────────────────────────────────────
const ACTIONS = [
  { label: "Resume",   icon: FileText,     href: "https://www.adithyanspillai.in/resume.pdf" },
  { label: "GitHub",   icon: ExternalLink, href: "https://github.com/AdithyanSPillaiOfficial" },
  { label: "LinkedIn", icon: Link2,        href: "https://linkedin.com/in/adithyan-s-pillai" },
];

// ─── Barcode strip ───────────────────────────────────────────────────────────
function Barcode() {
  const bars = [3,1,2,1,3,2,1,2,1,3,1,2,3,1,2,1,3,2,1,2,3,1,2,1,3,2,1,1,3,2,1,2,3,1,2];
  return (
    <div className="flex flex-col items-center gap-0.5 w-full">
      <div className="flex items-end gap-[1.5px] h-8">
        {bars.map((h, i) => (
          <div
            key={i}
            className="bg-[#1a1a2e] rounded-[1px]"
            style={{ width: i % 4 === 0 ? "2.5px" : "1.5px", height: `${h * 8}px`, opacity: 0.85 }}
          />
        ))}
      </div>
      <p className="text-[8px] font-mono tracking-[0.18em] text-[#555] mt-0.5">
        AS-2024-SWE-00192
      </p>
    </div>
  );
}

// ─── QR code placeholder ─────────────────────────────────────────────────────
function QRCode() {
  return (
    <div className="w-14 h-14 relative flex-shrink-0">
      <div className="w-full h-full border-2 border-[#1a1a2e] rounded-sm p-1 grid grid-cols-5 gap-[1px]">
        {Array.from({ length: 25 }).map((_, i) => {
          const pattern = [1,1,1,1,1, 1,0,1,0,1, 1,1,0,1,1, 1,0,1,0,1, 1,1,1,1,1];
          const isRand = [2,7,8,11,13,16,17,22].includes(i);
          return (
            <div
              key={i}
              className="rounded-[1px]"
              style={{ backgroundColor: (pattern[i] || isRand) ? "#1a1a2e" : "transparent" }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── Front Face ──────────────────────────────────────────────────────────────
function CardFront() {
  return (
    <div
      className="absolute inset-0 rounded-2xl overflow-hidden"
      style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
    >
      {/* Header band */}
      <div
        className="h-14 w-full flex items-center justify-between px-5 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)" }}
      >
        {/* Org logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white text-[8px] font-black">AS</span>
          </div>
          <div>
            <p className="text-white/90 text-[7px] font-mono tracking-[0.18em] uppercase leading-tight">CCET</p>
            <p className="text-white/50 text-[6px] font-mono leading-tight">Alappuzha, Kerala</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white/70 text-[7px] font-mono tracking-[0.15em] uppercase">DEVELOPER</p>
          <p className="text-white/40 text-[6px] font-mono">ID CARD</p>
        </div>
        {/* Decorative arc */}
        <div
          className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full border border-white/10"
        />
        <div
          className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full border border-white/05"
        />
      </div>

      {/* Body */}
      <div className="bg-white flex-1 px-5 pt-4 pb-4 flex flex-col gap-3">
        {/* Photo + info */}
        <div className="flex items-start gap-4">
          {/* Photo */}
          <div
            className="relative flex-shrink-0 rounded-xl overflow-hidden border-2 border-[#e8e6de] shadow-sm"
            style={{ width: 72, height: 88 }}
          >
            <Image
              src="/adithyan.jpg"
              alt="Adithyan S Pillai"
              fill
              style={{ objectFit: "cover", objectPosition: "top center" }}
              sizes="72px"
            />
          </div>
          {/* Info */}
          <div className="flex flex-col gap-1 mt-0.5 flex-1">
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#888]">Full Name</p>
            <p className="text-[13px] font-bold text-[#1a1a2e] leading-tight uppercase tracking-wide">
              Adithyan<br />S Pillai
            </p>
            <div className="mt-1 flex flex-col gap-0.5">
              <p className="text-[9px] font-mono uppercase tracking-[0.12em] text-[#aaa]">Designation</p>
              <p className="text-[11px] font-semibold text-[#333]">Software Engineer</p>
            </div>
          </div>
        </div>

        {/* Field rows */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-[#f0ede4] pt-2.5">
          {[
            { label: "Department", value: "CS & Engineering" },
            { label: "Batch",      value: "2021 – 2025" },
            { label: "University", value: "KTU" },
            { label: "Valid Till", value: "Dec 2025" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[8px] font-mono uppercase tracking-[0.12em] text-[#bbb]">{label}</p>
              <p className="text-[10px] font-semibold text-[#333] leading-tight">{value}</p>
            </div>
          ))}
        </div>

        {/* Barcode */}
        <div className="border-t border-dashed border-[#e8e5dc] pt-2.5">
          <Barcode />
        </div>
      </div>

      {/* Footer strip */}
      <div
        className="h-5 w-full"
        style={{ background: "linear-gradient(90deg, #1a1a2e 0%, #0f3460 50%, #1a1a2e 100%)" }}
      />
    </div>
  );
}

// ─── Back Face ───────────────────────────────────────────────────────────────
function CardBack() {
  return (
    <div
      className="absolute inset-0 rounded-2xl overflow-hidden"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
      }}
    >
      {/* Magnetic stripe */}
      <div className="w-full h-10 bg-black/60 mt-6 flex items-center">
        <div className="w-full h-6 bg-[#1a1020]/80" />
      </div>

      {/* Signature strip */}
      <div className="mx-5 mt-4 bg-white/90 rounded px-3 py-2 flex items-center justify-between">
        <div>
          <p className="text-[7px] font-mono uppercase tracking-[0.15em] text-[#888] mb-0.5">Signature</p>
          <p
            className="text-[15px] text-[#1a1a2e]"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            Adithyan S Pillai
          </p>
        </div>
        <QRCode />
      </div>

      {/* Back info */}
      <div className="px-5 mt-4 space-y-2">
        {[
          { label: "Email",   value: "adithyanspillaiofficial@gmail.com" },
          { label: "GitHub",  value: "AdithyanSPillaiOfficial" },
          { label: "Website", value: "adithyanspillai.in" },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-baseline gap-2">
            <span className="text-[8px] font-mono uppercase tracking-[0.12em] text-white/40 w-12 flex-shrink-0">{label}</span>
            <span className="text-[9px] font-mono text-white/80 truncate">{value}</span>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div className="mx-5 mt-4 border-t border-white/10 pt-3">
        <p className="text-[9px] font-mono text-white/40 italic text-center">
          "From code to deployment."
        </p>
      </div>

      {/* Decorative circles */}
      <div className="absolute bottom-8 right-4 w-24 h-24 rounded-full border border-white/05" />
      <div className="absolute bottom-4 right-0  w-16 h-16 rounded-full border border-white/08" />

      {/* ID Number */}
      <div className="absolute bottom-3 left-5">
        <p className="text-[8px] font-mono text-white/25 tracking-widest">AS-2024-SWE-00192</p>
      </div>
    </div>
  );
}

// ─── Realistic Lanyard ───────────────────────────────────────────────────────
function Lanyard({ shakeX, shakeRotate }: { shakeX: any; shakeRotate: any }) {
  return (
    <motion.div
      style={{ x: shakeX, rotate: shakeRotate }}
      className="flex flex-col items-center"
    >
      {/* Neck strap segment */}
      <div className="relative w-full flex justify-center">
        {/* Left strap */}
        <div
          className="absolute"
          style={{
            width: 16,
            height: 80,
            background: "linear-gradient(to bottom, #e23030, #c41e1e)",
            borderRadius: "4px 0 0 0",
            top: 0,
            left: "calc(50% - 20px)",
            transform: "rotate(-8deg)",
            transformOrigin: "top center",
          }}
        >
          {/* Lanyard pattern */}
          {[12,28,44,60].map(y => (
            <div key={y} className="absolute w-full h-[2px] bg-white/20" style={{ top: y }} />
          ))}
        </div>
        {/* Right strap */}
        <div
          className="absolute"
          style={{
            width: 16,
            height: 80,
            background: "linear-gradient(to bottom, #e23030, #c41e1e)",
            borderRadius: "0 4px 0 0",
            top: 0,
            left: "calc(50% + 4px)",
            transform: "rotate(8deg)",
            transformOrigin: "top center",
          }}
        >
          {[12,28,44,60].map(y => (
            <div key={y} className="absolute w-full h-[2px] bg-white/20" style={{ top: y }} />
          ))}
        </div>
        {/* Spacer */}
        <div style={{ height: 70 }} />
      </div>

      {/* J-hook connector */}
      <div className="flex flex-col items-center -mt-1">
        <div
          className="w-5 h-6 rounded-t-full border-2 border-[#aaa] bg-[#ddd]"
          style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)" }}
        />
        <div className="w-2 h-3 bg-[#bbb] rounded-b-sm -mt-1" />
      </div>
    </motion.div>
  );
}

// ─── ID Card component ───────────────────────────────────────────────────────
function IDCard() {
  const [flipped, setFlipped] = useState(false);

  // Mouse-driven shake springs
  const shakeX      = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const shakeRotate = useSpring(useMotionValue(0), { stiffness: 180, damping: 14 });

  // Card tilt (subtle on front, same on back)
  const tiltX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx   = rect.left + rect.width / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);

    // Shake the whole assembly (lanyard + card) based on horizontal mouse
    shakeX.set(dx * 10);
    shakeRotate.set(dx * 4);

    // Tilt the card itself based on mouse position
    tiltX.set(-dy * 8);
    tiltY.set(dx  * 8);
  };

  const handleMouseLeave = () => {
    animate(shakeX,      0, { type: "spring", stiffness: 200, damping: 18 });
    animate(shakeRotate, 0, { type: "spring", stiffness: 200, damping: 18 });
    animate(tiltX,       0, { type: "spring", stiffness: 200, damping: 20 });
    animate(tiltY,       0, { type: "spring", stiffness: 200, damping: 20 });
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Lanyard */}
      <Lanyard shakeX={shakeX} shakeRotate={shakeRotate} />

      {/* Card wrapper — receives mouse events & drives shake */}
      <motion.div
        ref={cardRef}
        className="relative cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setFlipped(f => !f)}
        style={{ x: shakeX, rotate: shakeRotate }}
        whileTap={{ scale: 0.97 }}
        title="Click to flip"
      >
        {/* 3-D flip + tilt combined */}
        <motion.div
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
            transformStyle: "preserve-3d",
            perspective: 900,
          }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* Card size container */}
          <div
            className="relative"
            style={{ width: 260, height: 390, transformStyle: "preserve-3d" }}
          >
            <CardFront />
            <CardBack  />
          </div>
        </motion.div>

        {/* Flip hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute -bottom-7 left-0 right-0 text-center
            text-[10px] font-mono tracking-widest uppercase text-[#AAA]"
        >
          Click to flip
        </motion.p>
      </motion.div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-100px" });

  const leftVariants = {
    hidden:  { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };
  const rightVariants = {
    hidden:  { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.15 } },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="pt-16 lg:pt-[100px] pb-[120px]"
      style={{ backgroundColor: "#F5F4E8" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-7"
          >
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-stone-400">
              01 / ABOUT
            </span>

            <h2
              className="text-4xl sm:text-5xl lg:text-6xl leading-tight text-stone-900"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Hi, I'm Adithyan.
            </h2>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-md">
              Final-year B.Tech in Computer Science and Engineering student at Carmel College of
              Engineering and Technology (CCET), Alappuzha, affiliated with APJ Abdul Kalam
              Technological University (KTU). Passionate about software development with skills in
              full-stack web development, mobile applications, and AI/ML technologies.
            </p>

            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ backgroundColor: "#1c1917", color: "#fafaf9", borderColor: "#1c1917" }}
                  transition={{ duration: 0.18 }}
                  className="text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-stone-400 text-stone-600 cursor-default"
                  style={{ willChange: "background-color, color, border-color" }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              {ACTIONS.map(({ label, icon: Icon, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, backgroundColor: "#1c1917", color: "#fafaf9" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-800 text-stone-800 text-sm font-mono uppercase tracking-wider"
                  style={{ willChange: "background-color, color" }}
                >
                  <Icon size={14} strokeWidth={1.8} />
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN — ID Card ── */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex justify-center lg:justify-end pt-10 overflow-visible"
          >
            <div className="mx-auto lg:mx-0">
              <IDCard />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
