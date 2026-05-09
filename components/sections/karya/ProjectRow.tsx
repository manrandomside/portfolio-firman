import Link from "next/link";
import type {
  Project,
  ProjectImageAspect,
} from "@/content/projects/types";

type ProjectRowProps = {
  project: Project;
};

const ASPECT_CLASS: Record<ProjectImageAspect, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
};

function getGalleryGridClass(count: number): string {
  if (count >= 3) {
    return "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3";
  }
  if (count === 2) {
    return "grid grid-cols-1 gap-4 md:grid-cols-2";
  }
  return "grid grid-cols-1 gap-4";
}

export function ProjectRow({ project }: ProjectRowProps) {
  const galleryClass = getGalleryGridClass(project.images.length);

  return (
    <article className="mx-auto w-full max-w-[960px]">
      <p className="text-foreground mb-6 font-mono text-7xl leading-none font-light md:text-8xl">
        {project.number}
      </p>

      <h3 className="text-foreground mb-3 text-3xl leading-tight font-medium tracking-tight md:text-4xl">
        {project.title}
      </h3>

      <p className="text-muted mb-8 font-mono text-xs tracking-widest uppercase">
        {project.roleAndTimeline}
      </p>

      <p className="text-foreground mb-10 max-w-prose text-lg leading-relaxed">
        {project.description}
      </p>

      <ul className="mb-12 flex flex-wrap gap-2.5">
        {project.tech.map((item) => (
          <li
            key={item}
            className="border-border text-foreground inline-flex items-center rounded-full border px-3.5 py-2 font-mono text-xs tracking-wider uppercase"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className={`mb-12 ${galleryClass}`}>
        {project.images.map((image, index) => {
          const aspectClass = ASPECT_CLASS[image.aspect ?? "video"];
          return (
            <div
              key={`${image.label}-${index}`}
              className={`border-border bg-soft flex items-center justify-center rounded-lg border border-dashed ${aspectClass}`}
            >
              <span className="text-muted px-4 text-center font-mono text-xs tracking-widest uppercase">
                {image.label}
              </span>
            </div>
          );
        })}
      </div>

      <ul className="flex flex-wrap gap-6">
        {project.links.map((link) => {
          const isExternal = link.external ?? true;
          const arrow = (
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          );
          const linkClass =
            "group text-foreground inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase";

          return (
            <li key={link.href}>
              {isExternal ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {link.label}
                  {arrow}
                </a>
              ) : (
                <Link href={link.href} className={linkClass}>
                  {link.label}
                  {arrow}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
