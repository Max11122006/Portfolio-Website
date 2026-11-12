import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  headingLevel = 3,
  archive = false,
}: {
  project: Project;
  headingLevel?: 2 | 3;
  archive?: boolean;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const href = `/projects/${project.slug}`;

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-border bg-surface transition-colors hover:border-accent/70">
      <div className="relative aspect-video overflow-hidden rounded-t-[11px] border-b border-border bg-surface-alt">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover"
          sizes={archive
            ? "(min-width: 1024px) 360px, (min-width: 768px) 46vw, 94vw"
            : "(min-width: 1152px) 540px, (min-width: 768px) 46vw, 94vw"}
        />
      </div>
      <div className="flex flex-1 flex-col px-5 py-5 sm:px-6">
        <p className="mb-2 font-mono text-xs tracking-wide text-muted">
          {project.category}{project.date && ` · ${project.date}`}
        </p>
        <Heading className="text-xl font-semibold tracking-tight sm:text-2xl">
          <Link
            href={href}
            className="rounded-sm after:absolute after:inset-0 after:rounded-xl after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
          >
            {project.title}
          </Link>
        </Heading>
        {project.hook && <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{project.hook}</p>}
        <ul aria-label="Tools and techniques" className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <li key={tag} className="rounded border border-border bg-background px-2 py-1 font-mono text-xs text-muted">
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-sm">
          <span aria-hidden="true" className="font-semibold text-accent group-hover:underline group-focus-within:underline">
            View case study →
          </span>
          {project.links.website && (
            <a href={project.links.website} aria-label={`Visit the ${project.title} website`} className="portfolio-link relative z-10">
              Website
            </a>
          )}
          {project.links.demo && (
            <a href={project.links.demo} aria-label={`${project.title} demo`} className="portfolio-link relative z-10">
              Demo
            </a>
          )}
          {project.links.repo && (
            <a href={project.links.repo} aria-label={`${project.title} on GitHub`} className="portfolio-link relative z-10">
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
