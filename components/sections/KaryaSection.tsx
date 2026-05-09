import Link from "next/link";
import { impactAreas } from "@/content/karya";

export function KaryaSection() {
  return (
    <section
      id="karya"
      className="container-narrow section-padding scroll-mt-24"
      aria-labelledby="karya-heading"
    >
      <header className="relative mb-16">
        <span
          aria-hidden="true"
          className="text-muted absolute top-0 right-0 font-mono text-xs tracking-widest uppercase"
        >
          § 03 — Work
        </span>

        <p className="text-muted mb-3 font-mono text-xs tracking-widest uppercase">
          Karya
        </p>

        <h2
          id="karya-heading"
          className="text-foreground mb-4 text-[clamp(40px,5vw,64px)] leading-tight font-medium tracking-tight"
        >
          Area Dampak
        </h2>

        <p className="text-muted max-w-2xl text-lg leading-relaxed">
          Tiga arah kerja yang saling menguatkan — kode jadi produk, produk jadi
          pelajaran, pelajaran jadi visual yang mudah dipahami.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {impactAreas.map((area) => {
          const Icon = area.icon;
          return (
            <li key={area.slug} className="flex">
              <Link
                href={area.href}
                aria-label={`Explore ${area.title}`}
                className="group block w-full"
              >
                <article className="border-border bg-background group-hover:border-foreground flex h-full min-h-[340px] flex-col gap-5 border p-10 transition-colors duration-300 ease-out">
                  <span className="border-foreground grid h-9 w-9 place-items-center rounded-full border">
                    <Icon
                      size={16}
                      strokeWidth={1.4}
                      aria-hidden="true"
                      className="text-foreground"
                    />
                  </span>

                  <p className="text-muted font-mono text-[11px] tracking-widest uppercase">
                    {area.numberLabel}
                  </p>

                  <h3 className="text-foreground text-2xl font-medium tracking-tight">
                    {area.title}
                  </h3>

                  <p className="text-muted flex-1 text-[15px] leading-relaxed">
                    {area.description}
                  </p>

                  <span className="text-foreground mt-auto inline-flex items-center gap-2 font-mono text-[12px] tracking-widest uppercase">
                    Explore
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </article>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
