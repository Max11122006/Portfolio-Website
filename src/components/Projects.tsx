import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { selectedProjects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="px-5 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 sm:mb-9">
          <h2 className="portfolio-heading">Selected projects</h2>
          <Link href="/personal-projects" className="portfolio-link">
            All projects <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 sm:gap-6">
          {selectedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
