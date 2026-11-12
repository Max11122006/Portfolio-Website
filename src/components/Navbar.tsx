"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { CV } from "@/lib/links";

const sections = [
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-6xl px-5 sm:px-6"
        onKeyDown={(event) => {
          if (event.key === "Escape" && menuOpen) {
            setMenuOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex shrink-0 items-center gap-2 text-sm font-semibold">
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
            M. Dubowski
          </Link>
          <div className="flex items-center gap-2 sm:gap-5">
            <div className="hidden items-center gap-5 md:flex lg:gap-7">
              {sections.map(({ label, href }) => (
                <Link key={href} href={href} className="py-2 text-sm text-muted hover:text-foreground">
                  {label}
                </Link>
              ))}
            </div>
            <a href={CV.href} download={CV.downloadName} className="portfolio-button portfolio-button-small">
              Download CV
            </a>
            <button
              type="button"
              ref={menuButton}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-md text-foreground md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d={menuOpen ? "M4 4l12 12M16 4L4 16" : "M2 5h16M2 10h16M2 15h16"} />
              </svg>
            </button>
          </div>
        </div>
        <div id="mobile-navigation" hidden={!menuOpen} className="border-t border-border py-2 md:hidden">
          {sections.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-md px-3 py-3 text-sm hover:bg-surface-alt"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
