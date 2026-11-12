import { SOCIAL } from "@/lib/links";

export default function Footer() {
  return (
    <footer className="border-t border-border px-5 py-7 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-5 gap-y-3">
        <p className="text-sm text-muted">© {new Date().getFullYear()} Maksymilian Dubowski</p>
        <div className="flex flex-wrap items-center gap-4">
          <a href={SOCIAL.linkedin} className="portfolio-link">LinkedIn</a>
          <a href={SOCIAL.github} className="portfolio-link">GitHub</a>
          <a href={SOCIAL.email} className="portfolio-link">Email</a>
        </div>
      </div>
    </footer>
  );
}
