import { createClient } from "@supabase/supabase-js";
import type { Project, ProjectImageAspect } from "@/content/projects/types";
import type { Poster } from "@/content/projects/infographic-design";

/**
 * Read-only client for public content fetching.
 *
 * Uses `@supabase/supabase-js` directly (no cookie/session) so it can run inside
 * `generateStaticParams` at build time. RLS public-read policies protect access.
 * The session-aware `lib/supabase/server.ts` client remains for admin/authenticated reads.
 */
function getReadClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}

export type ImpactArea = {
  slug: string;
  numberLabel: string;
  title: string;
  description: string;
  iconName: string;
};

type ImpactAreaRow = {
  slug: string;
  number_label: string;
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
};

type ProjectTechRow = {
  label: string;
  display_order: number;
};

type ProjectImageRow = {
  label: string;
  aspect: string;
  storage_path: string | null;
  display_order: number;
};

type ProjectLinkRow = {
  label: string;
  href: string;
  is_external: boolean;
  display_order: number;
};

type ProjectRow = {
  number: string;
  title: string;
  role_timeline: string;
  description: string;
  display_order: number;
  project_tech: ProjectTechRow[] | null;
  project_images: ProjectImageRow[] | null;
  project_links: ProjectLinkRow[] | null;
};

type PosterRow = {
  id: string;
  title: string;
  topic: string;
  year: string;
  tools: unknown;
  image_label: string;
  storage_path: string | null;
  display_order: number;
};

export async function getImpactAreas(): Promise<ImpactArea[]> {
  const supabase = getReadClient();

  const { data, error } = await supabase
    .from("impact_areas")
    .select("slug, number_label, title, description, icon_name, display_order")
    .order("display_order", { ascending: true });

  if (error || !data) {
    console.error("Failed to fetch impact areas:", error);
    return [];
  }

  return (data as ImpactAreaRow[]).map((row) => ({
    slug: row.slug,
    numberLabel: row.number_label,
    title: row.title,
    description: row.description,
    iconName: row.icon_name,
  }));
}

export async function getProjectsByAreaSlug(slug: string): Promise<Project[]> {
  const supabase = getReadClient();

  const { data: area, error: areaError } = await supabase
    .from("impact_areas")
    .select("id")
    .eq("slug", slug)
    .single();

  if (areaError || !area) {
    return [];
  }

  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      number,
      title,
      role_timeline,
      description,
      display_order,
      project_tech (label, display_order),
      project_images (label, aspect, storage_path, display_order),
      project_links (label, href, is_external, display_order)
      `
    )
    .eq("area_id", (area as { id: string }).id)
    .order("display_order", { ascending: true });

  if (error || !data) {
    console.error(`Failed to fetch projects for ${slug}:`, error);
    return [];
  }

  return (data as unknown as ProjectRow[]).map((row) => ({
    number: row.number,
    title: row.title,
    roleAndTimeline: row.role_timeline,
    description: row.description,
    tech: (row.project_tech ?? [])
      .slice()
      .sort((a, b) => a.display_order - b.display_order)
      .map((t) => t.label),
    images: (row.project_images ?? [])
      .slice()
      .sort((a, b) => a.display_order - b.display_order)
      .map((img) => ({
        label: img.label,
        aspect: img.aspect as ProjectImageAspect,
      })),
    links: (row.project_links ?? [])
      .slice()
      .sort((a, b) => a.display_order - b.display_order)
      .map((link) => ({
        label: link.label,
        href: link.href,
        external: link.is_external,
      })),
  }));
}

export async function getPosters(): Promise<Poster[]> {
  const supabase = getReadClient();

  const { data, error } = await supabase
    .from("posters")
    .select(
      "id, title, topic, year, tools, image_label, storage_path, display_order"
    )
    .order("display_order", { ascending: true });

  if (error || !data) {
    console.error("Failed to fetch posters:", error);
    return [];
  }

  return (data as PosterRow[]).map((row) => ({
    id: row.id,
    title: row.title,
    topic: row.topic,
    year: row.year,
    tools: Array.isArray(row.tools) ? (row.tools as string[]) : [],
    imageLabel: row.image_label,
    ...(row.storage_path ? { imagePath: row.storage_path } : {}),
  }));
}

export type ImpactAreaMeta = {
  title: string;
  description: string;
};

export async function getAreaBySlug(
  slug: string
): Promise<ImpactAreaMeta | null> {
  const supabase = getReadClient();

  const { data, error } = await supabase
    .from("impact_areas")
    .select("title, description")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data as ImpactAreaMeta;
}

export async function getAllAreaSlugs(): Promise<string[]> {
  const supabase = getReadClient();

  const { data, error } = await supabase.from("impact_areas").select("slug");

  if (error || !data) {
    return [];
  }

  return (data as { slug: string }[]).map((row) => row.slug);
}
