"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import SolariBoard from "./SolariBoard";
import { SOCIAL } from "@/lib/links";

const PLANE_SVG = (
  <>
    <path d="M 10 28 C 10 25, 14 22, 20 22 L 105 22 C 115 22, 120 25, 120 28 C 120 31, 115 34, 105 34 L 20 34 C 14 34, 10 31, 10 28 Z" />
    <path d="M 105 22 Q 118 22, 126 28 Q 118 34, 105 34" />
    <path d="M 62 22 L 78 22 L 52 2 L 42 4 Z" />
    <path d="M 62 34 L 78 34 L 52 54 L 42 52 Z" />
    <path d="M 16 22 L 24 22 L 20 6 L 8 8 Z" />
  </>
);

function DriftingPlane({ direction, duration, size, opacity, containerRef }: {
  direction: "ltr" | "rtl";
  duration: number;
  size: number;
  opacity: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef(50);
  const startTime = useRef(0);
  const wasOffScreen = useRef(false);
  const initialized = useRef(false);

  useEffect(() => {
    let raf: number;
    const durationMs = duration * 1000;

    if (!initialized.current) {
      initialized.current = true;
      topRef.current = 15 + Math.random() * 60;
      startTime.current = Date.now();
      if (ref.current) ref.current.style.top = `${topRef.current}%`;
    }

    const animate = () => {
      const el = ref.current;
      const container = containerRef.current;
      if (!el || !container) return;

      const rect = container.getBoundingClientRect();
      const elapsed = (Date.now() - startTime.current) % durationMs;
      const progress = elapsed / durationMs;

      // Travel from off-screen left to off-screen right relative to container
      // rect.left is the container's offset from viewport left
      const startX = -rect.left - size;
      const endX = window.innerWidth - rect.left + size;
      const totalTravel = endX - startX;

      const x = direction === "ltr"
        ? startX + progress * totalTravel
        : endX - progress * totalTravel;

      el.style.transform = `translate(${x}px, 0)${direction === "rtl" ? " scaleX(-1)" : ""}`;

      // Only change height when plane is off-screen (at the reset point)
      const isOffScreen = progress > 0.98 || progress < 0.02;
      if (isOffScreen && !wasOffScreen.current) {
        topRef.current = 15 + Math.random() * 60;
        el.style.top = `${topRef.current}%`;
      }
      wasOffScreen.current = isOffScreen;

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [direction, duration, size, containerRef]);

  return (
    <div
      ref={ref}
      className="absolute pointer-events-none hidden md:block z-[1]"
      style={{ top: "50%" }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 56"
        fill="#C8C0B4"
        opacity={opacity}
      >
        {PLANE_SVG}
      </svg>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Engineering grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-background to-background" />
        <div className="absolute inset-0 schematic-grid opacity-40" />
        <motion.div
          animate={{
            background: [
              "radial-gradient(ellipse 70% 40% at 50% 45%, rgba(45,106,79,0.05) 0%, transparent 70%)",
              "radial-gradient(ellipse 60% 50% at 55% 50%, rgba(45,106,79,0.08) 0%, transparent 70%)",
              "radial-gradient(ellipse 70% 40% at 45% 45%, rgba(45,106,79,0.05) 0%, transparent 70%)",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute inset-0"
        />
      </div>

      {/* Background aircraft — full viewport width, clipped to hero section */}
      <div className="absolute inset-0 overflow-hidden">
        <DriftingPlane direction="ltr" duration={18} size={48} opacity={0.40} containerRef={containerRef} />
        <DriftingPlane direction="rtl" duration={22} size={36} opacity={0.32} containerRef={containerRef} />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center"
      >
        {/* Solari Board */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <SolariBoard
            rows={[
              { text: "MAKSYMILIAN DUBOWSKI", color: "white" },
              { text: "BENG AEROSPACE ENGINEERING", color: "amber" },
            ]}
          />
        </motion.div>

        {/* Location tag */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs tracking-[0.25em] uppercase text-muted mt-10 mb-8 font-mono"
        >
          {"// Edinburgh, Scotland"}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-foreground text-white text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors"
          >
            View Work
          </a>
          <a
            href="#about"
            className="px-6 py-3 text-sm font-medium text-muted border border-border rounded-lg hover:border-foreground/30 hover:text-foreground transition-colors"
          >
            Learn More
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3 mt-6"
        >
          <a
            href={SOCIAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-muted hover:border-foreground/30 hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-muted hover:border-foreground/30 hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-5 h-8 rounded-full border border-border flex items-start justify-center pt-1.5"
        >
          <div className="w-0.5 h-1.5 bg-muted/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
