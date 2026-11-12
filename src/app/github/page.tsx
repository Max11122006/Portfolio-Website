"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BreadboardCard from "@/components/BreadboardCard";
import { allProjects } from "@/data/projects";

type RepoCategory = "university" | "hackathon" | "personal";

/**
 * GitHub-specific metadata only. The repo name and URL are NOT stored here —
 * they are derived from src/data/projects.ts via `slug`, so renaming a repo or
 * changing the account handle is a single edit in one file.
 */
interface RepoMeta {
  slug: string;
  description: string;
  category: RepoCategory;
  language: string;
  languageColor: string;
  stars?: number;
  topics: string[];
  lastUpdated: string;
}

type Repo = RepoMeta & { name: string; url: string };

const repoMeta: RepoMeta[] = [
  // Personal
  {
    slug: "missile-trajectory-tracker",
    description: "Physics-based simulation tool for modelling projectile motion and flight trajectories with real-time visualisation.",
    category: "personal",
    language: "Python",
    languageColor: "#3572A5",
    stars: 1,
    topics: ["physics", "simulation", "data-visualisation"],
    lastUpdated: "2026-02",
  },
  {
    slug: "storm-formation-analysis",
    description: "Data-driven system analysing satellite imagery and weather APIs to identify early indicators of storm development.",
    category: "personal",
    language: "Python",
    languageColor: "#3572A5",
    topics: ["weather-apis", "computer-vision", "data-analysis"],
    lastUpdated: "2025-07",
  },
  {
    slug: "crude-flow",
    description: "Real-time global oil shipping intelligence platform with GPU-accelerated Mapbox visualisation and WebSocket data streaming.",
    category: "personal",
    language: "TypeScript",
    languageColor: "#3178c6",
    topics: ["nextjs", "mapbox", "websockets", "real-time"],
    lastUpdated: "2026-03",
  },
  {
    slug: "portfolio-website",
    description: "Aerospace-themed internship portfolio built with Next.js, TypeScript and Tailwind CSS.",
    category: "personal",
    language: "TypeScript",
    languageColor: "#3178c6",
    topics: ["nextjs", "portfolio", "typescript", "tailwind"],
    lastUpdated: "2026-09",
  },

  // University
  {
    slug: "beam-deflection-rig",
    description: "Experimental rig to measure beam deflection under load and estimate Young's modulus. Arduino-based sensing with data validation.",
    category: "university",
    language: "C++",
    languageColor: "#f34b7d",
    topics: ["arduino", "structural-mechanics", "sensors"],
    lastUpdated: "2025-04",
  },

  // Hackathon
  {
    slug: "backed",
    description: "Second-place Build with Gemma prototype using a simulated study prediction market and a Python backend.",
    category: "hackathon",
    language: "Python",
    languageColor: "#3572A5",
    topics: ["gemma", "multimodal-ai", "study-tools"],
    lastUpdated: "2026-07",
  },
  {
    slug: "friendly",
    description: "Mobile-first social coordination platform with automated availability matching, real-time chat, and live location features.",
    category: "hackathon",
    language: "TypeScript",
    languageColor: "#3178c6",
    topics: ["nextjs", "firebase", "real-time", "ux-design"],
    lastUpdated: "2026-03",
  },
];

// Resolve name + URL from the project data. A slug with no repo URL is a
// build-time failure rather than a card that silently disappears.
const repos: Repo[] = repoMeta.map((meta) => {
  const url = allProjects.find((p) => p.slug === meta.slug)?.links.repo;
  if (!url) {
    throw new Error(
      `/github: project "${meta.slug}" has no links.repo in src/data/projects.ts`
    );
  }
  return { ...meta, url, name: url.split("/").pop()! };
});

const categories: { key: RepoCategory; label: string }[] = [
  { key: "university", label: "University" },
  { key: "hackathon", label: "Hackathons" },
  { key: "personal", label: "Personal" },
];

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="block">
      <BreadboardCard hover>
        <div className="p-6 pt-8 pb-8">
          {/* Repo name */}
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-muted/40" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
            </svg>
            <h3 className="text-sm font-semibold text-foreground font-mono truncate">
              {repo.name}
            </h3>
          </div>

          <p className="text-xs text-muted leading-relaxed mb-4 line-clamp-2">
            {repo.description}
          </p>

          {/* Bottom row: language + stars + date */}
          <div className="flex items-center gap-4 text-[10px] font-mono text-muted/60">
            <span className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: repo.languageColor }}
              />
              {repo.language}
            </span>
            {repo.stars !== undefined && (
              <span className="flex items-center gap-1">
                ★ {repo.stars}
              </span>
            )}
            <span className="ml-auto">{repo.lastUpdated}</span>
          </div>

          {/* Topics as jumper wires */}
          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {repo.topics.map((topic, i) => {
                const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
                return (
                  <span
                    key={topic}
                    className={`jumper-wire jumper-wire--${colors[i % colors.length]}`}
                  >
                    {topic}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </BreadboardCard>
    </a>
  );
}

export default function GitHubPage() {
  const [activeCategory, setActiveCategory] = useState<RepoCategory>("university");
  const filteredRepos = repos.filter((repo) => repo.category === activeCategory);
  const activeLabel = categories.find((category) => category.key === activeCategory)?.label;

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative isolate min-h-screen px-5 py-14 sm:px-6 sm:py-20">
        <div aria-hidden="true" className="schematic-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-72" />
        <div className="mx-auto max-w-5xl">
          <h1 className="portfolio-heading">Source code</h1>
          <p className="mt-3 max-w-xl text-muted">
            Selected public repositories from coursework, hackathons and personal projects.
          </p>

          <div role="group" aria-label="Repository categories" className="mt-7 flex flex-wrap gap-2">
            {categories.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveCategory(key)}
                aria-pressed={activeCategory === key}
                className="portfolio-button portfolio-button-small cursor-pointer aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-white"
              >
                {label}
              </button>
            ))}
          </div>

          <section aria-label={`${activeLabel} repositories`} className="mt-7 grid gap-5 md:grid-cols-2">
            {filteredRepos.map((repo) => (
              <RepoCard key={repo.slug} repo={repo} />
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
