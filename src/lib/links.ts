/**
 * Single source of truth for external links.
 *
 * The footer and header had drifted apart — the footer pointed at the bare
 * linkedin.com and github.com homepages while the header had the real
 * profiles. Every component imports from here so that can't happen again.
 * There should be no literal LinkedIn / GitHub / mailto URLs in components.
 */

export const GITHUB_USER = "Max11122006";

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/maksymilian-dubowski/",
  github: `https://github.com/${GITHUB_USER}`,
  email: "mailto:maxdubowski1112@gmail.com",
} as const;

/** Build a repo URL from its name, so the account handle lives in exactly one place. */
export const repoUrl = (name: string) => `https://github.com/${GITHUB_USER}/${name}`;

/** CV served from public/. `downloadName` keeps it out of a downloads folder as "cv.pdf". */
export const CV = {
  href: "/cv.pdf",
  downloadName: "Maksymilian-Dubowski-CV.pdf",
} as const;
