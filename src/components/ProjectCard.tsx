"use client";

import Link from "next/link";
import Image from "next/image";
import BreadboardCard from "./BreadboardCard";
import { type Project, WIRE_COLORS } from "@/data/projects";

const LINK_CLASS =
  "inline-flex items-center gap-1.5 py-2.5 text-xs font-mono tracking-wide uppercase text-accent rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

export default function ProjectCard({
  project,
  headingLevel = 3,
}: {
  project: Project;
  /** 3 under a section heading (home page), 2 where cards sit directly under the h1. */
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className="group relative h-full">
      <BreadboardCard className="h-full" hover>
        <div className="p-7 md:p-8 pt-7 pb-7 flex flex-col h-full">
          {/* Screenshot — part of the resting state, no hover required */}
          <div className="relative aspect-[16/9] w-full mb-6 overflow-hidden rounded-md border border-border bg-surface-alt">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
              sizes="(min-width: 1200px) 500px, (min-width: 768px) calc(50vw - 5rem), calc(100vw - 6.5rem)"
            />
          </div>

          <p className="text-[11px] tracking-[0.2em] uppercase text-accent/70 font-medium mb-4">
            {project.category}
          </p>

          <Heading className="text-lg font-semibold text-foreground mb-3 leading-snug">
            {project.title}
          </Heading>

          <p className="text-sm text-muted leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag, i) => (
              <span
                key={tag}
                className={`jumper-wire jumper-wire--${WIRE_COLORS[i % WIRE_COLORS.length]}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links — always rendered, tappable without hover */}
          <div className="flex items-center gap-5 mt-6 pt-1.5 border-t border-border-light">
            {/* The ::after stretches this link over the whole card, so the card
                stays clickable as a unit without hiding the link itself. */}
            <Link
              href={`/projects/${project.slug}`}
              className={`${LINK_CLASS} after:absolute after:inset-0 after:content-['']`}
            >
              View Project
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 6h7M6.5 3l3 3-3 3" />
              </svg>
            </Link>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${LINK_CLASS} relative z-10`}
                aria-label={`${project.title} source code on GitHub`}
              >
                GitHub
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </BreadboardCard>
    </div>
  );
}
