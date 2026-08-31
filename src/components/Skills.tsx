"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "./MotionPrimitives";
import BreadboardCard from "./BreadboardCard";

/* ── Data ──────────────────────────────────────────────────────────── */

const skills = [
  {
    category: "Aerospace Engineering",
    items: [
      "Aerodynamics & Flight Performance",
      "Fluid & Thermal Systems",
      "Structural Analysis (FEA)",
      "Propulsion & Energy Systems",
      "Control Systems & Dynamics",
    ],
  },
  {
    category: "Software & Development",
    items: [
      "Python, MATLAB & C++",
      "Data Analysis & Visualisation",
      "React / Next.js / TypeScript",
      "Git, CI/CD & Version Control",
      "Embedded Systems (Arduino)",
    ],
  },
  {
    category: "Systems & Projects",
    items: [
      "Hardware–Software Integration",
      "Sensor Systems & Automation",
      "Rapid Prototyping & Testing",
      "Engineering Problem Solving",
      "Technical Project Development",
    ],
  },
  {
    category: "Design & Visualisation",
    items: [
      "3D Modelling (SolidWorks & Blender)",
      "Engineering Visualisation",
      "Product & Concept Rendering",
      "UI/UX Fundamentals",
      "Adobe Creative Suite",
    ],
  },
];

/* ── Component ─────────────────────────────────────────────────────── */

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-36 px-6 section-divide"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.25em] uppercase text-muted mb-6 font-mono">
            {"// CAPABILITIES"}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-foreground mb-16">
            Core <span className="text-accent">Competencies.</span>
          </h2>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          staggerDelay={0.12}
        >
          {skills.map((group) => (
            <StaggerItem key={group.category}>
              <BreadboardCard hover className="h-full">
                <div className="p-6 pt-8 pb-8">
                  <h3 className="text-xs tracking-[0.2em] uppercase text-accent font-medium font-mono mb-5">
                    {group.category}
                  </h3>

                  <div className="w-8 h-px bg-accent/30 mb-5" />

                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-muted leading-relaxed"
                      >
                        <span className="w-1.5 h-px bg-accent/50 shrink-0 mt-[10px]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </BreadboardCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
