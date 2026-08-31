"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionPrimitives";
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
    lastUpdated: "2026-03",
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
    description: "Aerospace-themed engineering portfolio built with Next.js, Tailwind CSS, Framer Motion, and Three.js.",
    category: "personal",
    language: "TypeScript",
    languageColor: "#3178c6",
    topics: ["nextjs", "portfolio", "threejs", "tailwind"],
    lastUpdated: "2026-03",
  },

  // University
  {
    slug: "beam-deflection-rig",
    description: "Experimental rig to measure beam deflection under load and estimate Young's modulus. Arduino-based sensing with data validation.",
    category: "university",
    language: "C++",
    languageColor: "#f34b7d",
    topics: ["arduino", "structural-mechanics", "sensors"],
    lastUpdated: "2026-03",
  },

  // Hackathon
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

const categories: { key: RepoCategory; label: string; icon: string; ledColor: string }[] = [
  { key: "university", label: "University", icon: "🎓", ledColor: "#3b82f6" },
  { key: "hackathon", label: "Hackathons", icon: "⚡", ledColor: "#eab308" },
  { key: "personal", label: "Personal", icon: "🔧", ledColor: "#22c55e" },
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

  const filteredRepos = repos.filter((r) => r.category === activeCategory);
  const activeCat = categories.find((c) => c.key === activeCategory)!;

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      <section className="pt-32 pb-24 md:pb-36 px-6">
        <div className="fixed inset-0 schematic-grid pointer-events-none opacity-50" />

        <div className="relative max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-xs tracking-[0.25em] uppercase text-muted mb-6 font-mono">
              {"// GITHUB_REPOSITORIES"}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-foreground mb-4">
              Source <span className="text-accent">code.</span>
            </h1>
            <p className="text-base text-muted mb-12 max-w-xl">
              All my repositories, categorised by context. University coursework, hackathon builds,
              and personal tinkering — each with its own purpose and stack.
            </p>
          </FadeIn>

          {/* Category tabs — styled like a DIP switch row */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-3 mb-12">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.key;
                const count = repos.filter((r) => r.category === cat.key).length;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`
                      relative flex items-center gap-2.5 px-5 py-3 rounded-lg font-mono text-sm transition-all duration-300 cursor-pointer
                      ${
                        isActive
                          ? "bg-[#f5f2eb] border-2 border-border text-foreground shadow-md"
                          : "bg-surface border-2 border-border text-muted hover:border-accent/30 hover:text-foreground"
                      }
                    `}
                  >
                    <span className="text-base">{cat.icon}</span>
                    <span>{cat.label}</span>
                    <span
                      className={`
                        text-[10px] px-1.5 py-0.5 rounded-sm font-mono
                        ${isActive ? "bg-accent/10 text-accent" : "bg-surface-alt text-muted/60"}
                      `}
                    >
                      {count}
                    </span>
                    {isActive && (
                      <div
                        className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor: cat.ledColor,
                          boxShadow: `0 0 8px ${cat.ledColor}`,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </FadeIn>

          {/* Active category header */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: activeCat.ledColor,
                boxShadow: `0 0 10px ${activeCat.ledColor}60`,
              }}
            />
            <h2 className="text-lg font-semibold text-foreground">
              {activeCat.label} Repositories
            </h2>
            <span className="text-xs font-mono text-muted">
              ({filteredRepos.length} repos)
            </span>
          </div>

          {/* Repo grid */}
          <StaggerContainer
            key={activeCategory}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            staggerDelay={0.08}
          >
            {filteredRepos.map((repo) => (
              <StaggerItem key={repo.slug}>
                <RepoCard repo={repo} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Stats footer */}
          <FadeIn delay={0.3}>
            <div className="mt-16 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-8 text-center">
                {categories.map((cat) => {
                  const catRepos = repos.filter((r) => r.category === cat.key);
                  return (
                    <div key={cat.key} className="flex-1 min-w-[120px]">
                      <p className="text-2xl font-bold text-foreground">{catRepos.length}</p>
                      <p className="text-xs text-muted font-mono mt-1">{cat.label}</p>
                    </div>
                  );
                })}
                <div className="flex-1 min-w-[120px]">
                  <p className="text-2xl font-bold text-foreground">{repos.length}</p>
                  <p className="text-xs text-muted font-mono mt-1">Total Repos</p>
                </div>
                <div className="flex-1 min-w-[120px]">
                  <p className="text-2xl font-bold text-foreground">
                    {new Set(repos.map((r) => r.language)).size}
                  </p>
                  <p className="text-xs text-muted font-mono mt-1">Languages</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
