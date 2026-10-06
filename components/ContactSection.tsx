"use client";

import React, { useRef } from "react";
import { motion, useInView, useAnimationFrame } from "framer-motion";
import { Mail, ExternalLink, Link2, Phone, ArrowUpRight } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────── */
interface ContactLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

/* ─── Data ───────────────────────────────────────────────────────────── */
const CONTACT_LINKS: ContactLink[] = [
  {
    label: "adithyanspillaiofficial@gmail.com",
    href: "mailto:adithyanspillaiofficial@gmail.com",
    icon: <Mail size={20} strokeWidth={1.5} />,
  },
  {
    label: "github.com/AdithyanSPillaiOfficial",
    href: "https://github.com/AdithyanSPillaiOfficial",
    icon: <ExternalLink size={20} strokeWidth={1.5} />,
  },
  {
    label: "linkedin.com/in/adithyan-s-pillai",
    href: "https://linkedin.com/in/adithyan-s-pillai",
    icon: <Link2 size={20} strokeWidth={1.5} />,
  },
  {
    label: "+91 96059 87219",
    href: "tel:+919605987219",
    icon: <Phone size={20} strokeWidth={1.5} />,
  },
];

/* ─── Animation Variants ─────────────────────────────────────────────── */
const headingVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const subVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ─── Spinning Dashed Ring ───────────────────────────────────────────── */
function SpinningRing() {
  const ref = useRef<SVGSVGElement>(null);

  useAnimationFrame((t) => {
    if (ref.current) {
      const angle = (t / 8000) * 360; // full rotation every 8 s
      ref.current.style.transform = `rotate(${angle}deg)`;
    }
  });

  return (
    <svg
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="100"
        cy="100"
        r="96"
        stroke="white"
        strokeWidth="1.5"
        strokeDasharray="12 8"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────── */
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ backgroundColor: "#0F1115" }}
      className="relative w-full text-white overflow-hidden py-20 md:py-32"
    >
      {/* Subtle background gradient blob */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-10">
        {/* ── Heading ── */}
        <div className="overflow-hidden">
          <motion.h2
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-serif leading-none tracking-tight text-white text-4xl sm:text-5xl md:text-7xl"
          >
            Let&rsquo;s build together.
          </motion.h2>
        </div>

        {/* ── Subtext ── */}
        <motion.p
          variants={subVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-white/50 text-base md:text-xl max-w-xl leading-relaxed"
        >
          I&rsquo;m a B.Tech CSE graduate open to full-time roles, collaborations,
          and exciting projects.{" "}
          <br className="hidden md:block" />
          Let&rsquo;s talk!
        </motion.p>

        {/* ── Circular CTA Button ── */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.4 }}
        >
          <a
            href="mailto:adithyanspillaiofficial@gmail.com"
            className="group relative flex items-center justify-center w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px]"
            aria-label="Say Hello via email"
          >
            {/* Dashed spinning ring */}
            <SpinningRing />

            {/* Inner solid border circle */}
            <motion.div
              className="absolute inset-[10px] rounded-full border border-white/20 flex items-center justify-center flex-col gap-2 text-center"
              whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.08)" }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <ArrowUpRight
                size={24}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
              <span className="text-xs sm:text-sm font-medium tracking-widest uppercase leading-tight">
                Say Hello
              </span>
            </motion.div>
          </a>
        </motion.div>

        {/* ── Contact Links ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mt-4 w-full sm:w-auto"
        >
          {CONTACT_LINKS.map(({ label, href, icon }) => (
            <motion.a
              key={href}
              href={href}
              target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center justify-center sm:justify-start gap-3 px-6 py-3 rounded-full border border-white/20 text-white/70 text-sm font-medium tracking-wide transition-all duration-300 hover:border-white hover:bg-white hover:text-[#0F1115] cursor-pointer w-full sm:w-auto"
            >
              <span className="transition-colors duration-300 shrink-0">{icon}</span>
              <span className="transition-colors duration-300 truncate">{label}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* ── Footer ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-10 mt-20 md:mt-24 mx-auto max-w-5xl px-6"
      >
        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-xs tracking-wider text-center">
          {/* Left */}
          <span>Adithyan S Pillai &copy; {new Date().getFullYear()}</span>

          {/* Center – AS logo */}
          <div
            className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white/50 font-serif font-semibold text-sm tracking-widest select-none"
            aria-label="AS logo"
          >
            AS
          </div>

          {/* Right */}
          <span>Designed &amp; Coded with ❤️</span>
        </div>
      </motion.footer>
    </section>
  );
}
