"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X } from "lucide-react";

const NAV_LINKS: { label: string; id: string }[] = [
  { label: "About",      id: "about"          },
  { label: "Skills",     id: "skills"         },
  { label: "Projects",   id: "work"           },
  { label: "Education",  id: "certifications" },
  { label: "Experience", id: "experience"     },
  { label: "Contact",    id: "contact"        },
];

// IDs to observe — "hero" first so it wins while at top
const OBSERVE_IDS = ["hero", ...NAV_LINKS.map((l) => l.id)];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [audioEnabled, setAudioEnabled]   = useState<boolean>(false);
  const [mobileOpen, setMobileOpen]       = useState<boolean>(false);

  /* ── Scroll-spy ──────────────────────────────────────────────────────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      {
        root: null,
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    OBSERVE_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Lock body scroll when mobile menu open ──────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── Scroll helpers ──────────────────────────────────────────────────────── */
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 80,
      behavior: "smooth",
    });
  };

  const handleMobileLink = (id: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }, 320);
  };

  const onHero = activeSection === "hero" || activeSection === "";

  /* ── Render ──────────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP NAV
      ══════════════════════════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
      >
        <div className="flex items-center gap-6 rounded-full px-6 py-3 bg-white/80 backdrop-blur-xl border border-[#E2E0D4] shadow-lg">

          {/* ── Logo — filled black when on hero ── */}
          <div className="relative flex-shrink-0 w-8 h-8">
            {/* The shared black fill travels from here → nav pills via layoutId */}
            {onHero && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-0 rounded-sm bg-neutral-900"
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              />
            )}
            <span
              className={`
                relative z-10 w-full h-full
                flex items-center justify-center
                border rounded-sm
                text-xs font-bold tracking-widest select-none
                transition-colors duration-200
                ${onHero
                  ? "border-transparent text-white"
                  : "border-[#E2E0D4] text-neutral-800"
                }
              `}
            >
              AS
            </span>
          </div>

          {/* ── Nav links ── */}
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map(({ label, id }) => {
              const isActive = !onHero && activeSection === id;

              return (
                <li key={id} className="relative">
                  {/* Shared animated pill */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-neutral-900"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}

                  <a
                    href={`#${id}`}
                    onClick={(e) => scrollTo(e, id)}
                    className={`
                      relative z-10
                      block px-4 py-1.5 rounded-full
                      text-sm font-medium
                      transition-colors duration-200
                      ${isActive ? "text-white" : "text-neutral-600 hover:text-neutral-900"}
                    `}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── Audio toggle ── */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setAudioEnabled((prev) => !prev)}
            aria-label={audioEnabled ? "Mute audio" : "Enable audio"}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
          >
            {audioEnabled ? (
              <Volume2 size={16} strokeWidth={1.75} />
            ) : (
              <VolumeX size={16} strokeWidth={1.75} />
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE NAV
      ══════════════════════════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 md:hidden w-[calc(100%-2rem)]"
      >
        <div className="flex items-center justify-between rounded-full px-4 py-2.5 bg-white/85 backdrop-blur-xl border border-[#E2E0D4] shadow-lg">

          {/* ── Logo ── */}
          <div className="relative w-8 h-8 flex-shrink-0">
            {onHero && (
              <motion.span
                layoutId="mobile-nav-active"
                className="absolute inset-0 rounded-sm bg-neutral-900"
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              />
            )}
            <span
              className={`
                relative z-10 w-full h-full
                flex items-center justify-center
                border rounded-sm
                text-xs font-bold tracking-widest select-none
                transition-colors duration-200
                ${onHero ? "border-transparent text-white" : "border-[#E2E0D4] text-neutral-800"}
              `}
            >
              AS
            </span>
          </div>

          {/* ── Current section label (center) ── */}
          <div className="flex-1 flex items-center justify-center overflow-hidden px-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeSection || "home"}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
                className="text-[11px] font-mono tracking-[0.22em] uppercase text-neutral-500 whitespace-nowrap select-none"
              >
                {onHero
                  ? "Portfolio"
                  : (NAV_LINKS.find((l) => l.id === activeSection)?.label ?? "Portfolio")}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* ── Hamburger / Close ── */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-700"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={20} strokeWidth={2} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={20} strokeWidth={2} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE FULLSCREEN OVERLAY MENU
      ══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] as const }}
            className="fixed inset-0 z-40 md:hidden flex flex-col bg-[#0F1115]"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <div className="w-9 h-9 flex items-center justify-center border border-white/20 rounded-sm text-xs font-bold tracking-widest text-white select-none">
                AS
              </div>
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 flex items-center justify-center rounded-full text-white/70 hover:text-white border border-white/10 transition-colors duration-200"
              >
                <X size={20} strokeWidth={2} />
              </motion.button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {NAV_LINKS.map(({ label, id }, index) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); handleMobileLink(id); }}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 + index * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
                  className={`
                    block py-4 px-2
                    text-3xl font-semibold tracking-tight
                    border-b border-white/8
                    transition-colors duration-200
                    ${activeSection === id ? "text-white" : "text-white/50 hover:text-white"}
                  `}
                >
                  {label}
                </motion.a>
              ))}
            </nav>

            {/* Audio toggle footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.3 }}
              className="flex items-center justify-between px-8 py-8 border-t border-white/8"
            >
              <span className="text-xs text-white/30 tracking-widest uppercase">Sound</span>
              <motion.button
                whileTap={{ scale: 0.88 }}
                whileHover={{ scale: 1.08 }}
                onClick={() => setAudioEnabled((prev) => !prev)}
                aria-label={audioEnabled ? "Mute audio" : "Enable audio"}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-white/60 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {audioEnabled ? (
                  <><Volume2 size={16} strokeWidth={1.75} /><span>On</span></>
                ) : (
                  <><VolumeX size={16} strokeWidth={1.75} /><span>Off</span></>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
