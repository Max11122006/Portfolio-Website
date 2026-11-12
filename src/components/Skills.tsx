import Image from "next/image";

const skills = [
  {
    title: "Engineering & simulation",
    tools: "ANSYS Fluent, Abaqus, MATLAB, Autodesk Inventor",
  },
  {
    title: "Software & data",
    tools: "Python, C++, TypeScript, Next.js, React, SQL",
  },
  {
    title: "Prototyping & testing",
    tools: "Arduino, load-cell instrumentation, FDM 3D printing",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="border-t border-border bg-surface px-5 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="portfolio-heading">Technical skills</h2>
        <div className="mt-6 grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-12">
          <dl className="divide-y divide-border border-y border-border">
            {skills.map(({ title, tools }) => (
              <div key={title} className="py-3.5">
                <dt className="font-semibold">{title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted sm:text-base">{tools}</dd>
              </div>
            ))}
          </dl>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-surface-alt md:aspect-[2/1]">
            <Image
              src="/projects/3dprinter/extruder-1.jpg"
              alt="Orange 3D-printed extruder housing and cable guides fitted to an Ender 3 V2."
              fill
              sizes="(min-width: 1152px) 580px, (min-width: 768px) 50vw, 94vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
