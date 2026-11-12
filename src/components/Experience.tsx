import Link from "next/link";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-border bg-surface px-5 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="portfolio-heading mb-7 sm:mb-9">Experience &amp; education</h2>
        <div className="grid gap-7 md:grid-cols-2 md:gap-12">
          <article className="border-t border-border pt-5">
            <p className="mb-2 font-mono text-xs tracking-wide text-muted">September 2026 – present</p>
            <h3 className="text-xl font-semibold tracking-tight">PackSync</h3>
            <p className="mt-1 font-medium text-foreground">Technical Co-Founder &amp; Software Engineer</p>
            <p className="mt-3 max-w-lg leading-relaxed text-muted">
              I co-founded and built a platform that helps UK drinks producers calculate
              packaging obligations and prepare reporting exports.
            </p>
            <Link href="/projects/packsync" className="portfolio-link mt-3 inline-flex">
              PackSync case study <span aria-hidden="true">→</span>
            </Link>
          </article>
          <article className="border-t border-border pt-5">
            <p className="mb-2 font-mono text-xs tracking-wide text-muted">September 2024 – present</p>
            <h3 className="text-xl font-semibold tracking-tight">Heriot-Watt University</h3>
            <p className="mt-1 font-medium text-foreground">MEng (Hons) Aerospace Engineering</p>
            <ul className="mt-3 space-y-2 leading-relaxed text-muted">
              <li><strong className="font-semibold text-foreground">Deputy Principal’s Award</strong> for first-year academic performance, 2025.</li>
              <li><strong className="font-semibold text-foreground">Malaysia exchange</strong> at Heriot-Watt’s Putrajaya campus, September–December 2025.</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
