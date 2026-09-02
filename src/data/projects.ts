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
 * A field still awaiting copy is an empty string, with a TODO(copy) marker in a
 * trailing comment. Comments do not survive into the production bundle, so the
 * marker can never reach the browser, while scripts/check-copy.mjs still reports
 * the gap by reading this file's text. Empty fields render as nothing at all.
 */

import { repoUrl } from "@/lib/links";

/** Supporting detail rendered as accordions below the four beats. */
export interface ProjectSection {
  heading: string;
  body: string[];
  images?: string[];
}

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

  /** Optional supporting detail for the project page, below the beats. */
  sections?: ProjectSection[];
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
    sections: [
      {
        heading: "Rig & Instrumentation",
        body: [
          "Brass beam, 240 × 20 × 2 mm, clamped as a cantilever on an aluminium extrusion frame.",
          "A servo steps the beam through five fixed deflection positions, triggered from the serial monitor.",
          "An HX711 load cell and amplifier read applied force at each stop, calibrated against a known 199 g mass to a factor of 405.8.",
          "Deflection was read by eye from a steel ruler — the one part of the loop never automated, and the one the error analysis points back at.",
        ],
      },
      {
        heading: "Method",
        body: [
          "Five runs across the full sequence, with deflections from 1.5 to 9.4 mm.",
          "Young's modulus derived per load point from E = FL³ / 3yI, with I = bh³/12 = 1.3333 × 10⁻¹¹ m⁴.",
          "Force repeatability: 5.5% spread at 1.5 mm, narrowing to 3.9% at full load.",
        ],
      },
      {
        heading: "Error Analysis",
        body: [
          "E per load point: 150.6, 135.6, 142.8, 144.8 and 144.2 GPa, for a mean of 144 GPa.",
          "The published range for brass is 102–125 GPa, so every point sits high rather than scattering around a value — a systematic offset, not noise.",
          "Since E scales with L³, effective cantilever length is the only term that shifts every point by a similar proportion; 11 to 26 mm of unaccounted clamped length spans the entire published range.",
        ],
      },
      {
        heading: "Toolchain",
        body: [
          "Arduino Uno, DSS-M15S servo, HX711 load cell and amplifier, breadboard, steel ruler.",
          "VSCode with PlatformIO; serial monitor for input and output.",
        ],
      },
    ],
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
    sections: [
      {
        heading: "System Design",
        body: [
          "Live AIS tanker tracking at global scale.",
          "Conflict zone overlays with dynamic threat levels.",
          "Maritime chokepoint monitoring.",
          "Commodity price tracking.",
          "News aggregation with severity tagging.",
        ],
      },
      {
        heading: "Technical Implementation",
        body: [
          "Next.js (App Router) with TypeScript.",
          "Mapbox GL JS with GeoJSON and GPU-accelerated symbol layers.",
          "A server-side WebSocket to aisstream.io, bridged to the browser as Server-Sent Events.",
          "Server-side API proxying so no key reaches the client.",
        ],
      },
      {
        heading: "Key Engineering Features",
        body: [
          "One upstream AIS connection held on the server and shared across clients.",
          "Vessel classification by ship type — tanker, product tanker, LNG carrier, VLCC and others.",
          "Positions buffered and flushed to the map every five seconds rather than on every message.",
          "Clustering below zoom 6 to keep thousands of simultaneous vessels renderable.",
          "API caching sized to stay inside free-tier request limits.",
        ],
      },
      {
        heading: "Challenges & Learning",
        body: [
          "Handling real-time data streams efficiently at scale.",
          "Designing a frontend architecture that stays responsive under live updates.",
          "Balancing rendering performance against rich, layered visualisation.",
        ],
      },
    ],
  },
  {
    slug: "3d-printer",
    title: "3D Printer",
    category: "Design & Fabrication",
    date: "Ongoing",
    hook: "A consumer Ender 3 rebuilt subsystem by subsystem — custom firmware, auto bed levelling, remote monitoring, and an extruder housing printed on the printer it was for.",
    problem:
      "A stock Ender 3 V2 is fine until you ask it for something specific. The bed has to be levelled by hand before anything important and still gives an inconsistent first layer; the stock extruder is a known mechanical weak point that shows up on exactly the long prints you can least afford to lose; and the machine tells you nothing until you walk back into the room and find eight hours of filament spaghetti. Three different subsystems, and fixing one keeps exposing the next.",
    approach:
      "Took each limitation as its own subsystem — identify what's actually failing, research the fix, fit it, then iterate until it holds. The upgrades chain into each other, which is the interesting part: fitting a BLTouch probe for automatic bed levelling meant the stock firmware no longer described the machine, so the next step was compiling Marlin from source with probe support and the motion settings the new hardware needed. Reliability meant replacing the extruder and designing a custom housing around it with upgraded hotend and part cooling — printed on the machine being upgraded. Monitoring meant a Raspberry Pi 3B+ running OctoPrint over USB with a camera module, so a print can be started, watched and killed from anywhere.",
    outcome:
      "Started at 15 and still running, with the printer as its own test bed. Bed meshing replaced manual levelling entirely, which is what made the first layer repeatable rather than a thing to be nursed. Extrusion held across multiple materials and long durations once the extruder and cooling were sorted. The firmware compile was the point it stopped being a consumer appliance — once you're editing configuration files to match hardware you changed yourself, nothing about the machine is a black box any more.",
    tags: ["CAD", "3D Printing", "Marlin Firmware", "Raspberry Pi", "Mechanical Design", "Prototyping", "Calibration"],
    image: "/projects/3d-printing.jpg",
    imageAlt:
      "A modified Ender 3 V2 on a workbench mid-setup: filament spool at the left, LED bar across the top of the frame, touchscreen controller at the right, scrapers and printed parts around the base.",
    heroImage: "/projects/3d-printing.jpg",
    links: {},
    featured: true,
    order: 4,
    sections: [
      {
        heading: "BLTouch Auto Bed Levelling",
        body: [
          "The problem. Manual bed levelling is a paper-under-the-nozzle ritual that has to be repeated constantly, and it still cannot correct for a bed that is not flat — only for one that is tilted. First layers stay unreliable however carefully it is done.",
          "What I did. Mounted the BLTouch probe and wired it into the control board, configured firmware support for it, calibrated the probe offsets, and generated a bed mesh so the machine compensates for the actual surface rather than assuming a plane.",
          "What changed. First-layer accuracy became repeatable instead of something to be nursed, and manual setup before a print effectively disappeared. This is also the upgrade that forced the next one — the stock firmware has no idea the probe exists.",
        ],
        images: ["/projects/3dprinter/bltouch-1.jpg"],
      },
      {
        heading: "Custom Firmware Compilation",
        body: [
          "The problem. Stock firmware describes a stock printer. Once the hardware has changed, the firmware is actively wrong about the machine it is driving — it does not know there is a probe, and the motion settings are tuned for components no longer fitted.",
          "What I did. Modified the Marlin configuration files to match the upgraded hardware, enabled BLTouch support and the advanced motion control settings the new setup needed, then compiled and flashed the result to the control board. Validated stability across multiple print sessions rather than assuming one good print meant it worked.",
          "What changed. The firmware now matches the machine. More importantly it removed the last black box — every layer from the config file to the nozzle is something I have been inside.",
        ],
        images: ["/projects/3dprinter/firmware-1.jpg"],
      },
      {
        heading: "Extruder Upgrade",
        body: [
          "The problem. The stock extruder is the printer's best-known failure point. It is the component most likely to give up partway through a long print, which is precisely when it costs the most.",
          "What I did. Removed the stock assembly, fitted upgraded components, and adjusted tension and alignment for consistent feeding. Tested extrusion across multiple materials and print lengths rather than a single short test print.",
          "What changed. Consistent extrusion across materials, and the mechanical failure risk on long prints substantially reduced.",
        ],
        images: ["/projects/3dprinter/extruder-upgrade-1.jpg", "/projects/3dprinter/extruder-upgrade-2.jpg"],
      },
      {
        heading: "Custom 3D Printed Extruder Assembly",
        body: [
          "The problem. The stock extruder mounting and cooling arrangement is built to a price. Inconsistent part cooling shows up as poor layer adhesion and overhang quality, and that cannot be fixed by adjusting slicer settings alone.",
          "What I did. Designed and printed a custom extruder housing, fitted upgraded fans for both hotend and part cooling, and replaced the stock nozzle. Aligned the assembly for consistent filament flow.",
          "What changed. Better layer consistency and more reliable extrusion. Worth noting what this step actually is: the printer produced the parts used to upgrade itself, which is only possible because the earlier calibration work made it accurate enough to make its own components.",
        ],
        images: ["/projects/3dprinter/extruder-1.jpg"],
      },
      {
        heading: "Raspberry Pi Integration — OctoPrint & Remote Monitoring",
        body: [
          "The problem. A print that fails in hour six fails silently. Without a way to see the machine you either sit with it or come back to a finished failure and a wasted spool.",
          "What I did. Installed and configured OctoPrint on a Raspberry Pi 3B+, connected over USB for direct control of the printer, and set up network access so it could be reached from any device. Added a Pi camera module for a live stream of the print in progress.",
          "What changed. Prints can be started, monitored and stopped from anywhere. A failure that would have run to completion now gets caught while there is still filament left to save.",
        ],
        images: ["/projects/3dprinter/pi-1.jpg", "/projects/3dprinter/pi-2.jpg"],
      },
    ],
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
    sections: [
      {
        heading: "Guidance",
        body: [
          "Proportional navigation: acceleration command = N × closing velocity × line-of-sight rate.",
          "Navigation constant of 4, inside the 3–5 band operational interceptors use.",
          "Closing velocity taken as −(v_rel · LOS) and floored at 50 m/s.",
          "Line-of-sight rate from a finite difference of the LOS unit vector between frames.",
        ],
      },
      {
        heading: "Missile Model",
        body: [
          "80 m/s² thrust along its own velocity vector, with a 900 m/s speed cap.",
          "2.5 rad/s turn-rate limit and quadratic drag, so the guidance drives a vehicle that does not do exactly what it is told.",
          "Terminates on a 60 m hit radius, ground impact, leaving the world volume, or a 60 s timeout.",
        ],
      },
      {
        heading: "Target Model",
        body: [
          "250 m/s cruise inside a 300–4500 m altitude band.",
          "A continuous 0-to-1 threat level computed from missile range.",
          "Evasion scales against that threat: turn rate 1.2 to 3.0 rad/s, pitch authority 15° to 50°, a speed boost, and shorter intervals between manoeuvres.",
          "Hard break-turns perpendicular to the threat bearing.",
        ],
      },
      {
        heading: "Rendering",
        body: [
          "Custom perspective projection — spherical camera position, forward/right/up basis vectors, perspective divide — with orbit and zoom over an 8000 × 4000 × 5000 m world.",
          "Written inside pygame rather than pulling in a 3-D engine. pygame>=2.5.0 is the entire dependency list.",
        ],
      },
    ],
  },
  {
    slug: "honda-civic-projects",
    title: "Honda Civic Engineering Projects",
    category: "Automotive & Mechanical",
    date: "", // TODO(copy): when this was built
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
    sections: [
      {
        heading: "Custom Head Unit Installation",
        body: [
          "Removed dashboard trim and the factory head unit without damaging clips.",
          "Identified and mapped wiring between the factory harness and the new unit.",
          "Connected power, ground and audio signal wiring, then mounted and aligned the unit.",
        ],
        images: ["/projects/honda/head-unit-1.jpg", "/projects/honda/head-unit-2.jpg"],
      },
      {
        heading: "Amplifier & Subwoofer System",
        body: [
          "Routed a dedicated power cable from the battery with inline fuse protection.",
          "Selected and prepared a solid ground point to keep electrical noise out of the signal path.",
          "Ran RCA signal cables from head unit to amplifier and set gain to avoid clipping.",
        ],
        images: ["/projects/honda/subwoofer-1.jpg"],
      },
      {
        heading: "Fuel Pump Diagnosis & Replacement",
        body: [
          "Symptoms were unreliable starting and inconsistent engine behaviour.",
          "Eliminated battery, ignition and relay causes by testing each in turn.",
          "Narrowed the fault to fuel delivery, then accessed, removed and replaced the pump assembly.",
        ],
        images: ["/projects/honda/fuel-pump-1.jpg", "/projects/honda/fuel-pump-2.jpg"],
      },
      {
        heading: "Throttle Body Cleaning & Maintenance",
        body: [
          "Removed intake components to reach the throttle body.",
          "Identified carbon deposits restricting airflow through the bore.",
          "Cleaned the throttle body and reassembled the intake.",
        ],
        images: ["/projects/honda/throttle-body-1.jpg"],
      },
    ],
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
    sections: [
      {
        heading: "Core Concept",
        body: [
          "Instead of asking who is free, Friendly calculates the answer.",
          "Aggregates availability across users and detects overlaps automatically.",
          "Suggests times ranked by how many people are free, rather than opening a negotiation.",
        ],
      },
      {
        heading: "Key Features",
        body: [
          "Instant group creation and joining by invite code.",
          "Real-time group and direct chat.",
          "Weekly availability blocks feeding the suggestion engine.",
          "Live location sharing on a map.",
          "A friends system, session planning and RSVPs.",
        ],
      },
      {
        heading: "Technical Architecture",
        body: [
          "Next.js (App Router) with TypeScript and Tailwind CSS.",
          "Firebase anonymous authentication for zero-friction onboarding.",
          "Firestore with onSnapshot listeners for live sync across clients.",
          "Fully serverless — no backend to run.",
        ],
      },
      {
        heading: "Engineering Highlights",
        body: [
          "Real-time state synchronisation across every connected user.",
          "Availability matching computed client-side for fast local results.",
          "Branch-per-developer with pull requests and a shared types file, so four people could work one codebase without standing on each other.",
        ],
      },
    ],
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
    sections: [
      {
        heading: "Approach",
        body: [
          "Satellite imagery analysis of cloud formations.",
          "Weather API integration for temperature, pressure and humidity.",
          "A visual analysis pipeline for detecting atmospheric patterns.",
          "Aimed at early identification of cumulonimbus development.",
        ],
      },
      {
        heading: "Technical Implementation",
        body: [
          "Python-based analysis system.",
          "OpenWeatherMap API integration.",
          "Satellite data ingestion and processing pipeline.",
          "Image-based feature extraction and pattern analysis.",
        ],
      },
      {
        heading: "Challenges & Learning",
        body: [
          "Working with heterogeneous external APIs and data formats.",
          "Handling and processing large satellite image datasets.",
          "Designing the pipeline in stages so a model could be added later.",
        ],
      },
    ],
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
    sections: [
      {
        heading: "Design Goals",
        body: [
          "An aerospace and electronics-inspired visual theme.",
          "Strong typographic hierarchy for technical readability.",
          "Animation that is purposeful rather than decorative.",
          "Responsive across all device sizes.",
        ],
      },
      {
        heading: "Technical Stack",
        body: [
          "Next.js 16 with App Router and TypeScript.",
          "Tailwind CSS v4 for utility-first styling.",
          "Framer Motion for scroll-driven and entrance animation.",
          "An SVG airfoil with streamlines computed in JavaScript — no canvas.",
          "Vercel deployment with Analytics and Speed Insights.",
        ],
      },
      {
        heading: "Key Features",
        body: [
          "A Solari flip-board hero that flips the name into place.",
          "A Göttingen 386 airfoil with skill labels riding animated streamlines.",
          "Project cards that show their imagery and links without hover, so they work on touch.",
          "A contact form wired through the Resend API.",
          "Reduced-motion support throughout, and images served through the Next image pipeline.",
        ],
      },
    ],
  },
  
];

const byOrder = (a: Project, b: Project) => a.order - b.order;

/** Every project, lowest `order` first — the workshop list. */
export const allProjects: Project[] = [...projects].sort(byOrder);

/** The homepage grid. Driven by `featured`, never a hardcoded slug list. */
export const selectedProjects: Project[] = allProjects.filter((p) => p.featured);
