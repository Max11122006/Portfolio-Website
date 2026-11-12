<div align="center">

# Portfolio Website

**An aerospace-themed engineering portfolio built with Next.js, TypeScript and Tailwind CSS.**

[![Next.js](https://img.shields.io/badge/Next.js-16-000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=000)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=fff)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)](https://typescriptlang.org)

</div>

---

## Overview

An aerospace-themed portfolio for internship applications, with selected projects, experience, technical skills and a downloadable CV.

## Highlights

- **Solari split-flap display** — A brief CSS reveal with a static display under reduced motion
- **Göttingen 386 airfoil** — An SVG illustration with streamlines computed from the airfoil geometry
- **Project archive** — Case studies and featured projects drawn from a shared data file
- **Contact and CV** — A Resend-backed contact form and a direct PDF download

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Illustration | SVG |
| Animation | CSS, Framer Motion |
| Language | TypeScript |
| Analytics | Vercel Analytics, Speed Insights |
| Deployment | Vercel |

## Getting Started

```bash
# Clone
git clone https://github.com/Max11122006/Portfolio-Website.git
cd Portfolio-Website

# Install
npm install

# Dev server
npm run dev
```

Open [localhost:3000](http://localhost:3000) to view the site.

## Project Structure

- `src/app/` contains the Next.js routes and shared styles.
- `src/components/` contains the portfolio sections and project UI.
- `src/data/projects.ts` holds the project descriptions, links and display order.
- `public/` contains the CV and project imagery.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

---

<div align="center">
  <sub>Built with Next.js and deployed on Vercel.</sub>
</div>
