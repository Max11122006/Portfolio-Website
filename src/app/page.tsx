"use client";

import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Footer from "@/components/Footer";
import AirplaneDrift from "@/components/AirplaneDrift";

// Lazy load heavier sections
// (Experience is currently disabled — see the commented-out section below.)
const Projects = lazy(() => import("@/components/Projects"));
const Interactive3D = lazy(() => import("@/components/Interactive3D"));
const Skills = lazy(() => import("@/components/Skills"));
const Contact = lazy(() => import("@/components/Contact"));

function SectionFallback() {
  return <div className="min-h-[40vh]" />;
}

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <AirplaneDrift />
      <Navbar />
      <Hero />
      <About />
      {/* <Suspense fallback={<SectionFallback />}>
        <Experience />
      </Suspense> */}
      <Suspense fallback={<SectionFallback />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Interactive3D />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
      <Footer />
    </main>
  );
}
