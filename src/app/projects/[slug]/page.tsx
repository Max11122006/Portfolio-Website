import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { allProjects } from "@/data/projects";
import ProjectAccordion from "@/components/ProjectAccordion";

/** The three beats, rendered expanded — they are the page, not supporting detail. */
const BEATS: { key: "problem" | "approach" | "outcome"; label: string }[] = [
  { key: "problem", label: "The Problem" },
  { key: "approach", label: "The Approach" },
  { key: "outcome", label: "The Outcome" },
];

export async function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-background">
      {/* ── Back nav ── */}
      <div className="px-6 pt-8 pb-0 max-w-5xl mx-auto">
        <Link
          href="/personal-projects"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-muted hover:text-accent transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 7H3M6 3.5L2.5 7L6 10.5" />
          </svg>
          Back to Projects
        </Link>
      </div>

      {/* ── Hero ── */}
      <section className="px-6 pt-16 pb-12 max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.25em] uppercase text-muted mb-4 font-mono">
          {project.date
            ? `// ${project.category} · ${project.date}`
            : `// ${project.category}`}
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-foreground mb-6">
          {project.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono bg-surface-alt border border-border rounded-full text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hero image — only shown if explicitly set via heroImage */}
        {project.heroImage && (
          <div className="w-full rounded-lg overflow-hidden border border-border bg-surface-alt mb-14">
            <Image
              src={project.heroImage}
              alt={project.imageAlt}
              width={1200}
              height={900}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        )}
      </section>

      {/* ── Content ── */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        {/* Hook — lead paragraph, no heading */}
        {project.hook && (
          <p className="text-foreground/80 text-base md:text-lg leading-relaxed max-w-3xl mb-14">
            {project.hook}
          </p>
        )}

        {/* The four beats are the argument of the page — never behind a click */}
        <div className="space-y-12 mb-16">
          {BEATS.map(({ key, label }) =>
            !project[key] ? null : (
              <div key={key}>
                <h2 className="text-xs tracking-[0.25em] uppercase font-mono text-accent mb-4">
                  {label}
                </h2>
                <p className="text-foreground/80 text-base md:text-lg leading-relaxed max-w-3xl">
                  {project[key]}
                </p>
              </div>
            )
          )}
        </div>

        {/* Supporting detail — accordions are fine for a list of discrete items */}
        {project.sections && project.sections.length > 0 && (
          <>
            <div className="w-full h-px bg-border mb-12" />
            <ProjectAccordion sections={project.sections} />
          </>
        )}

        {project.links.repo && (
          <>
            <div className="w-full h-px bg-border mt-16 mb-10" />
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-sm font-mono text-muted hover:text-accent transition-colors border border-border hover:border-accent/40 rounded-lg px-5 py-3"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              View on GitHub
            </a>
          </>
        )}
      </section>
    </main>
  );
}
