# 02 — CV, broken links, contact form

**Findings F02 (critical), F05 (high), F08 (medium), F12 (low)**

Four small independent fixes. Together they're about an hour.

---

## F02 — There is no CV to download

**Critical.** For an internship portfolio this is the most-wanted link on the page and it doesn't exist. Someone who likes the site has no way to get the document their application process requires, so the visit ends there.

### The change

1. Place the PDF at `public/cv.pdf`.
2. Link it from **two** places: the header nav (alongside About / Projects / Skills / Contact) and the contact section.
3. Serve it under a proper download name, so it doesn't land in someone's downloads folder as `cv.pdf` among forty others:

```tsx
<a href="/cv.pdf" download="Maksymilian-Dubowski-CV.pdf">
```

4. Open in a new tab (`target="_blank" rel="noopener"`) so clicking it doesn't navigate away from the portfolio.

> **Blocked on Max** — the PDF itself. If `public/cv.pdf` doesn't exist yet, still wire up the links and commit a placeholder file, but flag it clearly in the PR description so it can't ship unnoticed.

### Acceptance criteria

- [ ] CV link present in header nav and contact section
- [ ] Downloads with the full filename, not `cv.pdf`
- [ ] Works on mobile (check the hamburger menu contains it too)

---

## F05 — Footer social links point at bare domains

**High.** The footer sends visitors to the LinkedIn and GitHub homepages instead of the profiles. The header links are correct, so this is an isolated drift between two copies of the same URLs — which is also the reason for the fix below.

### Evidence

Live footer markup:

```html
<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
<a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
<a href="mailto:hello@mdubowski.com">Email</a>
```

### Locate it

```bash
grep -rn 'href="https://linkedin.com"' --include=*.tsx .
grep -rn 'href="https://github.com"' --include=*.tsx .
```

### The change

Create a single source of truth and reference it from header, footer, and hero:

```ts
// src/lib/links.ts  (match the repo's existing structure)
export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/maksymilian-dubowski/",
  github:   "https://github.com/Max11122006",
  email:    "mailto:hello@maxdubowski.com",   // ← verify domain, see F08
} as const;
```

Then replace all hardcoded occurrences. There should be **zero** literal LinkedIn/GitHub/mailto URLs left in components after this.

### Acceptance criteria

- [ ] `grep -rn "https://linkedin.com\"" .` returns nothing
- [ ] `grep -rn "https://github.com\"" .` returns nothing
- [ ] Every social link in header, hero and footer resolves to the correct profile — click each one

---

## F08 — Contact form unverified, and the email domain looks wrong

**Medium**, but potentially the most damaging item in the whole queue if the domain is wrong.

### Two separate problems

**1. The mail domain doesn't match the site.** Every mail link points at `hello@`**`mdubowski.com`** while the site is `max`**`dubowski.com`**. If that's a typo rather than a second domain Max owns, every message anyone has ever sent has bounced.

> **Blocked on Max** — confirm which domain is correct before changing anything. Do not guess.

**2. The form's delivery path is unverified.** The `<form>` has no `action` attribute and none of its fields carry `name` attributes, so submission depends entirely on a JS handler.

```
<form action=null method="get">
  fields: [text, email, textarea, submit]     ← no name attributes on any
```

### Locate it

```bash
grep -rn "hello@mdubowski.com" .
grep -rn "<form" --include=*.tsx .
```

### The change

1. Trace the submit handler and establish where messages actually go. If nothing is wired up, say so in the PR rather than papering over it — a form that silently swallows messages is worse than no form.
2. Add `name` attributes to all three fields regardless.
3. Add explicit success and failure states. Currently there's no way for a sender to know whether anything happened.
4. Add `required` and `type="email"` validation on the email field.

### Acceptance criteria

- [ ] Submitting the form produces a visible success **or** failure message
- [ ] A test submission has been received at the destination inbox — confirmed, not assumed
- [ ] All fields have `name` attributes
- [ ] Mail domain confirmed with Max and consistent everywhere

---

## F12 — Repository name is misspelled

**Low**, but it's seen by exactly the person evaluating attention to detail.

The portfolio project card links to `github.com/Max11122006/Portfolio-Wesbite` — "Wesbite".

### The change

Rename in GitHub settings. GitHub redirects the old name automatically, so nothing breaks. Then update the URL in the project data and in `links.ts`.

```bash
grep -rn "Portfolio-Wesbite" .
```

### Acceptance criteria

- [ ] Repo renamed on GitHub
- [ ] No occurrence of `Wesbite` anywhere in the codebase
- [ ] The updated link resolves
