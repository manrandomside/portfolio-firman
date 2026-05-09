import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectRow } from "@/components/sections/karya/ProjectRow";
import { impactAreas } from "@/content/karya";
import { softwareEngineeringProjects } from "@/content/projects/software-engineering";
import { aiExplorationProjects } from "@/content/projects/ai-exploration";
import type { Project } from "@/content/projects/types";

type Params = Promise<{ slug: string }>;

const projectsBySlug: Record<string, Project[]> = {
  "software-engineering": softwareEngineeringProjects,
  "ai-exploration": aiExplorationProjects,
};

const sectionIndicator: Record<string, string> = {
  "software-engineering": "§ 03.01",
  "ai-exploration": "§ 03.02",
  "infographic-design": "§ 03.03",
};

export function generateStaticParams() {
  return impactAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = impactAreas.find((a) => a.slug === slug);

  if (!area) {
    return { title: "Not Found" };
  }

  return {
    title: `${area.title} — Firman Fadilah`,
    description: area.description,
  };
}

export default async function KaryaDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const area = impactAreas.find((a) => a.slug === slug);

  if (!area) {
    notFound();
  }

  const indicator = sectionIndicator[slug];
  const projects = projectsBySlug[slug];

  return (
    <div className="container-narrow section-padding scroll-mt-24">
      <header className="mb-16">
        <p className="text-muted mb-4 font-mono text-xs tracking-widest uppercase">
          {indicator ? `${indicator} · ` : ""}
          Karya / {area.title}
        </p>

        <Link
          href="/#karya"
          className="text-muted hover:text-foreground mb-8 inline-block font-mono text-xs tracking-widest uppercase transition-colors"
        >
          ← Kembali ke Karya
        </Link>

        <h1 className="text-foreground text-[clamp(48px,7vw,96px)] leading-tight font-medium tracking-tight">
          {area.title}
        </h1>

        <p className="text-muted mt-6 max-w-2xl text-lg leading-relaxed">
          {area.description}
        </p>
      </header>

      {projects && projects.length > 0 ? (
        <section
          aria-label="Selected projects"
          className="mt-20 md:mt-24"
        >
          <p className="text-muted mx-auto mb-16 w-full max-w-[960px] font-mono text-xs tracking-widest uppercase">
            Selected Work
          </p>

          <div className="flex flex-col gap-24 md:gap-32">
            {projects.map((project) => (
              <ProjectRow key={project.number} project={project} />
            ))}
          </div>
        </section>
      ) : (
        <div className="border-border bg-soft mt-20 rounded-lg border p-12 text-center md:mt-24">
          <p className="text-muted font-mono text-xs tracking-widest uppercase">
            Detail content coming soon
          </p>
        </div>
      )}
    </div>
  );
}
