import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProjectsTable } from "./_components/ProjectsTable";
import { ProjectsEmptyState } from "./_components/ProjectsEmptyState";
import { AreaFilter } from "./_components/AreaFilter";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects — Admin",
};

type SearchParams = Promise<{ area?: string }>;

async function getAreas() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("impact_areas")
    .select("id, slug, title")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch areas:", error);
    return [];
  }

  return data;
}

async function getProjects(areaSlug?: string) {
  const supabase = await createClient();

  // Build query with optional area filter
  let query = supabase
    .from("projects")
    .select(
      `
      id,
      number,
      title,
      role_timeline,
      display_order,
      area_id,
      impact_areas!inner (
        id,
        slug,
        title
      ),
      project_tech (id),
      project_images (id),
      project_links (id)
    `
    )
    .order("display_order", { ascending: true });

  // Apply area filter if specified
  if (areaSlug) {
    query = query.eq("impact_areas.slug", areaSlug);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }

  // Map to flatter shape with counts
  return data.map((row: Record<string, unknown>) => {
    const area = row.impact_areas as { id: string; slug: string; title: string };
    const tech = row.project_tech as { id: string }[] | null;
    const images = row.project_images as { id: string }[] | null;
    const links = row.project_links as { id: string }[] | null;

    return {
      id: row.id as string,
      number: row.number as string,
      title: row.title as string,
      role_timeline: row.role_timeline as string,
      display_order: row.display_order as number,
      area: {
        id: area.id,
        slug: area.slug,
        title: area.title,
      },
      techCount: tech?.length ?? 0,
      imageCount: images?.length ?? 0,
      linkCount: links?.length ?? 0,
    };
  });
}

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const areaFilter = params.area;

  const [areas, projects] = await Promise.all([
    getAreas(),
    getProjects(areaFilter),
  ]);

  const filteredArea = areaFilter
    ? areas.find((a) => a.slug === areaFilter)
    : null;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">
            Admin / Projects
          </p>
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-2">
            Projects
          </h1>
          <p className="text-sm text-muted leading-relaxed max-w-prose">
            Project per impact area yang ditampilkan di halaman detail karya.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-foreground text-background font-mono text-xs uppercase tracking-widest rounded-md hover:opacity-90 transition-opacity self-start"
        >
          <Plus size={14} strokeWidth={2} />
          Tambah Project
        </Link>
      </div>

      {/* Filter bar */}
      <div className="mb-8">
        <AreaFilter areas={areas} currentSlug={areaFilter} />
      </div>

      {/* Active filter indicator */}
      {filteredArea && (
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Filtered by:
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-foreground bg-soft border border-border rounded-full px-3 py-1">
            {filteredArea.title}
          </span>
          <Link
            href="/admin/projects"
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors"
          >
            Clear filter
          </Link>
        </div>
      )}

      {/* Content */}
      {projects.length === 0 ? (
        <ProjectsEmptyState areaFilter={filteredArea?.title} />
      ) : (
        <ProjectsTable projects={projects} />
      )}
    </div>
  );
}
