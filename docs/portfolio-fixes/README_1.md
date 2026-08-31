# Portfolio site — work queue

Fix list for **maxdubowski.com** (Next.js + TypeScript + Tailwind), derived from a front-end and content inspection of the deployed site on 31 Aug 2026.

Work through the numbered files in order. `01` and `02` are the items actually costing applications. `05` is scaffolding for copy that is being written separately — read its ground rules before touching anything in the projects section.

---

## Context

- Personal portfolio, used for **engineering internship applications**.
- Audience is split roughly evenly between **aerospace/mechanical** and **software/data** employers. The hardware-plus-software combination is the differentiator — neither side should end up buried.
- A large share of first visits are on a phone. Mobile is not the fallback case here; it's the common case.

---

## Ground rules

1. **Do not redesign.** The split-flap hero, the airfoil skills diagram, the graph-paper ground, the type and colour choices are deliberate and are staying. Every task in this queue is a fix *inside* the existing design language, not a replacement for it.

2. **Do not write or edit project prose.** Descriptions, hooks and outcomes are being rewritten in a separate conversation. Where a task needs copy that doesn't exist yet, use the `TODO(copy):` convention from `05-project-data-model.md` and leave it alone.

3. **Do not invent facts.** No fabricated metrics, dates, outcomes, or project details anywhere — not even as plausible-looking placeholder text. A visible `TODO(copy):` is correct; an invented number is not.

4. **Hover is not the enemy.** The problem in `01` is hover being the *only* route to content, not hover existing. Keep the motion; add a non-hover path to the same information.

5. **Match existing conventions.** Tailwind utilities, existing component patterns, existing colour/token names. Don't introduce a second styling approach, a component library, or a state manager.

6. **One task file per commit or PR**, so anything can be reverted independently.

---

## Locating things

This inspection was done against the **deployed site**, not the repo, so tasks reference searchable strings rather than file paths. Each task lists exactly what to grep for. Confirm the match before editing — if a string appears in more than one place, fix all of them.

Confirmed about the build from the live page:

- Next.js with `next/image` in use (project images route through `/_next/image`, About images do not)
- Tailwind utility classes throughout
- Scroll-reveal animation driven by inline `style="opacity:0;transform:translateY(40px)"`
- 138 CSS rules total, none of them a `prefers-reduced-motion` query
- Routes: `/`, `/personal-projects` (titled "The Workshop"), `/github`

---

## Order of work

| # | File | Findings | Rough effort |
|---|------|----------|--------------|
| 01 | `01-mobile-project-cards.md` | F01 | Half a day |
| 02 | `02-cv-links-contact.md` | F02, F05, F08, F12 | An hour |
| 03 | `03-performance-and-layout.md` | F04, F11 | An hour |
| 04 | `04-seo-and-accessibility.md` | F06, F07, F09, F10 | Two hours |
| 05 | `05-project-data-model.md` | F03 (structure only) | Half a day |

Severity from the original inspection: F01, F02 critical · F03, F04, F05 high · F06–F09 medium · F10–F12 low.

---

## Verification

Run this after each task file, not just at the end:

```bash
npm run build        # must pass clean
npm run lint         # must pass clean
```

Then check in the browser at **375×812** and **1440×900** — most of these findings only appear at one of the two widths. The mobile check matters more than the desktop one.

Before opening a PR, confirm:

- [ ] No new console errors or warnings on any route
- [ ] Nothing in the diff changes the visual design beyond what the task specified
- [ ] No invented copy anywhere — `grep -rn "TODO(copy)" .` shows only intended placeholders
- [ ] Every internal and external link in the diff has been clicked once
