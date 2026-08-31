# 03 — Page weight and a clipped diagram

**Findings F04 (high), F11 (low)**

---

## F04 — One photograph is 99.9% of the page weight

**High.**

The About carousel serves raw camera files straight out of `public/about/`, bypassing `next/image` entirely. The project images are handled correctly — these just missed the same treatment.

### Evidence

Measured from the Resource Timing API on a cold load of `/`:

```
Total transfer          3,796 KB
  IMG_0142.jpg          3,792 KB     ← 4032 × 3024, unoptimised
  everything else           4 KB     (JS, CSS, fonts, all cached/compressed)
```

Confirmed source URLs bypassing the image pipeline:

```
https://www.maxdubowski.com/about/IMG_1061.jpg     4032 × 3024
https://www.maxdubowski.com/about/IMG_5657.jpg
https://www.maxdubowski.com/about/IMG_0142.jpg     3,792 KB
```

Compare a project image, which is being handled properly:

```
/_next/image?url=%2Fprojects%2Fcrude-flow.jpg&w=1200&q=75
```

The About slot renders at a few hundred pixels wide. It's being sent a 12-megapixel original.

### Locate it

```bash
grep -rn "about/IMG_" --include=*.tsx --include=*.ts .
ls -la public/about/
```

### The change

1. **Resize the sources.** Longest edge 1600px, quality ~80. This alone takes the page from 3.8 MB to well under 300 KB.
2. **Route them through `next/image`** like the project images — either a static import or the `/_next/image` pipeline, whichever matches the existing project-card pattern.
3. **Add a `sizes` attribute** matching the actual rendered width, so mobile isn't served the desktop variant.
4. **Give every image real alt text.** Describe what's in the photo; don't leave it empty or generic.
5. **Lazy-load** anything below the fold. The carousel is well down the page — it shouldn't block first paint.

### Acceptance criteria

- [ ] Total page transfer on `/` is under **500 KB** on a cold load
- [ ] No image in `public/about/` exceeds 400 KB
- [ ] All About images request via `/_next/image`, verified in the Network tab
- [ ] Lighthouse mobile performance improves measurably — record before and after
- [ ] Carousel still works and still looks the same

---

## F11 — Airfoil diagram labels clip off the left edge

**Low**, cosmetic, but it's in the middle of your skills section.

At 1440×900 the skills diagram renders `…thanical Prototyping` — the start of "Mechanical" is cut off past the viewport edge. Label positions appear to be absolutely placed relative to the airfoil rather than constrained to the container.

### Locate it

```bash
grep -rn "Mechanical Prototyping" --include=*.tsx .
```

Then find the label positioning logic in the same component.

### The change

Either clamp label positions to the container bounds, or inset the airfoil enough that the widest label still fits at the narrowest desktop breakpoint. Whichever is a smaller change to the existing component.

### Acceptance criteria

- [ ] No label clipped at **1280**, **1440**, or **1920** width
- [ ] No horizontal page scroll introduced at any width
- [ ] Labels don't overlap each other at any tested width
- [ ] Mobile rendering of the section unchanged
