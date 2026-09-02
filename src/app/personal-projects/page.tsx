"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionPrimitives";
import ProjectCard from "@/components/ProjectCard";
import { allProjects } from "@/data/projects";

export default function PersonalProjectsPage() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      <section className="pt-32 pb-24 md:pb-36 px-6">
        <div className="fixed inset-0 schematic-grid pointer-events-none opacity-50" />

        <div className="relative max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-xs tracking-[0.25em] uppercase text-muted mb-6 font-mono">
              {"// ALL_PROJECTS"}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-foreground mb-4">
              The <span className="text-accent">Workshop.</span>
            </h1>
            <p className="text-base text-muted mb-16 max-w-xl">
              Every project I&apos;ve built, broken, and learned from — software, hardware, and everything in between.
            </p>
          </FadeIn>

          <StaggerContainer
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={0.08}
          >
            {allProjects.map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} headingLevel={2} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <Footer />
    </main>
  );
}
