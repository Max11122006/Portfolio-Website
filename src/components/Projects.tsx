"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "./MotionPrimitives";
import ProjectCard from "./ProjectCard";
import { selectedProjects } from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 md:py-36 px-6 section-divide"
    >
      <div className="absolute inset-0 schematic-grid pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.25em] uppercase text-muted mb-6 font-mono">
            {"// PROJECTS"}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-foreground mb-4">
            Selected <span className="text-accent">Projects.</span>
          </h2>
          <p className="text-sm text-muted mb-16 max-w-lg">
            A selection of projects and experiments exploring software, embedded systems, and engineering concepts.
          </p>
        </FadeIn>

        <StaggerContainer
          className="grid md:grid-cols-2 gap-6"
          staggerDelay={0.1}
        >
          {selectedProjects.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
