# 04 — Search, sharing, accessibility

**Findings F06, F07, F09, F10 · all Medium/Low**

Four fixes that determine what a recruiter sees *before* they reach the site, plus who can use it once they arrive.

---

## F06 — The page has no `<h1>`

Your name is rendered as a grid of flip-tiles, so the document's first heading is an `<h2>` and there are **zero** `<h1>` elements on the page.

Confirmed heading outline on `/`:

```
h1: (none)
h2: The Person Behind The Projects.
h2: Selected Projects.
h2: Engineering Stack.
h2: Core Competencies.
h2: Get in touch.
```

Search engines lose the strongest available signal of whose site this is, and a screen reader user gets an outline that starts mid-level.

### The change

Wrap the split-flap board in an `<h1>` containing your name and discipline as real text. Keep the tiles exactly as they are — the machine-readable version sits underneath:

```tsx
<h1>
  <span className="sr-only">
    Maksymilian Dubowski — BEng Aerospace Engineering, Edinburgh
  </span>
  <span aria-hidden="true">
    {/* existing flip-board component, untouched */}
  </span>
</h1>
```

Check whether the project has an `sr-only` utility already (Tailwind provides one by default) before adding one.

### Acceptance criteria

- [ ] Exactly one `<h1>` on each route, containing the real name as text
- [ ] The flip-board animation is visually identical to before
- [ ] The tiles are `aria-hidden` so a screen reader doesn't announce them letter by letter
- [ ] Heading levels descend without skipping

---

## F07 — The meta description contradicts the site

This is the sentence Google shows under your name, and for many people it's the only thing they read before deciding whether to click.

Current:

```
"Aerospace engineering student at Heriot-Watt University. Future commercial
 pilot. Systems thinker with experience in property management, software
 engineering, and design."
```

Property management and commercial piloting appear nowhere else on the page and neither supports an engineering internship application. It reads like an earlier version of the site that was never updated.

### The change

Rewrite to match what the site now argues — the hardware-plus-software framing — in one sentence under **155 characters**.

> **Blocked on Max** — the replacement sentence is being written alongside the project copy. Wire up everything else in this file and leave the description as `TODO(copy):` if it hasn't arrived.

### Acceptance criteria

- [ ] Under 155 characters
- [ ] Contains no claim not supported by the page content

---

## F09 — Shared links preview as a blank card

There's an `og:title` and `twitter:card="summary"`, but **no `og:image` and no `og:description`**. Every time the URL is pasted into LinkedIn, Slack, WhatsApp or Discord, it renders as a grey box with a line of text — which is a waste, given the hero.

### The change

Add to the root metadata:

```ts
openGraph: {
  title: "Maksymilian Dubowski",
  description: "…",                    // same sentence as F07
  url: "https://www.maxdubowski.com",
  siteName: "Maksymilian Dubowski",
  images: [{ url: "/og.png", width: 1200, height: 630 }],
  locale: "en_GB",
  type: "website",
},
twitter: {
  card: "summary_large_image",         // upgrade from "summary"
  images: ["/og.png"],
},
```

For the image itself: a 1200×630 screenshot of the flip-board hero is fine. Next.js `ImageResponse` in an `opengraph-image.tsx` route would be the tidier option if the project is on the App Router — either is acceptable.

### Acceptance criteria

- [ ] `/og.png` (or the generated route) returns a 1200×630 image
- [ ] Preview renders correctly in a validator — post the URL into a Slack DM to yourself and look
- [ ] `twitter:card` is `summary_large_image`

---

## F10 — No reduced-motion support, and content that waits at `opacity: 0`

Across **138 CSS rules there is not one `prefers-reduced-motion` query**. A visitor who has asked their OS to reduce animation still gets the full scroll-reveal sequence, the flip-board animation, and every hover transition.

There's a robustness problem alongside the accessibility one: at any moment **18 elements sit at inline `opacity: 0`** waiting for their reveal to fire. There is no `<noscript>` fallback. If that JS ever fails, those 18 blocks of content are invisible with no recovery.

Observed inline style, on the footer among others:

```html
<div style="opacity:0;transform:translateY(40px)">
```

### The change

1. Add a global reduced-motion block that puts revealed content straight into its final state:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

2. That alone won't fix inline `opacity: 0` — it's set by JS, not CSS. In the scroll-reveal component, check `window.matchMedia("(prefers-reduced-motion: reduce)").matches` and skip straight to the revealed state without ever setting the hidden one.

3. Consider whether the flip-board should animate at all under reduced motion, or just render its final text. It's the biggest motion on the page.

### Acceptance criteria

- [ ] With **Emulate `prefers-reduced-motion`** on in DevTools, all content is visible immediately on load
- [ ] No element remains at `opacity: 0` after load in that mode
- [ ] Normal mode animations are unchanged
- [ ] `document.querySelectorAll('[style*="opacity:0"]').length` is `0` after scrolling the full page
