import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { allProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | Max Dubowski",
  description: "Engineering, software and hands-on projects by Maksymilian Dubowski.",
  alternates: { canonical: "/personal-projects" },
};

export default function PersonalProjectsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative isolate min-h-screen px-5 py-14 sm:px-6 sm:py-20">
        <div aria-hidden="true" className="schematic-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-72" />
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 sm:mb-10">
            <h1 className="portfolio-heading">All projects</h1>
            <Link href="/github" className="portfolio-link">
              Browse source code <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {allProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} headingLevel={2} archive />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
