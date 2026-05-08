import type { Chapter } from "@/content/chapters";

type ChapterCardProps = {
  chapter: Chapter;
};

export function ChapterCard({ chapter }: ChapterCardProps) {
  return (
    <article className="flex gap-6 md:gap-12">
      <div className="text-foreground flex-shrink-0 font-mono text-5xl leading-none font-light md:text-7xl lg:text-8xl">
        {chapter.number}
      </div>

      <div className="flex flex-1 flex-col">
        <p className="text-muted font-mono text-xs tracking-widest uppercase">
          {chapter.label}
        </p>

        <h3 className="text-foreground mt-3 text-2xl font-medium md:text-3xl">
          {chapter.title}
        </h3>

        <p className="text-muted mt-2 text-base italic">{chapter.tagline}</p>

        <blockquote className="border-border text-foreground mt-6 border-l-2 pl-6 text-lg italic">
          {chapter.quote}
        </blockquote>

        <p className="text-foreground mt-6 max-w-prose text-base leading-relaxed">
          {chapter.body}
        </p>

        <ul className="mt-8 flex flex-wrap gap-2">
          {chapter.tags.map((tag) => (
            <li
              key={tag}
              className="border-border text-muted rounded-full border px-3 py-1 text-xs"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
