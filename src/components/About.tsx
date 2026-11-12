import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="border-t border-border px-5 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-7 md:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] md:gap-14">
        <div>
          <h2 className="portfolio-heading">About me</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            I’m an aerospace engineering student who likes learning how things work by
            taking them apart, measuring them and putting them back together. Away from
            coursework, that might mean diagnosing my Honda Civic, printing a new part
            for my Ender 3, or writing a simulation to see how a design behaves. I’m
            looking for internships where I can bring that approach to an engineering
            or software team.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-surface-alt">
          <Image
            src="/about/IMG_0142.jpg"
            alt="Max standing on a bridge above a city river at sunset."
            fill
            sizes="(min-width: 1152px) 460px, (min-width: 768px) 41vw, 94vw"
            className="object-cover object-[center_52%]"
          />
        </div>
      </div>
    </section>
  );
}
