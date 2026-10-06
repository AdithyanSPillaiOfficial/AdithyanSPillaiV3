"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";

/* ─── Scroll indicator (desktop only) ───────────────────────────────────── */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.8 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="w-5 h-9 rounded-full border border-[#BFBDAF] flex items-start justify-center pt-1.5">
        <motion.div
          className="w-1 h-2 rounded-full bg-[#111]"
          animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <span
        className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#AAA]"
        style={{ writingMode: "vertical-rl" }}
      >
        scroll
      </span>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY   = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const waterY   = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);
  const fadeOut  = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  /* magnetic tilt on portrait (desktop) */
  const rotateX  = useMotionValue(0);
  const rotateY  = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 60, damping: 16 });
  const springRY = useSpring(rotateY, { stiffness: 60, damping: 16 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el   = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width / 2;
    const cy   = rect.top  + rect.height / 2;
    rotateX.set(((e.clientY - cy) / rect.height) * -8);
    rotateY.set(((e.clientX - cx) / rect.width)  *  8);
  };

  const handleMouseLeave = () => {
    animate(rotateX, 0, { duration: 0.6, ease: "easeOut" });
    animate(rotateY, 0, { duration: 0.6, ease: "easeOut" });
  };

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: "#F5F4E8" }}
    >
      {/* ── Dot grid ─────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(17,17,17,0.09) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* ── Watermark ────────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden
        style={{ y: waterY }}
        className="pointer-events-none select-none absolute inset-0 z-0
          flex items-center justify-center overflow-hidden"
      >
        <motion.div
          className="relative"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.15 }}
        >
          <motion.span
            className="text-transparent whitespace-nowrap"
            style={{
              fontSize: "clamp(60px, 20vw, 230px)",
              fontWeight: 800,
              fontFamily: "Inter, system-ui, sans-serif",
              letterSpacing: "-0.02em",
              WebkitTextStroke: "1.5px rgba(17,17,17,0.11)",
              lineHeight: 1,
              display: "block",
            }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: [0.45, 0, 0.55, 1], repeatType: "mirror" }}
          >
            ADITHYAN
          </motion.span>
          <motion.span
            className="text-transparent whitespace-nowrap absolute inset-0 flex items-center"
            style={{
              fontSize: "clamp(60px, 20vw, 230px)",
              fontWeight: 700,
              fontFamily: "'Playfair Display', Georgia, serif",
              letterSpacing: "0.04em",
              WebkitTextStroke: "1.5px rgba(17,17,17,0.11)",
              lineHeight: 1,
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: [0.45, 0, 0.55, 1], repeatType: "mirror" }}
          >
            ADITHYAN
          </motion.span>
        </motion.div>
      </motion.div>

      {/* ════════════════════════════════════════════════════════════════════
          MOBILE HERO  (hidden on lg+)
          Layout: full-width photo top, text + quick-stats below
      ════════════════════════════════════════════════════════════════════ */}
      <div className="block lg:hidden relative z-10 min-h-screen flex flex-col">

        {/* ── Photo panel — top 58% ── */}
        <motion.div
          className="relative w-full flex-shrink-0"
          style={{ height: "58svh" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease }}
        >
          <Image
            src="/adithyan.jpg"
            alt="Adithyan S Pillai"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "top center" }}
            sizes="100vw"
          />

          {/* Bottom gradient → blends into cream */}
          <div
            className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
            style={{
              background: "linear-gradient(to top, #F5F4E8 0%, rgba(245,244,232,0.7) 50%, transparent 100%)",
            }}
          />

          {/* Top gradient — softens into nav */}
          <div
            className="absolute inset-x-0 top-0 h-24 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(245,244,232,0.6) 0%, transparent 100%)",
            }}
          />

          {/* Location pill — pinned bottom-right of photo */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-10 right-4 z-20
              flex items-center gap-1.5 px-3 py-1.5 rounded-full
              bg-white/90 backdrop-blur-sm shadow-md border border-[#E2E0D4]
              text-[10px] font-mono text-[#555] whitespace-nowrap"
          >
            📍 Alappuzha, Kerala
          </motion.div>
        </motion.div>

        {/* ── Text panel — bottom section ── */}
        <div className="flex-1 flex flex-col justify-between px-6 pt-2 pb-8">

          {/* Name + title */}
          <div className="flex flex-col gap-3">
            {/* eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease }}
              className="flex items-center gap-2"
            >
              <span className="w-4 h-px bg-[#111]" />
              <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#888]">
                Portfolio · {new Date().getFullYear()}
              </span>
            </motion.div>

            {/* heading */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6, ease }}
            >
              <p className="font-mono text-xs tracking-[0.18em] uppercase text-[#666] mb-1">
                Adithyan S Pillai
              </p>
              <h1
                className="font-serif font-bold text-[#111] leading-[0.92]"
                style={{ fontSize: "clamp(42px, 11vw, 64px)", letterSpacing: "-0.025em" }}
              >
                Software<br />
                <em className="not-italic" style={{ color: "#555" }}>Engineer.</em>
              </h1>
            </motion.div>

            {/* bio — single line on mobile */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease }}
              className="text-[13px] text-[#666] leading-relaxed"
            >
              Full-stack • Backend • AI/ML — building what matters.
            </motion.p>
          </div>

          {/* Bottom: stats row + CTAs */}
          <div className="flex flex-col gap-5 mt-5">

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5, ease }}
              className="flex items-center gap-0 divide-x divide-[#D8D6C8]"
            >
              {[
                { num: "4+", label: "Projects" },
                { num: "3+", label: "Stacks" },
                { num: "1",  label: "Internship" },
              ].map(({ num, label }) => (
                <div key={label} className="flex flex-col items-center px-5 first:pl-0 last:pr-0">
                  <span className="font-serif font-bold text-[#111] text-2xl leading-none">{num}</span>
                  <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#999] mt-0.5">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs — full width on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5, ease }}
              className="flex gap-3"
            >
              <motion.a
                href="#work"
                whileTap={{ scale: 0.96 }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full
                  bg-[#111] text-[#F5F4E8] text-[13px] font-medium tracking-wide"
              >
                View Projects →
              </motion.a>
              <motion.a
                href="#contact"
                whileTap={{ scale: 0.96 }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full
                  border border-[#CCCAB8] text-[#111] text-[13px] font-medium"
              >
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="flex items-center justify-center gap-2"
            >
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#BBB] text-base leading-none"
              >
                ↓
              </motion.span>
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#CCC]">scroll</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          DESKTOP HERO  (hidden on mobile, shown on lg+)
      ════════════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ y: contentY, opacity: fadeOut }}
        className="hidden lg:grid relative z-10 w-full h-screen
          grid-cols-[1fr_auto_1fr] gap-8 items-end px-20"
      >
        {/* LEFT */}
        <div className="flex flex-col gap-4 items-start text-left self-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease }}
            className="flex items-center gap-2"
          >
            <span className="w-5 h-px bg-[#111]" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#888]">
              Portfolio · {new Date().getFullYear()}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.65, ease }}
            className="font-mono text-xs tracking-[0.2em] uppercase text-[#666] -mb-1"
          >
            Adithyan S Pillai
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease }}
            className="font-serif font-bold leading-[0.93] text-[#111]"
            style={{ fontSize: "clamp(60px, 7vw, 90px)", letterSpacing: "-0.025em" }}
          >
            Software<br />
            <em className="not-italic" style={{ color: "#444" }}>Engineer.</em>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
            className="h-px w-20 bg-[#CCC] origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.65, ease }}
            className="text-[13px] text-[#666] leading-relaxed max-w-[260px]"
          >
            B.Tech CSE graduate (CGPA: 6.91) from CCET, Alappuzha.
            Building scalable web apps, backend architectures&nbsp;&amp; AI&nbsp;tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6, ease }}
            className="flex items-center gap-3 mt-1"
          >
            <motion.a
              href="#work"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                bg-[#111] text-[#F5F4E8] text-[13px] font-medium tracking-wide
                hover:bg-[#2a2a2a] transition-colors duration-250"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              View Projects <span>→</span>
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                border border-[#CCCAB8] text-[#111] text-[13px] font-medium
                hover:border-[#111] hover:bg-[#111] hover:text-[#F5F4E8]
                transition-all duration-250"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>

        {/* CENTER — portrait */}
        <motion.div
          className="relative self-center flex-shrink-0"
          style={{ y: imageY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            style={{ rotateX: springRX, rotateY: springRY, transformPerspective: 800 }}
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div
              className="relative overflow-hidden shadow-2xl"
              style={{
                width: "clamp(220px, 22vw, 340px)",
                height: "clamp(310px, 38vw, 500px)",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.6)",
                background: "#D8D5C9",
              }}
            >
              <Image
                src="/adithyan.jpg"
                alt="Adithyan S Pillai — Software Engineer"
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "top center" }}
                sizes="(max-width: 1280px) 22vw, 340px"
              />
              <div
                className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 100%)" }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(15,17,21,0.72) 0%, transparent 100%)" }}
              >
                <p className="text-white font-semibold text-sm tracking-wide">Adithyan S Pillai</p>
                <p className="text-white/60 text-[11px] font-mono tracking-widest uppercase">Software Engineer</p>
              </div>
            </div>

            <motion.div
              className="absolute -bottom-3 -right-3 -left-3 -top-3 rounded-[22px]
                border border-[#D8D6C8] pointer-events-none"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20
              flex items-center gap-1.5 px-3.5 py-2 rounded-full
              bg-white shadow-lg border border-[#E2E0D4]
              text-[11px] font-mono text-[#555] whitespace-nowrap"
          >
            <span>📍</span> Alappuzha, Kerala
          </motion.div>
        </motion.div>

        {/* RIGHT — stats + scroll */}
        <div className="flex flex-col items-end justify-between self-stretch">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease }}
            className="flex flex-col gap-6 mt-28"
          >
            {[
              { num: "4+", label: "Projects Built" },
              { num: "3+", label: "Tech Stacks" },
              { num: "1",  label: "Internship" },
            ].map(({ num, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + i * 0.1, duration: 0.5, ease }}
                className="text-right"
              >
                <div
                  className="font-serif font-bold text-[#111] leading-none"
                  style={{ fontSize: "clamp(26px, 2.8vw, 38px)" }}
                >
                  {num}
                </div>
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#999] mt-0.5">
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>
          <ScrollIndicator />
        </div>
      </motion.div>

      {/* Bottom metadata strip — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{ opacity: fadeOut }}
        className="hidden lg:flex absolute bottom-5 left-0 right-0 z-10
          items-center justify-between px-20"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#AAA]">
          B.Tech CSE Graduate · CCET · KTU
        </span>
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {["React", "Node.js", "Flutter", "Python", "AI/ML"].map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 + i * 0.06 }}
              className="px-2.5 py-1 rounded-md bg-white/60 border border-[#E2E0D4]
                font-mono text-[10px] text-[#555] backdrop-blur-sm"
            >
              {s}
            </motion.span>
          ))}
        </div>
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#AAA]">
          adithyanspillai.in
        </span>
      </motion.div>
    </section>
  );
}
