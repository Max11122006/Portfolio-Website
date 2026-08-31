export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  heroImage?: string;
  status: "active" | "completed" | "in-progress";
  github?: string;
}

const WIRE_COLORS = ["red", "blue", "green", "yellow", "orange", "purple"];

export { WIRE_COLORS };

export const allProjects: Project[] = [
  {
    id: 1,
    title: "Missile Trajectory Tracker",
    slug: "missile-trajectory-tracker",
    category: "Software & Simulation",
    description:
      "Physics-based simulation tool for modelling projectile motion and flight trajectories. Implements kinematic equations with adjustable parameters and real-time visualisation to analyse trajectory behaviour and prediction accuracy.",
    tags: ["Python", "Physics Simulation", "Data Visualisation", "Mathematics"],
    image: "/projects/missile-trajectory.jpg",
    status: "completed",
    github: "https://github.com/Max11122006/missile-trajectory-tracker",
  },
  {
    id: 2,
    title: "Storm Formation Analysis Tool",
    slug: "storm-formation-analysis",
    category: "Software & Data",
    description:
      "Data-driven system analysing satellite imagery and weather APIs to identify early indicators of storm development. Combines image processing and environmental data to explore pattern recognition in atmospheric conditions.",
    tags: ["Python", "Weather APIs", "Data Analysis", "Computer Vision"],
    image: "/projects/storm-analysis.jpg",
    status: "in-progress",
    github: "https://github.com/Max11122006/stormwatch-ai",
  },
  {
    id: 3,
    title: "Beam Deflection Measurement Rig",
    slug: "beam-deflection-rig",
    category: "Experimental Engineering",
    description:
      "Custom-built experimental rig to measure beam deflection under load and estimate Young\u2019s modulus of a brass beam. Integrated Arduino-based sensing system to capture displacement data and validate theoretical models.",
    tags: ["Arduino", "Structural Mechanics", "Experimental Engineering", "Sensors", "Data Analysis"],
    image: "/projects/beam-deflection.jpg",
    status: "completed",
    github: "https://github.com/Max11122006/Bending-Beam-Max",
  },
  {
    id: 4,
    title: "3D Printer",
    slug: "3d-printing-prototyping",
    category: "Design & Fabrication",
    description:
      "Iterative design and fabrication of mechanical components using CAD and 3D printing. Focused on rapid prototyping, testing design constraints, and refining functional parts for small-scale engineering systems.",
    tags: ["CAD", "3D Printing", "Mechanical Design", "Prototyping"],
    image: "/projects/3d-printing.jpg",
    heroImage: "/projects/3d-printing.jpg",
    status: "active",
  },
  {
    id: 5,
    title: "Honda Civic Engineering Projects",
    slug: "honda-civic-projects",
    category: "Automotive & Mechanical",
    description:
      "Hands-on mechanical work including diagnostics, maintenance, and component-level modifications on a 2006 Honda Civic. Applied real-world engineering principles to understand automotive systems and improve performance and reliability.",
    tags: ["Automotive Systems", "Mechanical Engineering", "Diagnostics", "Problem Solving"],
    image: "/projects/honda-civic.jpg",
    heroImage: "/projects/honda/hero.jpg",
    status: "active",
  },
  {
    id: 6,
    title: "Crude Flow — Oil Shipping Intelligence Dashboard",
    slug: "crude-flow",
    category: "Software & Data",
    description:
      "Real-time global oil shipping intelligence platform visualising live AIS vessel data on a GPU-accelerated Mapbox map. Integrates conflict zone intelligence, commodity pricing, and maritime news into a unified operational dashboard, streamed via server-side WebSockets for scalable, low-latency delivery.",
    tags: ["Next.js", "TypeScript", "Mapbox GL JS", "WebSockets", "Data Visualisation", "APIs", "Real-Time Systems"],
    image: "/projects/crude-flow.jpg",
    status: "completed",
    github: "https://github.com/Max11122006/crude-flow",
  },
  {
    id: 7,
    title: "Friendly — Smart Social Coordination Platform",
    slug: "friendly",
    category: "Software & Web",
    description:
      "Mobile-first web application that eliminates the friction of organising meetups through automated availability matching and live location features. Built on a serverless Firebase architecture with real-time chat, scheduling, and group discovery in a single unified interface.",
    tags: ["Next.js", "TypeScript", "Firebase", "Real-Time Systems", "UX Design", "Full-Stack Development"],
    image: "/projects/friendly.jpg",
    status: "in-progress",
    github: "https://github.com/Max11122006/friendly",
  },
  {
    id: 8,
    title: "Engineering Portfolio Website",
    slug: "portfolio-website",
    category: "Software & Web",
    description:
      "Designed and developed a personal portfolio website to showcase engineering projects and skills. Focused on clean UI, structured project presentation, and responsive design.",
    tags: ["Web Development", "UI Design", "HTML", "CSS", "JavaScript"],
    image: "/projects/portfolio-website.jpg",
    status: "completed",
    github: "https://github.com/Max11122006/Portfolio-Website",
  },
];

/** Hand-picked projects shown on the homepage */
export const selectedProjects = allProjects.filter((p) =>
  ["missile-trajectory-tracker", "3d-printing-prototyping", "honda-civic-projects", "crude-flow", "friendly", "portfolio-website"].includes(p.slug)
);
