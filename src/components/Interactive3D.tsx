"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// Göttingen 386 airfoil — real coordinate data (x/c, y/c)
// Scaled to SVG: chord = 550px, LE at x=325, TE at x=875, centerline y=275
// ---------------------------------------------------------------------------
const UPPER_COORDS: [number, number][] = [
  [0, 0], [0.0050, 0.0185], [0.0125, 0.0310], [0.025, 0.0430],
  [0.0375, 0.0520], [0.05, 0.0595], [0.075, 0.0710], [0.1, 0.0800],
  [0.125, 0.0870], [0.15, 0.0935], [0.175, 0.0980], [0.2, 0.1020],
  [0.25, 0.1068], [0.3, 0.1080], [0.35, 0.1065], [0.4, 0.1040],
  [0.45, 0.0990], [0.5, 0.0935], [0.55, 0.0862], [0.6, 0.0780],
  [0.65, 0.0685], [0.7, 0.0585], [0.75, 0.0482], [0.8, 0.0378],
  [0.85, 0.0278], [0.9, 0.0175], [0.95, 0.0082], [1, 0],
];

const LOWER_COORDS: [number, number][] = [
  [0, 0], [0.0050, -0.0120], [0.0125, -0.0175], [0.025, -0.0235],
  [0.0375, -0.0275], [0.05, -0.0305], [0.075, -0.0340], [0.1, -0.0355],
  [0.125, -0.0360], [0.15, -0.0360], [0.175, -0.0354], [0.2, -0.0345],
  [0.25, -0.0322], [0.3, -0.0292], [0.35, -0.0260], [0.4, -0.0228],
  [0.45, -0.0198], [0.5, -0.0168], [0.55, -0.0140], [0.6, -0.0115],
  [0.65, -0.0092], [0.7, -0.0070], [0.75, -0.0052], [0.8, -0.0038],
  [0.85, -0.0025], [0.9, -0.0014], [0.95, -0.0005], [1, 0],
];

const CHORD = 550;
const LE_X = 325;
const CENTER_Y = 275;

function toSVG(xc: number, yc: number): [number, number] {
  return [
    Math.round((LE_X + xc * CHORD) * 10) / 10,
    Math.round((CENTER_Y - yc * CHORD) * 10) / 10,
  ];
}

// Catmull-Rom → cubic bezier conversion for smooth curves through data points
function smoothPath(points: [number, number][]): string {
  if (points.length < 2) return "";
  const r = (v: number) => Math.round(v * 10) / 10;
  const parts: string[] = [`M ${points[0][0]} ${points[0][1]}`];

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    const cp1x = r(p1[0] + (p2[0] - p0[0]) / 6);
    const cp1y = r(p1[1] + (p2[1] - p0[1]) / 6);
    const cp2x = r(p2[0] - (p3[0] - p1[0]) / 6);
    const cp2y = r(p2[1] - (p3[1] - p1[1]) / 6);

    parts.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`);
  }
  return parts.join(" ");
}

// Build airfoil path: upper surface TE→LE then lower surface LE→TE
const upperSVG = UPPER_COORDS.map(([x, y]) => toSVG(x, y));
const lowerSVG = LOWER_COORDS.map(([x, y]) => toSVG(x, y));
const airfoilPoints: [number, number][] = [
  ...upperSVG.slice().reverse(), // TE → LE along upper surface
  ...lowerSVG.slice(1),          // LE → TE along lower surface (skip dup LE)
];
const AIRFOIL = smoothPath(airfoilPoints) + " Z";

// ---------------------------------------------------------------------------
// Streamline generation — computed from airfoil data
// ---------------------------------------------------------------------------

// Linearly interpolate airfoil surface y/c at a given x/c
function lerpSurface(xc: number, coords: [number, number][]): number {
  if (xc <= coords[0][0]) return coords[0][1];
  if (xc >= coords[coords.length - 1][0]) return coords[coords.length - 1][1];
  for (let i = 0; i < coords.length - 1; i++) {
    if (xc <= coords[i + 1][0]) {
      const t = (xc - coords[i][0]) / (coords[i + 1][0] - coords[i][0]);
      return coords[i][1] + t * (coords[i + 1][1] - coords[i][1]);
    }
  }
  return 0;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// Generate a streamline SVG path from freestream y-position
function makeStreamline(freeY: number, side: "upper" | "lower"): string {
  const dist = Math.abs(freeY - CENTER_Y);
  // Gap from surface: closer streamlines hug tighter, far ones stay loose
  const gap = dist * 0.9 + 8;

  const coords = side === "upper" ? UPPER_COORDS : LOWER_COORDS;
  const numPoints = 45;
  const points: [number, number][] = [];

  for (let i = 0; i <= numPoints; i++) {
    const x = -80 + (i / numPoints) * 1430; // -80 to 1350
    const xc = (x - LE_X) / CHORD;

    // Influence: gradual onset upstream, faster convergence downstream
    let influence = 0;
    if (xc >= -0.8 && xc <= 1.2) {
      if (xc < 0) {
        const t = smoothstep(-0.8, 0, xc);
        influence = t * t; // squared for gentler onset
      } else if (xc > 1) {
        // Sharp convergence right after trailing edge
        influence = 1 - smoothstep(1, 1.2, xc);
      } else {
        influence = 1;
      }
    }

    let y = freeY;
    if (influence > 0) {
      const clamped = Math.max(0, Math.min(1, xc));
      const surfaceYc = lerpSurface(clamped, coords);
      const surfaceY = CENTER_Y - surfaceYc * CHORD;

      const targetY =
        side === "upper" ? surfaceY - gap : surfaceY + gap;

      y = freeY + (targetY - freeY) * influence;
    }

    points.push([
      Math.round(x * 10) / 10,
      Math.round(y * 10) / 10,
    ]);
  }

  return smoothPath(points);
}

// ---------------------------------------------------------------------------
// Streamline definitions — freestream y spread across full section height
// ViewBox: 0–550. Upper 5 lines: y=55–255. Lower 5 lines: y=295–495.
// ~50px gaps between each entry point on the left edge.
// ---------------------------------------------------------------------------
interface StreamlineDef {
  freeY: number;
  side: "upper" | "lower";
  skill: string;
  duration: number;
  offset: number;
}

const STREAMLINE_DEFS: StreamlineDef[] = [
  // Upper — tighter spacing, all within ~100px above centerline
  { freeY: 260, side: "upper", skill: "Python",               duration: 9000,  offset: 0 },
  { freeY: 240, side: "upper", skill: "Arduino",              duration: 10000, offset: 2000 },
  { freeY: 220, side: "upper", skill: "Embedded Systems",     duration: 11000, offset: 4500 },
  { freeY: 200, side: "upper", skill: "Computer Vision",      duration: 10500, offset: 7000 },
  { freeY: 180, side: "upper", skill: "C++",                  duration: 12000, offset: 1500 },
  // Lower — tighter spacing, all within ~100px below centerline
  { freeY: 290, side: "lower", skill: "3D Printing",          duration: 9500,  offset: 3000 },
  { freeY: 310, side: "lower", skill: "Mechanical Prototyping", duration: 11000, offset: 5500 },
  { freeY: 330, side: "lower", skill: "Data Analysis",        duration: 10000, offset: 8000 },
  { freeY: 350, side: "lower", skill: "Engineering Simulation", duration: 11500, offset: 6000 },
  { freeY: 370, side: "lower", skill: "GitHub",               duration: 12000, offset: 9500 },
];

// Pre-compute all streamline SVG paths from airfoil data
const STREAMLINES = STREAMLINE_DEFS.map((s) => ({
  ...s,
  path: makeStreamline(s.freeY, s.side),
}));

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
// Streamlines are generated from x=-80 to x=1350, which overhangs the
// 0–1200 viewBox at both ends. A label anchored out there is clipped by the
// SVG viewport — "Mechanical Prototyping" rendered as "…thanical Prototyping".
// Fade each label on its x position, allowing for its own half-width, so it is
// never visible while any part of it sits outside the viewBox.
const VIEW_W = 1200;
const EDGE_PAD = 6;
const FADE_SPAN = 45;
const LABEL_FONT_SIZE = 13;

// getBBox() cannot be trusted on first paint: until hydration moves the section
// out of React's hidden streaming container — or until webfonts settle — it
// reports 0, which would leave the widest label unprotected and reintroduce the
// clipping. Start from a character-count estimate that needs no layout, then
// adopt the real measurement once the element is actually laid out.
// 0.30 em/char deliberately overshoots Inter's real average advance, so the
// transient estimate fades a label slightly early rather than clipping it.
const estimateHalfWidth = (skill: string) => skill.length * LABEL_FONT_SIZE * 0.3;

function StreamlineSkills() {
  const svgRef = useRef<SVGSVGElement>(null);
  const textRefs = useRef<(SVGTextElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const halfWidths = useRef<number[]>(
    STREAMLINES.map((s) => estimateHalfWidth(s.skill))
  );
  const measured = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    // Retry cheaply until the labels are laid out, then stop asking.
    const tryMeasure = () => {
      let all = true;
      for (let i = 0; i < textRefs.current.length; i++) {
        const el = textRefs.current[i];
        let w = 0;
        try {
          w = el ? el.getBBox().width : 0;
        } catch {
          w = 0;
        }
        if (w > 0) halfWidths.current[i] = w / 2;
        else all = false;
      }
      if (all) measured.current = true;
    };

    const animate = (now: number) => {
      const elapsed = now - start;

      if (!measured.current && frame % 30 === 0) tryMeasure();
      frame++;

      for (let i = 0; i < STREAMLINES.length; i++) {
        const s = STREAMLINES[i];
        const textEl = textRefs.current[i];
        const pathEl = pathRefs.current[i];
        if (!textEl || !pathEl) continue;

        const totalLen = pathEl.getTotalLength();
        const t = ((elapsed + s.offset) % s.duration) / s.duration;
        const len = t * totalLen;

        const pt = pathEl.getPointAtLength(len);
        const pt2 = pathEl.getPointAtLength(Math.min(len + 2, totalLen));
        const angle =
          Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI);

        textEl.setAttribute(
          "transform",
          `translate(${pt.x},${pt.y}) rotate(${angle})`
        );

        // Fade in/out against the viewBox edges, not the path ends
        const half = halfWidths.current[i] ?? 0;
        const minX = half + EDGE_PAD;
        const maxX = VIEW_W - half - EDGE_PAD;
        const opacity =
          pt.x <= minX || pt.x >= maxX
            ? 0
            : Math.max(
                0,
                Math.min(1, (pt.x - minX) / FADE_SPAN, (maxX - pt.x) / FADE_SPAN)
              );
        textEl.setAttribute("opacity", String(opacity));
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1200 550"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Streamline paths — thin dashed lines */}
      {STREAMLINES.map((s, i) => (
        <path
          key={`line-${i}`}
          ref={(el) => { pathRefs.current[i] = el; }}
          d={s.path}
          fill="none"
          stroke="#b0a898"
          strokeWidth="0.7"
          strokeDasharray="5 8"
          opacity="0.3"
        />
      ))}

      {/* Airfoil shape */}
      <path
        d={AIRFOIL}
        fill="#e8e4de"
        stroke="#999"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Skill labels — animated along paths */}
      {STREAMLINES.map((s, i) => (
        <text
          key={`text-${i}`}
          ref={(el) => { textRefs.current[i] = el; }}
          fontSize={LABEL_FONT_SIZE}
          fill="#6b6358"
          fontFamily="var(--font-sans, system-ui, sans-serif)"
          textAnchor="middle"
          dominantBaseline="middle"
          opacity="0"
          style={{ willChange: "transform, opacity" }}
        >
          {s.skill}
        </text>
      ))}
    </svg>
  );
}

export default function Interactive3D() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface-alt/30 to-background pointer-events-none" />
      <div className="relative z-10 px-6 max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.25em] uppercase text-muted mb-6 font-mono">
          // SKILLS
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-foreground mb-3">
          Engineering <span className="text-accent">Stack.</span>
        </h2>
      </div>
      <div className="relative z-10 w-full px-6 max-w-6xl mx-auto" style={{ height: "550px" }}>
        <StreamlineSkills />
      </div>
    </section>
  );
}
