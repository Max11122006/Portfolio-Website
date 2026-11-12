import Image from "next/image";
import type { ProjectSection } from "@/data/projects";

export default function ProjectAccordion({ sections }: { sections: ProjectSection[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {sections.map(({ heading, body, images }) => (
        <details key={heading} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-4 font-medium hover:text-accent [&::-webkit-details-marker]:hidden">
            {heading}
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 group-open:rotate-180"
            >
              <path d="M3 6l5 5 5-5" />
            </svg>
          </summary>
          <ul className="mb-5 list-disc space-y-2 ps-5 text-sm leading-relaxed text-muted">
            {body.map((item) => <li key={item}>{item}</li>)}
          </ul>
          {images && images.length > 0 && (
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              {images.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${heading} image ${index + 1}`}
                  width={800}
                  height={600}
                  sizes="(min-width: 768px) 370px, 94vw"
                  className="h-auto w-full rounded-lg border border-border"
                />
              ))}
            </div>
          )}
        </details>
      ))}
    </div>
  );
}
