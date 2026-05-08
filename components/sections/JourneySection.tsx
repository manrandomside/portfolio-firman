import { ChapterCard } from "@/components/ui/ChapterCard";
import { chapters } from "@/content/chapters";

export function JourneySection() {
  return (
    <section
      id="perjalanan"
      className="container-narrow section-padding scroll-mt-24"
    >
      <header className="mb-20 md:mb-24">
        <p className="text-muted mb-6 font-mono text-xs tracking-widest uppercase">
          Evolusi
        </p>
        <h2 className="text-foreground mb-6 text-5xl leading-tight font-medium tracking-tight md:text-6xl">
          The Plot Twists
        </h2>
        <p className="text-muted max-w-2xl text-lg leading-relaxed">
          Setiap pergantian arah terasa menakutkan. Setiap transisi terasa
          mustahil. Tapi inilah yang kupelajari: pengalaman yang terlihat tidak
          nyambung justru menjadi kekuatan terbesarmu.
        </p>
      </header>

      <div className="flex flex-col">
        {chapters.map((chapter, index) => (
          <div key={chapter.number}>
            {index > 0 && (
              <hr
                className="border-border my-16 border-t md:my-20"
                aria-hidden="true"
              />
            )}
            <ChapterCard chapter={chapter} />
          </div>
        ))}
      </div>
    </section>
  );
}
