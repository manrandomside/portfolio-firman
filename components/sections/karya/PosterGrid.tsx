import type { Poster } from "@/content/projects/infographic-design";
import Image from "next/image";

type PosterGridProps = {
  posters: Poster[];
};

export function PosterGrid({ posters }: PosterGridProps) {
  return (
    <div className="container-narrow w-full">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {posters.map((poster) => (
          <article
            key={poster.id}
            className="group flex cursor-pointer flex-col gap-4"
          >
            {/* Image Area */}
            <div className="bg-soft border-border relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-md border border-dashed transition-colors duration-300 ease-out group-hover:border-solid group-hover:border-foreground md:rounded-lg">
              {poster.imagePath ? (
                // When we have real images later
                <Image
                  src={poster.imagePath}
                  alt={poster.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <span className="text-muted text-center font-mono text-xs tracking-widest uppercase">
                  {poster.imageLabel}
                </span>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground text-base font-medium">
                {poster.title}
              </h3>
              
              <p className="text-muted font-mono text-xs tracking-widest uppercase">
                {poster.topic} · {poster.year}
              </p>

              {/* Tools row */}
              <div className="mt-1 flex flex-wrap gap-2">
                {poster.tools.map((tool) => (
                  <span
                    key={tool}
                    className="border-border text-muted rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
