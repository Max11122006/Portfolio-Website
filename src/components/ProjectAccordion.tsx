"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { ProjectSection } from "@/data/projectDetails";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProjectAccordion({
  sections,
}: {
  sections: ProjectSection[];
}) {
  const [openSet, setOpenSet] = useState<Set<string>>(new Set());
  const reduceMotion = useReducedMotion();

  const toggle = (title: string) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  return (
    <div className="divide-y divide-border border-t border-border">
      {sections.map((section) => {
        const isOpen = openSet.has(section.title);
        return (
          <div key={section.title}>
            {/* Header */}
            <button
              onClick={() => toggle(section.title)}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-300 ${
                    isOpen ? "bg-accent" : "bg-border"
                  }`}
                />
                <span className="text-xs font-mono tracking-[0.2em] uppercase text-foreground group-hover:text-accent transition-colors duration-200">
                  {section.title}
                </span>
              </div>
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted flex-shrink-0"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <path d="M3 6l5 5 5-5" />
              </motion.svg>
            </button>

            {/* Expanded content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="pb-7 pl-4">
                    {/* Bullet points */}
                    <ul className="space-y-3 mb-0">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-[7px] w-1 h-1 rounded-full bg-accent/60 flex-shrink-0" />
                          <span className="text-sm text-foreground/75 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Optional photo grid */}
                    {section.images && section.images.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {section.images.map((src, i) => (
                          <div
                            key={i}
                            className="relative rounded-md overflow-hidden border border-border bg-surface-alt"
                          >
                            <Image
                              src={src}
                              alt={`${section.title} image ${i + 1}`}
                              width={800}
                              height={600}
                              className="w-full h-auto object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
