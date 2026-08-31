# 05 — Project data model

**Finding F03 · High · Structure only — no copy**

---

## Read this first

The project descriptions are being rewritten in a separate conversation, and new projects are being added. **This task builds the container, not the contents.**

Your job here is to reshape the data model and the components that render it, migrate the existing entries into the new shape, and leave clearly marked gaps where new copy will drop in. Do not write, improve, paraphrase, or "temporarily" fill any project prose. A visible `TODO(copy):` is a correct outcome; an invented sentence is not.

---

## Why the shape is changing

Every current description is a definition of the topic rather than an account of the work:

> "Physics-based simulation tool for modelling projectile motion and flight trajectories. Implements kinematic equations with adjustable parameters and real-time visualisation…"

A reader finishes that knowing what the words mean, but not what was built, what was hard, or whether it worked. There are no dates, no scale, no outcomes, and no visible decisions.

The replacement copy is written to four fixed beats, so the data model needs a field for each:

| Beat | What it holds |
|---|---|
| `hook` | One line. What the thing does for someone. No jargon. |
| `problem` | The actual obstacle — not the topic. |
| `approach` | The decision made, and what was rejected. |
| `outcome` | A number, a state, or an honest limitation. |

---

## Locate it

```bash
grep -rn "Missile Trajectory Tracker" --include=*.ts --include=*.tsx .
```

That should lead to wherever project data currently lives — an array, a JSON file, or MDX. Keep whatever format is already in use; only the shape changes.

---

## Target schema

```ts
export type Project = {
  slug: string;              // "crude-flow" — stable, used for keys and anchors
  title: string;             // "Crude Flow" (drop the trailing "— Subtitle" pattern)
  category: string;          // existing eyebrow, e.g. "SOFTWARE & DATA"
  date: string;              // NEW — "Spring 2026". Display as-is, don't parse.

  hook: string;              // NEW — one sentence
  problem: string;           // NEW
  approach: string;          // NEW
  outcome: string;           // NEW

  tags: string[];            // existing coloured pills — unchanged
  image: string;             // existing
  imageAlt: string;          // NEW — real alt text, required

  links: {
    demo?: string;
    repo?: string;
  };

  featured: boolean;         // NEW — true = homepage "Selected Projects"
  order: number;             // NEW — explicit sort, lowest first
};
```

Drop the old flat `description` field **only after** every entry has been migrated. During migration, keep both and render the new fields when present.

### Placeholder convention

```ts
hook: "TODO(copy): one-line hook",
problem: "TODO(copy): what was actually hard",
```

Add a guard so placeholders can't ship silently — a build-time check, a lint rule, or at minimum a dev-only console warning listing any project with a `TODO(copy):` field.

---

## Where each beat renders

Don't put all four beats on the card — it becomes a wall of text and the grid breaks. Split them:

**Project card (homepage + workshop):**
- category · date
- title
- `hook`
- tags
- links

**Workshop page `/personal-projects`, expanded entry:**
- everything above, plus `problem`, `approach`, `outcome` as labelled paragraphs

This gives the Workshop page a reason to exist. Right now it's the same cards in a longer list; after this it's where the depth lives.

A per-project detail page would be better still, but it's out of scope here — don't build one.

---

## Migration: the current entries

Eight projects exist today. Six are on the homepage, all eight on `/personal-projects`:

| Project | Currently featured | Should be featured |
|---|---|---|
| Missile Trajectory Tracker | yes | yes |
| 3D Printer | yes | yes |
| Honda Civic Engineering Projects | yes | yes |
| Crude Flow | yes | **yes — move to position 1 or 2** |
| Friendly | yes | yes |
| Engineering Portfolio Website | yes | **no — demote to workshop** |
| Storm Formation Analysis Tool | no | no |
| Beam Deflection Measurement Rig | no | **yes — promote to homepage** |

### Two deliberate swaps

**Promote the Beam Deflection Measurement Rig.** Custom-built instrumented rig, measured deflection correlated against analytical models — it's the most complete hardware-plus-software story on the site, and it's buried behind a nav link most visitors never click. Since the applications target aerospace and software roles roughly equally, that pairing is the whole pitch.

**Demote the Portfolio Website.** It's the weakest of the six: the reader is already looking at it.

Set `order` so the homepage leads with two projects that show hardware and software together, rather than clustering all the software work at one end.

> **Blocked on Max** — new projects are being added and copy is being written. Migrate the eight above into the new shape with `TODO(copy):` placeholders, and make sure adding a ninth entry is a matter of appending one object plus an image.

---

## Do not

- Write, rewrite, or improve any project prose
- Invent dates. If a project's date is unknown, `TODO(copy):` it like anything else
- Change the coloured tag pills, the dashed card outline, or the category eyebrow styling
- Build a per-project detail route
- Rename the existing category strings

---

## Acceptance criteria

- [ ] All eight projects migrated to the new schema, no entry missing a field
- [ ] `featured` and `order` drive both the homepage six and the workshop list — no hardcoded arrays
- [ ] Beam Deflection Rig appears on the homepage; Portfolio Website does not
- [ ] Every card renders `date` and `hook`
- [ ] Workshop entries render `problem`, `approach`, `outcome` with visible labels
- [ ] `grep -rn "TODO(copy)" .` lists exactly the fields awaiting copy, nothing else
- [ ] A placeholder cannot reach production without a warning
- [ ] Adding a new project requires touching one data file and adding one image
- [ ] Every `imageAlt` is real descriptive text
