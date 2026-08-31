#!/usr/bin/env node
/**
 * Fails loudly if project copy placeholders would ship.
 *
 * Runs as part of `npm run build`, so a placeholder can never reach a
 * production bundle unnoticed. Warns by default; pass --strict (or set
 * CHECK_COPY_STRICT=1) to exit non-zero, which is what a deploy pipeline
 * should do once the copy has landed.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "src/data/projects.ts"), "utf8");

// Assembled from parts so this checker is not itself a grep hit.
const MARKER = "TODO" + "(copy):";
const strict = process.argv.includes("--strict") || process.env.CHECK_COPY_STRICT === "1";

// Walk the entries by slug so the report says which project needs what.
const entries = [];
const slugRe = /^\s{4}slug:\s*"([^"]+)"/gm;
const slugPositions = [...source.matchAll(slugRe)].map((m) => ({
  slug: m[1],
  index: m.index,
}));

for (let i = 0; i < slugPositions.length; i++) {
  const start = slugPositions[i].index;
  const end = i + 1 < slugPositions.length ? slugPositions[i + 1].index : source.length;
  const block = source.slice(start, end);
  const fields = [...block.matchAll(/^\s{4}(\w+):\s*"TODO\(copy\):/gm)].map((m) => m[1]);
  if (fields.length) entries.push({ slug: slugPositions[i].slug, fields });
}

const total = entries.reduce((n, e) => n + e.fields.length, 0);

if (total === 0) {
  console.log(`✓ check-copy: no ${MARKER} placeholders in project data.`);
  process.exit(0);
}

const lines = [
  "",
  `${strict ? "✗" : "⚠"}  check-copy: ${total} field${total === 1 ? "" : "s"} across ${entries.length} project${entries.length === 1 ? "" : "s"} still hold ${MARKER} placeholders.`,
  "",
  ...entries.map((e) => `     ${e.slug.padEnd(28)} ${e.fields.join(", ")}`),
  "",
  "   These render as visible gaps on the site. Replace them in",
  "   src/data/projects.ts before deploying, or run with --strict to fail.",
  "",
];
console.error(lines.join("\n"));

process.exit(strict ? 1 : 0);
