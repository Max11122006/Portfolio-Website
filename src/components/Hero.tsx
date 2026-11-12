import SolariBoard from "./SolariBoard";
import { CV } from "@/lib/links";

export default function Hero() {
  return (
    <section className="relative isolate border-b border-border bg-linear-to-b from-surface to-background px-5 py-14 text-center sm:py-20">
      <div aria-hidden="true" className="schematic-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <h1 className="sr-only">Maksymilian Dubowski — MEng Aerospace Engineering</h1>
          <SolariBoard
            rows={[
              { text: "MAKSYMILIAN DUBOWSKI", color: "white" },
              { text: "MENG AEROSPACE ENGINEERING", color: "amber" },
            ]}
          />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10">
          <a href="#projects" className="portfolio-button portfolio-button-primary">
            View projects
          </a>
          <a href={CV.href} download={CV.downloadName} className="portfolio-button">
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
