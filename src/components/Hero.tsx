import SolariBoard from "./SolariBoard";
import { CV } from "@/lib/links";

export default function Hero() {
  return (
    <section className="relative isolate border-b border-border bg-linear-to-b from-surface to-background px-5 py-14 text-center sm:py-20">
      <div aria-hidden="true" className="schematic-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-muted sm:mb-7">
          Edinburgh, Scotland
        </p>
        <div className="relative">
          <h1 className="sr-only">Maksymilian Dubowski — MEng Aerospace Engineering</h1>
          <SolariBoard
            rows={[
              { text: "MAKSYMILIAN DUBOWSKI", color: "white" },
              { text: "MENG AEROSPACE ENGINEERING", color: "amber" },
            ]}
          />
        </div>
        <p className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
          I study aerospace engineering at Heriot-Watt and build across simulation,
          hands-on testing and software.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
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
