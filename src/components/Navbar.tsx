"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CV } from "@/lib/links";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sectionLinks = [
    { label: "About", href: "#about" },
    // { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  const pageLinks = [
    { label: "Workshop", href: "/personal-projects" },
    { label: "GitHub", href: "/github" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-border-light shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-accent inline-block" />
          M. Dubowski
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {/* Section links (only show on home page) */}
          {isHome &&
            sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-[13px] text-muted hover:text-foreground transition-colors duration-200 rounded-md"
              >
                {link.label}
              </a>
            ))}

          {/* Separator */}
          {isHome && <span className="w-px h-4 bg-border mx-1" />}

          {/* Page links */}
          {pageLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 text-[13px] rounded-md transition-colors duration-200 ${
                pathname === link.href
                  ? "text-accent font-medium bg-accent/5"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* CV — the most-wanted link on an internship portfolio */}
          <span className="w-px h-4 bg-border mx-1" />
          <a
            href={CV.href}
            download={CV.downloadName}
            target="_blank"
            rel="noopener"
            className="px-3 py-1.5 text-[13px] text-muted hover:text-foreground transition-colors duration-200 rounded-md"
          >
            CV
          </a>
        </div>

        {/* Mobile hamburger + CTA */}
        <div className="flex items-center gap-3">
          {isHome && (
            <a
              href="#contact"
              className="text-[13px] font-medium text-accent hover:text-accent-light transition-colors duration-200 hidden sm:block"
            >
              Get in Touch
            </a>
          )}

          {!isHome && (
            <Link
              href="/"
              className="text-[13px] font-medium text-accent hover:text-accent-light transition-colors duration-200 hidden sm:block"
            >
              ← Home
            </Link>
          )}

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-foreground block"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-0.5 bg-foreground block"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-foreground block"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white/95 backdrop-blur-md border-b border-border px-6 pb-4"
        >
          {isHome &&
            sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm text-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          <div className="h-px bg-border my-2" />
          {pageLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-sm ${
                pathname === link.href ? "text-accent font-medium" : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={CV.href}
            download={CV.downloadName}
            target="_blank"
            rel="noopener"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm text-muted hover:text-foreground"
          >
            Download CV
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
