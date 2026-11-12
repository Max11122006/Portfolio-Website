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
// Streamline entry points above and below the airfoil.
// ---------------------------------------------------------------------------

const STREAMLINES = [
  ...[260, 220, 180, 140, 100].map((y) => makeStreamline(y, "upper")),
  ...[290, 330, 370, 410, 450].map((y) => makeStreamline(y, "lower")),
];

export default function Airfoil() {
  return (
    <figure className="schematic-grid overflow-hidden rounded-xl border border-border bg-background">
      <svg
        aria-hidden="true"
        viewBox="0 65 1200 420"
        className="block w-full"
      >
        {STREAMLINES.map((path) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke="#b1987e"
            strokeWidth="1.6"
            strokeDasharray="7 8"
            vectorEffect="non-scaling-stroke"
            opacity="0.56"
          />
        ))}
        <path
          d={AIRFOIL}
          fill="#e8e4de"
          stroke="#785d43"
          strokeWidth="1.5"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <figcaption className="border-t border-border bg-background px-4 py-3 font-mono text-xs text-muted">
        Göttingen 386 airfoil · illustrative streamlines
      </figcaption>
    </figure>
  );
}
