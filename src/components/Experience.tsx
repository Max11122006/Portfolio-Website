"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./MotionPrimitives";

interface Role {
  id: number;
  title: string;
  organisation: string;
  period: string;
  location: string;
  summary: string;
  details: string[];
}

const roles: Role[] = [
  {
    id: 1,
    title: "Assistant Property Manager",
    organisation: "Private Residential Portfolio",
    period: "2023 — Present",
    location: "Edinburgh, Scotland",
    summary:
      "End-to-end management of a private residential property portfolio, overseeing tenant relations, maintenance operations, and financial reporting.",
    details: [
      "Coordinate maintenance and repairs across multiple residential units, ensuring compliance with Scottish tenancy regulations.",
      "Manage tenant communications, lease administration, and dispute resolution with a focus on retention and satisfaction.",
      "Oversee monthly financial reporting, rent collection processes, and property performance analysis.",
      "Developed a systematic approach to property inspections and preventive maintenance scheduling.",
    ],
  },
  {
    id: 2,
    title: "Freelance Graphic Designer",
    organisation: "Self-Employed",
    period: "2022 — Present",
    location: "Remote",
    summary:
      "Specialising in 3D product mockups, brand identity, and visual communication for small businesses and personal clients.",
    details: [
      "Created photorealistic 3D product renders and packaging mockups for e-commerce and marketing campaigns.",
      "Designed brand identity systems including logos, typography guidelines, and colour palettes.",
      "Delivered client projects on deadline while managing scope and feedback cycles independently.",
      "Built a repeatable workflow using Blender and Adobe Creative Suite for consistent, high-quality output.",
    ],
  },
  {
    id: 3,
    title: "Junior Software Engineer",
    organisation: "Kainos — Work Experience",
    period: "2022",
    location: "Belfast / Remote",
    summary:
      "Industry placement with a leading digital services company, contributing to real software engineering workflows.",
    details: [
      "Participated in agile development sprints, contributing to front-end tasks within a production codebase.",
      "Gained exposure to enterprise-grade CI/CD pipelines, code review processes, and version control workflows.",
      "Shadowed senior engineers across full-stack development, QA, and DevOps disciplines.",
      "Developed an understanding of how large-scale engineering teams ship reliable software under tight timelines.",
    ],
  },
];

export default function Experience() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggle = (id: number) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <section
      id="experience"
      className="relative py-24 md:py-36 px-6 section-divide"
    >
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.25em] uppercase text-muted mb-6 font-mono">
            {"// EXPERIENCE"}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-foreground mb-16">
            Responsibility,{" "}
            <span className="text-accent">applied.</span>
          </h2>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-0">
            {roles.map((role, i) => (
              <FadeIn key={role.id} delay={0.1 * i}>
                <div className="relative pl-8 md:pl-16 pb-12 last:pb-0">
                  {/* Dot */}
                  <div
                    className={`absolute left-0 md:left-6 top-1.5 w-2 h-2 rounded-full -translate-x-[3.5px] transition-colors duration-300 ${
                      expandedId === role.id ? "bg-accent" : "bg-border"
                    }`}
                  />

                  <button
                    onClick={() => toggle(role.id)}
                    className="w-full text-left group cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-2">
                      <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
                        {role.title}
                      </h3>
                      <span className="text-sm text-muted">
                        {role.organisation}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted/70 mb-3">
                      <span>{role.period}</span>
                      <span className="w-px h-3 bg-border" />
                      <span>{role.location}</span>
                    </div>

                    <p className="text-sm text-muted leading-relaxed max-w-2xl">
                      {role.summary}
                    </p>

                    <span className="inline-block mt-3 text-xs text-accent/70 group-hover:text-accent transition-colors">
                      {expandedId === role.id ? "Collapse" : "View details"} →
                    </span>
                  </button>

                  {/* Expandable detail */}
                  <AnimatePresence>
                    {expandedId === role.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-4 space-y-3 border-l border-border-light pl-4">
                          {role.details.map((detail, j) => (
                            <motion.li
                              key={j}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.05 * j,
                                duration: 0.4,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="text-sm text-muted leading-relaxed"
                            >
                              {detail}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}