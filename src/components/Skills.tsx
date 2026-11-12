import Link from "next/link";

const skills = [
  {
    title: "Engineering & simulation",
    tools: "ANSYS Fluent, Abaqus, MATLAB, Autodesk Inventor",
    project: "Missile Trajectory Tracker",
    href: "/projects/missile-trajectory-tracker",
  },
  {
    title: "Software & data",
    tools: "Python, C++, TypeScript, Next.js, React, SQL",
    project: "PackSync",
    href: "/projects/packsync",
  },
  {
    title: "Prototyping & testing",
    tools: "Arduino, load-cell instrumentation, FDM 3D printing",
    project: "Ender 3 V2 upgrades",
    href: "/projects/3d-printer",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="border-t border-border bg-surface px-5 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="portfolio-heading">Technical skills</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3 md:gap-5">
          {skills.map(({ title, tools, project, href }) => (
            <li key={title} className="flex flex-col rounded-xl border border-border border-t-2 border-t-accent/60 bg-background p-5 sm:p-6">
              <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mb-5 mt-2 text-sm leading-relaxed text-muted sm:text-base">{tools}</p>
              <div className="mt-auto border-t border-border pt-4">
                <Link href={href} className="portfolio-link">
                  {project} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
