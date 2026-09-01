/**
 * Project data — the single place a project is defined.
 *
 * Adding a project = append one object below + drop its image in
 * public/projects/. Nothing else needs touching: `featured` and `order` drive
 * both the homepage selection and the workshop list.
 *
 * The current `order` arrangement is PROVISIONAL — a placeholder ranking, not a
 * settled editorial decision. Renumbering is a one-line change per entry and
 * needs no component changes.
 *
 * Copy for the four beats (hook / problem / approach / outcome) and the dates
 * are being written separately. Fields still holding a placeholder marker are
 * rendered as clearly-marked gaps and reported by scripts/check-copy.mjs.
 */

// Assembled from parts so the marker constant is not itself a grep hit —
// only real placeholders should show up when grepping for the marker.
import { repoUrl } from "@/lib/links";

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
}

const WIRE_COLORS = ["red", "blue", "green", "yellow", "orange", "purple"];

export { WIRE_COLORS };

const projects: Project[] = [
  {
    slug: "beam-deflection-rig",
    title: "Beam Deflection Measurement Rig",
    category: "Instrumentation & Testing",
    date: "Spring 2025",
    hook: "Measures the stiffness of a brass beam by bending it with a servo and reading the force back through a load cell.",
    problem:
      "Young's modulus falls out of a one-line beam equation, but every term in that equation is a measurement you have to make. On a 240 mm brass beam the deflections are 1.5 to 9.4 mm — small enough that reading them off a ruler by eye puts the measurement error on the same order as the quantity being measured.",
    approach:
      "Automated the load side to take human variability out of at least half the experiment. An Arduino Uno drives a servo that steps the beam through five fixed positions, triggered from the serial monitor, with an HX711 load cell and amplifier reading applied force at each stop. The cell was calibrated against a known 199 g mass to a factor of 405.8, and the full sequence repeated across five runs. The deflection side stayed manual — a ruler — which is precisely where the error ended up.",
    outcome:
      "144 GPa, against a published range of 102–125 GPa for brass. Force repeatability was good: within 3.9% at full load across five runs. The error turned out to be the more useful result. The modulus came out high at every load point rather than scattered around the true value, which is the signature of a systematic offset rather than noise — so ruler resolution and load cell drift, both random, don't explain it. Since E scales with L³, the effective cantilever length is the one term that shifts every point by a similar proportion, and between 11 and 26 mm of unaccounted clamped length spans the entire published range: a clamp jaw plus a servo horn bearing inboard of the free end is a plausible source of that. Not confirmed by re-measurement, so it stands as the leading explanation rather than a closed one.",
    tags: ["Arduino", "C++", "Load Cells", "Instrumentation", "Data Analysis", "Mechanical Testing"],
    image: "/projects/beam-deflection.jpg",
    imageAlt:
      "Cantilever bending rig on an aluminium extrusion frame: an orange brass beam clamped at one end, a servo motor applying load at the free end, with an HX711 amplifier and Arduino Uno wired on a breadboard alongside.",
    links: { repo: repoUrl("Bending-Beam-Max") },
    featured: true,
    order: 3,
  },
  {
    slug: "crude-flow",
    title: "Crude Flow",
    category: "Software & Data",
    date: "March 2026",
    hook: "A command-centre map of live tanker traffic, with the chokepoints, conflict zones and news that move the oil price layered on top.",
    problem:
      "AIS doesn't tell you what a ship is and where it is in the same message. Position reports arrive continuously and carry no vessel type; the static data identifying a ship as a tanker arrives separately and irregularly. So filtering a global feed down to oil tankers means you've already drawn a vessel on the map by the time you learn it's a car ferry — and the raw feed is far more traffic than a browser can turn into map updates anyway.",
    approach:
      "Held the identity problem on the server. A Next.js route opens the WebSocket to aisstream.io and bridges it to the browser as Server-Sent Events, which keeps the API key off the client and gives somewhere stateful to reconcile the two message types. The server maintains an MMSI-keyed cache of static data, enriches each position report as it passes through, and — when static data proves a vessel isn't a tanker — emits an explicit remove message so the client can retract something it has already rendered. The cache is capped at 10,000 vessels with oldest-first eviction so a long-running stream can't grow without bound. On the client, incoming positions buffer into a Map and flush to the Mapbox GeoJSON source every five seconds rather than per message, with static fields preserved across merges so a sparse update doesn't blank a vessel's destination. Mapbox clusters below zoom 6, and the dashboard is dynamically imported with SSR off to keep the map library out of first paint.",
    outcome:
      "Runs against five live data sources at once — AIS positions, Mapbox tiles, ACLED conflict events, oil prices and news feeds — with tankers updating on the map every five seconds and chokepoint traffic counted from live vessel positions. The cache intervals weren't a design preference but a constraint: free tiers of 800 and 100 requests a day set prices to five minutes, news to ten, and conflict data to an hour. The outstanding work is hosting — the AIS bridge holds a long-lived stream, which doesn't fit inside a serverless function's execution limit, so that one route needs an always-on host.",
    tags: ["Next.js", "TypeScript", "Mapbox GL JS", "WebSockets", "Server-Sent Events", "Real-Time Systems", "Data Visualisation"],
    image: "/projects/crude-flow.jpg",
    imageAlt:
      "Dark command-centre dashboard: a world map with clustered tanker markers and highlighted conflict zones, an oil price ticker across the top, a scrolling maritime intel feed on the right, and a chokepoint status strip along the bottom.",
    links: { repo: repoUrl("crude-flow") },
    featured: true,
    order: 1,
  },
  {
    slug: "3d-printing-prototyping",
    title: "3D Printer",
    category: "Design & Fabrication",
    date: "TODO(copy): when this was built",
    hook: "An Ender 3 V2 taken apart subsystem by subsystem — auto bed levelling, a printed extruder housing, recompiled firmware, and remote control from a Raspberry Pi.",
    problem:
      "A stock consumer printer fails in predictable places: the bed is trammed by hand before every print, the extruder skips on long jobs, and once you leave the room you have no idea whether it is still printing. Each is a separate limitation, and the fixes interact — hardware the firmware doesn't know about is just hardware that doesn't work.",
    approach:
      "Treated each limitation as its own subsystem rather than replacing the machine. A BLTouch probe mounted and wired into the control board, the firmware configuration modified to enable it, then probe offsets calibrated and a bed mesh generated. A custom extruder housing designed and printed, with upgraded hotend and part cooling and a better nozzle, and the stock extruder assembly swapped out with tension and alignment set for consistent feeding. Firmware recompiled and flashed to match the upgraded hardware. OctoPrint on a Raspberry Pi 3B+ connected over USB, with a camera module for live monitoring.",
    outcome:
      "Running as a customised machine: first-layer accuracy good enough to drop the manual levelling step, extrusion consistent across material types on long prints, and full control and a live view from any device on the network. Begun at 15 and iterated on since. The honest limitation is that none of it was measured — the outcomes are observed reliability across repeated prints rather than numbers.",
    tags: ["3D Printing", "CAD", "Firmware", "Raspberry Pi", "OctoPrint", "Calibration"],
    image: "/projects/3d-printing.jpg",
    imageAlt:
      "A desktop 3D printer on a workbench, mid-setup: filament spool on the left, LED light bar across the top of the frame, touchscreen controller on the right, and scrapers and printed parts around the base.",
    heroImage: "/projects/3d-printing.jpg",
    links: {},
    featured: true,
    order: 4,
  },
  {
    slug: "missile-trajectory-tracker",
    title: "Missile Trajectory Tracker",
    category: "Simulation & Control",
    date: "February 2026",
    hook: "A ground-to-air intercept simulation: a proportional-navigation missile chases an aircraft that fights back, plotted in a 3-D space you can orbit.",
    problem:
      "Pointing a missile at where an aircraft currently is doesn't intercept it. By the time you arrive the target has moved, and against anything manoeuvring a pure-pursuit missile ends up in a tail chase it can't win. Interception means steering toward where the target is going to be — using only what a seeker can actually measure, which is the bearing to the target and the rate at which that bearing is changing.",
    approach:
      "Implemented proportional navigation, the guidance law real interceptors use: acceleration command = N × closing velocity × line-of-sight rate, with a navigation constant of 4. The insight it encodes is that if the bearing to your target isn't rotating, you're already on a collision course — so the missile steers to drive the line-of-sight rate to zero, which produces lead pursuit instead of a tail chase. The missile flies against real dynamics rather than in a vacuum: thrust along its own velocity vector, gravity, quadratic drag, a turn-rate limit and a hard speed cap, so the guidance has to cope with a vehicle that doesn't do exactly what it's told. The 3-D view is hand-rolled rather than imported — spherical camera position, forward/right/up basis vectors, perspective divide — which kept the whole simulation to a single dependency.",
    outcome:
      "Built in one night; first commit at midnight, last at 01:29. The final commit is the one worth pointing at: once interception worked reliably, the target got a threat model. The aircraft computes a continuous 0-to-1 threat level from missile range and scales its whole response against it — turn rate from 1.2 to 3.0 rad/s, pitch authority from 15° to 50°, a speed boost, shorter intervals between manoeuvres, and hard break-turns perpendicular to the threat bearing. Making the problem harder once the easy version worked turned out to be more interesting than tuning the guidance further. Around 990 lines of Python, one dependency.",
    tags: ["Python", "Pygame", "Proportional Navigation", "Guidance & Control", "Flight Dynamics", "3D Rendering", "Physics Simulation"],
    image: "/projects/missile-trajectory.jpg",
    imageAlt:
      "Ground-to-air intercept simulation: several coloured missile trails curving through a 3-D graph space with labelled range, lateral and altitude axes, converging on amber intercept bursts around a red aircraft icon, beside a telemetry panel listing fleet status, hits and camera angles.",
    links: { repo: repoUrl("missile-trajectory-tracker") },
    featured: true,
    order: 2,
  },
  {
    slug: "honda-civic-projects",
    title: "Honda Civic Engineering Projects",
    category: "Automotive & Mechanical",
    date: "TODO(copy): when this was built",
    hook: "Diagnosing and repairing a 2006 Civic end to end — an intermittent no-start traced to the fuel pump, plus a head unit and amplifier wired in from the battery.",
    problem:
      "An intermittent starting fault hands you one symptom and a list of candidate causes — battery, ignition, relays, fuel delivery — and swapping parts until it stops is expensive and teaches you nothing about the car. The audio install had the opposite failure mode: the components matter far less than the power and ground paths, and getting those wrong puts engine noise through the speakers.",
    approach:
      "Worked the no-start by elimination rather than replacement — ruled out battery, ignition and relay causes by testing each in turn, narrowed the fault to fuel delivery, then accessed and replaced the pump assembly. For the audio, mapped the factory harness against the new head unit before connecting anything, ran a dedicated fused power cable from the battery, chose a ground point specifically to keep noise out of the signal path, and set amplifier gain to avoid clipping rather than for volume.",
    outcome:
      "Starting reliability restored, and the audio system runs with no interference or power issues. Carbon deposits cleaned from the throttle body improved throttle response as a separate job. The transferable part is the method rather than the parts — a subsystem model and elimination, on a car where nothing is instrumented and the only feedback is whether it starts.",
    tags: ["Automotive Systems", "Fault Diagnosis", "Automotive Electrics", "Mechanical Repair"],
    image: "/projects/honda-civic.jpg",
    imageAlt:
      "The open engine bay of the Honda Civic, showing the intake manifold, wiring looms and hoses, and a battery with newly fitted red and black terminal leads.",
    heroImage: "/projects/honda/hero.jpg",
    links: {},
    featured: true,
    order: 6,
  },
  {
    slug: "friendly",
    title: "Friendly",
    category: "Software & Web",
    date: "Feb–Mar 2026",
    hook: "Works out when a group of friends is actually free, then gets them to the same place — availability matching, group chat and live location in one app.",
    problem:
      "Organising anything with a group dies in the group chat. Everyone's availability lives in their own head, the thread scrolls past whatever was agreed, and it takes twenty messages before someone gives up. There are really two problems stacked on each other: finding overlapping free time across a group, and then getting everyone to converge on one place — and neither is something a chat thread is any good at.",
    approach:
      "Four of us built it over about a month, working together on one machine, which shaped the architecture as much as any technical decision did. The system was split into four areas — auth and infrastructure, groups and chat, availability and the recommendation engine, map and UI — with a shared types file nobody overwrites and a written onboarding guide so whoever sat down next could pick up where the last person stopped. Firebase Firestore does the real-time work: anonymous auth so there's no signup friction, and onSnapshot listeners so chat, member locations and proposed sessions stay in sync across every client with no backend to run. The recommendation engine takes each member's weekly availability blocks and returns slots ranked by how many people are free, so the app proposes times rather than asking the group to negotiate them.",
    outcome:
      "A working prototype covering the whole loop: anonymous sign-in, creating and joining groups by invite code, realtime group and direct chat, a friends system, weekly availability blocks, ranked meetup suggestions, and live location sharing on a map via the browser's geolocation API. Around 2,900 lines across 19 components and modules. The harder problem turned out to be organisational rather than technical — four people building one codebase on one laptop only works if the division of labour and the shared interfaces are agreed before anyone starts typing.",
    tags: ["Team Project", "Next.js", "TypeScript", "Firebase", "Firestore", "Real-Time Sync", "Geolocation"],
    image: "/projects/friendly.jpg",
    imageAlt:
      "Friendly app interface showing a group page with member availability, ranked meetup time suggestions, and a map with live member locations.",
    links: { repo: repoUrl("friendly", "AdamAzeb") },
    featured: true,
    order: 5,
  },
  {
    slug: "storm-formation-analysis",
    title: "Storm Formation Analysis Tool",
    category: "Software & Data",
    date: "July 2025",
    hook: "Pulls satellite imagery and live weather data together to look for the conditions that precede a storm.",
    problem:
      "Storm formation shows up in two kinds of data that don't naturally line up: what the cloud field looks like from above, and what temperature, pressure and humidity are doing underneath it. Neither on its own says much, and they arrive in different formats from different providers.",
    approach:
      "Built a Python pipeline that ingests both and treats them as one dataset — satellite imagery for cloud-formation features, the OpenWeatherMap API for the numerical environmental picture — with feature extraction over the imagery aimed at spotting cumulonimbus development early. Kept the stages modular so a model could be dropped in later, rather than building prediction in from the start.",
    outcome:
      "An ingestion and analysis pipeline rather than a finished predictor. It reads both sources and extracts features, but there is no trained model behind it and no alerting, so it surfaces patterns rather than forecasting from them. The honest limitation is that the machine-learning step the pipeline was shaped around was never added.",
    tags: ["Python", "Weather APIs", "Data Analysis", "Computer Vision"],
    image: "/projects/storm-analysis.jpg",
    imageAlt:
      "A weather radar composite of a large spiral storm system over the Gulf coast, rainfall intensity shaded from blue through green and yellow to red around the eye, with city names marked.",
    links: { repo: repoUrl("stormwatch-ai") },
    featured: false,
    order: 7,
  },
  {
    slug: "portfolio-website",
    title: "Engineering Portfolio Website",
    category: "Software & Web",
    date: "February 2026 – ongoing",
    hook: "The site you're reading: an engineering portfolio built as its own worked example rather than assembled from a template.",
    problem:
      "A portfolio has to be memorable enough that someone remembers whose it was, and plain enough that it never gets in the way of the projects. Templates give up the first to guarantee the second.",
    approach:
      "Built the visual language out of the subject matter instead of decorating a template: a Solari split-flap board that flips the name into place, a Göttingen 386 airfoil with skill labels riding animated streamlines, project cards drawn as breadboards with jumper-wire tags, all on a graph-paper ground. Next.js App Router with TypeScript and Tailwind, Framer Motion for entrance and scroll animation, and the airfoil rendered as plain SVG with its streamlines computed in JavaScript rather than dropping to canvas.",
    outcome:
      "Live, and the front door for internship applications. It has since been through a correctness pass that mattered more than the visuals: project cards that only revealed their imagery and links on hover — invisible on a phone — now show both without hovering, unoptimised photographs that accounted for most of the page weight were routed through the image pipeline, and missing heading structure and reduced-motion support were added. Several project write-ups are still being written.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "SVG Animation", "Vercel"],
    image: "/projects/portfolio-website.jpg",
    imageAlt:
      "This portfolio's home page: the split-flap board spelling MAKSYMILIAN DUBOWSKI above BENG AEROSPACE ENGINEERING, on a pale graph-paper background.",
    links: { repo: repoUrl("Portfolio-Website") },
    featured: false,
    order: 8,
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
