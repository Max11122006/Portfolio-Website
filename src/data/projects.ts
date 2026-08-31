/**
 * Project data — the single place a project is defined.
 *
 * Adding a project = append one object below + drop its image in
 * public/projects/. Nothing else needs touching: `featured` and `order` drive
 * both the homepage selection and the workshop list.
 *
 * Copy for the four beats (hook / problem / approach / outcome) and the dates
 * are being written separately. Fields still holding a placeholder marker are
 * rendered as clearly-marked gaps and reported by scripts/check-copy.mjs.
 */

// Assembled from parts so the marker constant is not itself a grep hit —
// only real placeholders should show up when grepping for the marker.
export const COPY_TODO = "TODO" + "(copy):";

/** True while a field is still awaiting real copy. */
export const isPlaceholder = (value: string | undefined): boolean =>
  !!value && value.trimStart().startsWith(COPY_TODO);

export interface Project {
  /** Stable identifier — used for React keys, anchors and the detail route. */
  slug: string;
  title: string;
  /** Eyebrow above the title. Existing strings, unchanged. */
  category: string;
  /** Display as-is; never parsed. */
  date: string;

  // The four beats. One line each, written to a fixed structure.
  /** What the thing does for someone. No jargon. */
  hook: string;
  /** The actual obstacle — not the topic. */
  problem: string;
  /** The decision made, and what was rejected. */
  approach: string;
  /** A number, a state, or an honest limitation. */
  outcome: string;

  tags: string[];
  image: string;
  imageAlt: string;
  /** Optional larger image for the detail route. */
  heroImage?: string;

  links: {
    demo?: string;
    repo?: string;
  };

  /** true = shown in the homepage "Selected Projects" grid. */
  featured: boolean;
  /** Explicit sort, lowest first. Applies to both lists. */
  order: number;

  /**
   * @deprecated Superseded by `hook`. Retained so the site keeps its existing
   * approved copy while the new beats are still placeholders; remove this field
   * once every entry has a real `hook`.
   */
  description?: string;
}

const WIRE_COLORS = ["red", "blue", "green", "yellow", "orange", "purple"];

export { WIRE_COLORS };

const projects: Project[] = [
  {
    slug: "beam-deflection-rig",
    title: "Beam Deflection Measurement Rig",
    category: "Experimental Engineering",
    date: "TODO(copy): when this was built",
    hook: "TODO(copy): one-line hook",
    problem: "TODO(copy): what was actually hard",
    approach: "TODO(copy): the decision made, and what was rejected",
    outcome: "TODO(copy): a number, a state, or an honest limitation",
    tags: ["Arduino", "Structural Mechanics", "Experimental Engineering", "Sensors", "Data Analysis"],
    image: "/projects/beam-deflection.jpg",
    imageAlt:
      "The test rig photographed from above and annotated: a brass beam clamped to an aluminium extrusion frame, with a servo motor, load cell, HX711 amplifier, breadboard, Arduino Uno and a 199 g calibration weight each labelled.",
    links: { repo: "https://github.com/Max11122006/Bending-Beam-Max" },
    featured: true,
    order: 1,
    description:
      "Custom-built experimental rig to measure beam deflection under load and estimate Young’s modulus of a brass beam. Integrated Arduino-based sensing system to capture displacement data and validate theoretical models.",
  },
  {
    slug: "crude-flow",
    title: "Crude Flow",
    category: "Software & Data",
    date: "TODO(copy): when this was built",
    hook: "TODO(copy): one-line hook",
    problem: "TODO(copy): what was actually hard",
    approach: "TODO(copy): the decision made, and what was rejected",
    outcome: "TODO(copy): a number, a state, or an honest limitation",
    tags: ["Next.js", "TypeScript", "Mapbox GL JS", "WebSockets", "Data Visualisation", "APIs", "Real-Time Systems"],
    image: "/projects/crude-flow.jpg",
    imageAlt:
      "The Crude Flow dashboard: a dark world map clustered with tracked tanker counts, beside a live intel feed and a fleet statistics panel showing vessels tracked, in transit, at anchor and in conflict.",
    links: { repo: "https://github.com/Max11122006/crude-flow" },
    featured: true,
    order: 2,
    description:
      "Real-time global oil shipping intelligence platform visualising live AIS vessel data on a GPU-accelerated Mapbox map. Integrates conflict zone intelligence, commodity pricing, and maritime news into a unified operational dashboard, streamed via server-side WebSockets for scalable, low-latency delivery.",
  },
  {
    slug: "3d-printing-prototyping",
    title: "3D Printer",
    category: "Design & Fabrication",
    date: "TODO(copy): when this was built",
    hook: "TODO(copy): one-line hook",
    problem: "TODO(copy): what was actually hard",
    approach: "TODO(copy): the decision made, and what was rejected",
    outcome: "TODO(copy): a number, a state, or an honest limitation",
    tags: ["CAD", "3D Printing", "Mechanical Design", "Prototyping"],
    image: "/projects/3d-printing.jpg",
    imageAlt:
      "A desktop 3D printer on a workbench, mid-setup: filament spool on the left, LED light bar across the top of the frame, touchscreen controller on the right, and scrapers and printed parts around the base.",
    heroImage: "/projects/3d-printing.jpg",
    links: {},
    featured: true,
    order: 3,
    description:
      "Iterative design and fabrication of mechanical components using CAD and 3D printing. Focused on rapid prototyping, testing design constraints, and refining functional parts for small-scale engineering systems.",
  },
  {
    slug: "missile-trajectory-tracker",
    title: "Missile Trajectory Tracker",
    category: "Software & Simulation",
    date: "TODO(copy): when this was built",
    hook: "TODO(copy): one-line hook",
    problem: "TODO(copy): what was actually hard",
    approach: "TODO(copy): the decision made, and what was rejected",
    outcome: "TODO(copy): a number, a state, or an honest limitation",
    tags: ["Python", "Physics Simulation", "Data Visualisation", "Mathematics"],
    image: "/projects/missile-trajectory.jpg",
    imageAlt:
      "Screenshot of the tracker: coloured intercept paths plotted on 3D axes converging on targets, beside a status panel listing launches, per-target fleet state and a hit/miss summary.",
    links: { repo: "https://github.com/Max11122006/missile-trajectory-tracker" },
    featured: true,
    order: 4,
    description:
      "Physics-based simulation tool for modelling projectile motion and flight trajectories. Implements kinematic equations with adjustable parameters and real-time visualisation to analyse trajectory behaviour and prediction accuracy.",
  },
  {
    slug: "honda-civic-projects",
    title: "Honda Civic Engineering Projects",
    category: "Automotive & Mechanical",
    date: "TODO(copy): when this was built",
    hook: "TODO(copy): one-line hook",
    problem: "TODO(copy): what was actually hard",
    approach: "TODO(copy): the decision made, and what was rejected",
    outcome: "TODO(copy): a number, a state, or an honest limitation",
    tags: ["Automotive Systems", "Mechanical Engineering", "Diagnostics", "Problem Solving"],
    image: "/projects/honda-civic.jpg",
    imageAlt:
      "The open engine bay of the Honda Civic, showing the intake manifold, wiring looms and hoses, and a battery with newly fitted red and black terminal leads.",
    heroImage: "/projects/honda/hero.jpg",
    links: {},
    featured: true,
    order: 5,
    description:
      "Hands-on mechanical work including diagnostics, maintenance, and component-level modifications on a 2006 Honda Civic. Applied real-world engineering principles to understand automotive systems and improve performance and reliability.",
  },
  {
    slug: "friendly",
    title: "Friendly",
    category: "Software & Web",
    date: "TODO(copy): when this was built",
    hook: "TODO(copy): one-line hook",
    problem: "TODO(copy): what was actually hard",
    approach: "TODO(copy): the decision made, and what was rejected",
    outcome: "TODO(copy): a number, a state, or an honest limitation",
    tags: ["Next.js", "TypeScript", "Firebase", "Real-Time Systems", "UX Design", "Full-Stack Development"],
    image: "/projects/friendly.jpg",
    imageAlt:
      "The Friendly landing page: the headline “Your campus. Always in sync.” over a photo of graduates throwing their caps, with get-started and live-map buttons beneath.",
    links: { repo: "https://github.com/Max11122006/friendly" },
    featured: true,
    order: 6,
    description:
      "Mobile-first web application that eliminates the friction of organising meetups through automated availability matching and live location features. Built on a serverless Firebase architecture with real-time chat, scheduling, and group discovery in a single unified interface.",
  },
  {
    slug: "storm-formation-analysis",
    title: "Storm Formation Analysis Tool",
    category: "Software & Data",
    date: "TODO(copy): when this was built",
    hook: "TODO(copy): one-line hook",
    problem: "TODO(copy): what was actually hard",
    approach: "TODO(copy): the decision made, and what was rejected",
    outcome: "TODO(copy): a number, a state, or an honest limitation",
    tags: ["Python", "Weather APIs", "Data Analysis", "Computer Vision"],
    image: "/projects/storm-analysis.jpg",
    imageAlt:
      "A weather radar composite of a large spiral storm system over the Gulf coast, rainfall intensity shaded from blue through green and yellow to red around the eye, with city names marked.",
    links: { repo: "https://github.com/Max11122006/stormwatch-ai" },
    featured: false,
    order: 7,
    description:
      "Data-driven system analysing satellite imagery and weather APIs to identify early indicators of storm development. Combines image processing and environmental data to explore pattern recognition in atmospheric conditions.",
  },
  {
    slug: "portfolio-website",
    title: "Engineering Portfolio Website",
    category: "Software & Web",
    date: "TODO(copy): when this was built",
    hook: "TODO(copy): one-line hook",
    problem: "TODO(copy): what was actually hard",
    approach: "TODO(copy): the decision made, and what was rejected",
    outcome: "TODO(copy): a number, a state, or an honest limitation",
    tags: ["Web Development", "UI Design", "HTML", "CSS", "JavaScript"],
    image: "/projects/portfolio-website.jpg",
    imageAlt:
      "This portfolio's home page: the split-flap board spelling MAKSYMILIAN DUBOWSKI above BENG AEROSPACE ENGINEERING, on a pale graph-paper background.",
    links: { repo: "https://github.com/Max11122006/Portfolio-Website" },
    featured: false,
    order: 8,
    description:
      "Designed and developed a personal portfolio website to showcase engineering projects and skills. Focused on clean UI, structured project presentation, and responsive design.",
  },
];

const byOrder = (a: Project, b: Project) => a.order - b.order;

/** Every project, lowest `order` first — the workshop list. */
export const allProjects: Project[] = [...projects].sort(byOrder);

/** The homepage grid. Driven by `featured`, never a hardcoded slug list. */
export const selectedProjects: Project[] = allProjects.filter((p) => p.featured);

/** Fields that must hold real copy before the site ships. */
export const COPY_FIELDS = ["date", "hook", "problem", "approach", "outcome", "imageAlt"] as const;

/** Every project/field pair still awaiting copy. Used by the build-time check. */
export function copyPlaceholders(): { slug: string; field: string }[] {
  return projects.flatMap((p) =>
    COPY_FIELDS.filter((f) => isPlaceholder(p[f])).map((field) => ({ slug: p.slug, field }))
  );
}
