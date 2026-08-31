# 01 — Project cards are invisible on mobile

**Finding F01 · Critical · Do this first**

---

## The problem

Every project card has a screenshot behind it, plus a **View Project →** link and a **GitHub** link. All three sit on an overlay held at `opacity: 0` until `group-hover` fires.

Touch devices don't have hover. On a phone the cards render as plain text blocks — no imagery, no links, no indication that a repo exists. All six images still download; they're simply never shown.

This is the single most expensive bug on the site. It hides the best visual moment and every route to the source code from roughly half the audience.

Desktop is affected more subtly: the resting card gives no signal that anything is clickable, so even mouse users may never hover.

## Evidence

Captured from the live DOM. The overlay element:

```html
<div class="absolute inset-0 z-10 rounded-lg overflow-hidden cursor-pointer
            opacity-0 translate-y-4
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-300 ease-out">
```

Its ancestor chain, with computed styles:

```
IMG.object-cover.opacity-70              opacity 0.7   288px tall — image IS loaded
DIV.relative.w-full.h-full.bg-foreground opacity 1
DIV.absolute.inset-0.z-10 …              opacity 0     ← content dies here
DIV.group.relative.h-full                opacity 1
```

Six `<img>` elements are present and fully loaded inside `#projects`, each rendering at 515×288, all behind an ancestor at zero opacity.

## Locate it

```bash
grep -rn "group-hover:opacity-100" --include=*.tsx --include=*.jsx .
grep -rn "absolute inset-0 z-10 rounded-lg" --include=*.tsx .
```

## The change

Restructure the card so the screenshot and both links are part of the **resting state**:

1. **Screenshot always visible.** Move the image out of the hover overlay and into the card's normal layout — a fixed-aspect thumbnail above the text content. Keep `next/image` and add a `sizes` attribute matching the rendered width.

2. **Links always visible.** Render *View Project* and *GitHub* as real `<a>` elements in the card footer, outside any hover-conditional wrapper. They must be reachable by keyboard tab order and visible with no pointer present.

3. **Keep the motion.** Hover can still do something — a lift, a scale on the image, a brightness shift, the existing translate. It just can't be the only way to reach content. If you keep a hover overlay, it must contain nothing that isn't also available without it.

4. **Only render links that exist.** Four of the six projects currently have repo URLs; the 3D Printer and Honda Civic cards have none. Don't render a dead GitHub link — omit the element for those.

Confirmed repo links currently in the markup:

```
github.com/Max11122006/missile-trajectory-tracker
github.com/Max11122006/crude-flow
github.com/Max11122006/friendly
github.com/Max11122006/Portfolio-Wesbite     ← note typo, see task 02
```

## Do not

- Change the card's border, dashed-outline treatment, colour palette, or the coloured tag pills. Those stay.
- Rewrite any project description text — see `05-project-data-model.md`.
- Add a lightbox, modal, or carousel. Static thumbnail plus links is the whole scope.

## Acceptance criteria

- [ ] In DevTools device emulation at **375×812**, every project card shows its screenshot without any interaction
- [ ] Both links are tappable on touch, on every card that has them
- [ ] Tabbing through the projects section reaches every project link, with a visible focus ring
- [ ] No card renders a GitHub link for a project with no repo
- [ ] Desktop hover still produces a deliberate visual response
- [ ] Lighthouse mobile performance has not regressed
