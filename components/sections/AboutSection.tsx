import { Fragment } from "react";
import { aboutContent } from "@/content/about";

const MONO_TERMS = [
  "PT Gapura Angkasa",
  "PT Citra Konsultama",
  "Universitas Udayana",
  "Kioku",
  "Kobun",
] as const;

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderWithMono(text: string) {
  const pattern = new RegExp(`(${MONO_TERMS.map(escapeRegex).join("|")})`, "g");
  const parts = text.split(pattern);
  return parts.map((part, index) =>
    (MONO_TERMS as readonly string[]).includes(part) ? (
      <span key={index} className="font-mono">
        {part}
      </span>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    )
  );
}

export function AboutSection() {
  const { eyebrow, heading, paragraphs, pills, meta } = aboutContent;
  const lastIndex = paragraphs.length - 1;

  return (
    <section
      id="tentang"
      className="section-padding scroll-mt-24"
      aria-labelledby="tentang-heading"
    >
      <div className="mx-auto w-full max-w-[960px] px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[3fr_2fr] md:gap-20">
          <div className="flex flex-col">
            <p className="text-muted mb-4 font-mono text-xs tracking-widest uppercase">
              {eyebrow}
            </p>

            <h2
              id="tentang-heading"
              className="text-foreground mb-10 text-[clamp(40px,5vw,64px)] leading-tight font-medium tracking-tight"
            >
              {heading}
            </h2>

            <div className="space-y-6">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`max-w-[560px] text-[18px] leading-relaxed ${
                    index === lastIndex ? "text-muted" : "text-foreground"
                  }`}
                >
                  {renderWithMono(paragraph)}
                </p>
              ))}
            </div>
          </div>

          <aside
            aria-label="Quick facts"
            className="flex flex-col gap-8 md:sticky md:top-[120px] md:self-start"
          >
            <ul className="flex flex-wrap gap-2.5">
              {pills.map((pill) => (
                <li
                  key={pill}
                  className="border-border text-foreground inline-flex items-center rounded-full border px-3.5 py-2 font-mono text-xs tracking-wider uppercase"
                >
                  {pill}
                </li>
              ))}
            </ul>

            <dl className="border-border space-y-4 border-t pt-6">
              {meta.map(({ key, value }) => (
                <div key={key} className="flex justify-between gap-4">
                  <dt className="text-muted font-mono text-xs tracking-widest uppercase">
                    {key}
                  </dt>
                  <dd className="text-foreground text-right font-mono text-xs">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
