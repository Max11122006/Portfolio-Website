"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "./MotionPrimitives";

const TECH_TAGS = [
  "Python",
  "C++",
  "Arduino",
  "Embedded Systems",
  "Computer Vision",
  "Data APIs",
];

const PHOTOS = [
  {
    src: "/about/IMG_0142.jpg",
    alt: "Standing on a bridge walkway above a city river at sunset, with a flag flying and high-rise towers on the far bank.",
  },
  {
    src: "/about/IMG_1061.jpg",
    alt: "Standing at a harbour railing beside a lifebuoy, with a dense high-rise skyline and hills across the water.",
  },
  {
    src: "/about/IMG_2058.jpg",
    alt: "Following through on a golf swing on a hilltop course, with a city and distant hills spread out below.",
  },
  {
    src: "/about/IMG_5657.jpg",
    alt: "Standing at a waterfront railing at dusk, with a tour boat passing and a three-towered hotel across the bay.",
  },
];

/* The carousel sits in a 2-of-5 column at lg and full width below it. */
const PHOTO_SIZES = "(min-width: 1024px) 430px, calc(100vw - 3rem)";

function PhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((i) => (i + 1) % PHOTOS.length), []);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + PHOTOS.length) % PHOTOS.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <div
      className="relative aspect-[4/5] rounded-xl overflow-hidden border border-border group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={PHOTOS[current].src}
            alt={PHOTOS[current].alt}
            fill
            sizes={PHOTO_SIZES}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-background/80"
        aria-label="Previous photo"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-background/80"
        aria-label="Next photo"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${
              i === current ? "bg-accent" : "bg-foreground/20"
            }`}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-36 px-6 section-divide"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.25em] uppercase text-muted mb-6 font-mono">
            {"// ABOUT"}
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          {/* Text — 3 cols */}
          <div className="lg:col-span-3 space-y-8">
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-foreground">
                The Person Behind
                <br />
                <span className="text-accent">The Projects.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-base md:text-lg text-muted leading-relaxed max-w-xl">
                I&apos;m Maksymilian Dubowski, an aerospace engineering student
                at Heriot-Watt University who enjoys building and modifying
                things to understand how they work. Whether it&apos;s working on
                my Honda Civic, tuning and modifying my 3D printer, or writing
                code for experimental projects, I like learning through hands-on
                experimentation.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base md:text-lg text-muted leading-relaxed max-w-xl">
                Many of my projects sit at the intersection of hardware and
                software. I regularly experiment with microcontrollers, embedded
                systems, and computer vision, building small systems that
                interact with the physical world. Some projects start as simple
                ideas and evolve into more complex tools as I iterate and
                improve them.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="text-base md:text-lg text-muted leading-relaxed max-w-xl">
                I document and share much of this work on GitHub, including
                projects like a missile trajectory tracking simulator, where I
                explored modelling projectile motion and visualising flight
                paths. For me, building projects is the best way to develop
                practical engineering skills beyond university coursework and to
                explore the kinds of systems used in aviation, robotics, and
                complex machines.
              </p>
            </FadeIn>

            {/* Tech tags */}
            <FadeIn delay={0.45}>
              <div className="flex flex-wrap gap-2 pt-2">
                {TECH_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono bg-surface-alt border border-border rounded-full text-muted hover:border-accent/40 hover:text-accent transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Photo carousel — 2 cols */}
          <FadeIn delay={0.3} direction="right" className="lg:col-span-2">
            <PhotoCarousel />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
