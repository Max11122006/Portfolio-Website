import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { allProjects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectAccordion from "@/components/ProjectAccordion";

const sections = [
  { key: "problem", label: "The problem" },
  { key: "approach", label: "The approach" },
  { key: "outcome", label: "The outcome" },
] as const;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((item) => item.slug === slug);
  if (!project) return {};

  const title = `${project.title} | Max Dubowski`;
  const url = `/projects/${slug}`;
  return {
    title,
    description: project.hook,
    alternates: { canonical: url },
    openGraph: { title, description: project.hook, url, images: [project.image] },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = allProjects.find((item) => item.slug === slug);
  if (!project) notFound();

  const links = [
    { label: `Visit ${project.title}`, href: project.links.website },
    { label: "Open demo", href: project.links.demo },
    { label: "View on GitHub", href: project.links.repo },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative isolate">
        <div aria-hidden="true" className="schematic-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-72" />
        <article className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">
          <Link href="/personal-projects" className="portfolio-link">
            <span aria-hidden="true">←</span> All projects
          </Link>
          <header className="mt-7 sm:mt-10">
            <p className="font-mono text-xs tracking-wide text-muted">
              {project.category}{project.date && ` · ${project.date}`}
            </p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            {project.hook && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{project.hook}</p>}
            <ul aria-label="Tools and techniques" className="mt-5 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded border border-border bg-surface px-2 py-1 font-mono text-xs text-muted">
                  {tag}
                </li>
              ))}
            </ul>
            {links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {links.map(({ label, href }) => (
                  <a key={label} href={href} className="portfolio-button">
                    {label} <span aria-hidden="true" className="ml-1.5">↗</span>
                  </a>
                ))}
              </div>
            )}
          </header>

          {project.heroImage && (
            <Image
              src={project.heroImage.src}
              alt={project.imageAlt}
              width={project.heroImage.width}
              height={project.heroImage.height}
              sizes="(min-width: 1024px) 976px, 95vw"
              className="mt-8 h-auto w-full rounded-xl border border-border bg-surface-alt"
              preload
            />
          )}

          <div className="mt-9 max-w-3xl space-y-7 sm:mt-12 sm:space-y-9">
            {sections.map(({ key, label }) => project[key] && (
              <section key={key} className="border-t border-border pt-5">
                <h2 className="text-xl font-semibold tracking-tight">{label}</h2>
                <p className="mt-2 leading-relaxed text-muted">{project[key]}</p>
              </section>
            ))}
            {project.sections && project.sections.length > 0 && (
              <ProjectAccordion sections={project.sections} />
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
