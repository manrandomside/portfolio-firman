import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "../../_components/ProjectForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Edit Project — Admin",
};

type Params = Promise<{ id: string }>;

type ProjectTechRow = {
  id: string;
  label: string;
  display_order: number;
};

type ProjectImageRow = {
  id: string;
  storage_path: string;
  label: string;
  aspect: string;
  display_order: number;
};

type ProjectLinkRow = {
  id: string;
  label: string;
  href: string;
  is_external: boolean;
  display_order: number;
};

type ProjectWithRelations = {
  id: string;
  area_id: string;
  number: string;
  title: string;
  role_timeline: string;
  description: string;
  display_order: number;
  project_tech: ProjectTechRow[] | null;
  project_images: ProjectImageRow[] | null;
  project_links: ProjectLinkRow[] | null;
};

async function getProjectWithRelations(
  id: string
): Promise<ProjectWithRelations | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      id,
      area_id,
      number,
      title,
      role_timeline,
      description,
      display_order,
      project_tech (id, label, display_order),
      project_images (id, storage_path, label, aspect, display_order),
      project_links (id, label, href, is_external, display_order)
    `
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data as unknown as ProjectWithRelations;
}

async function getAreas() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("impact_areas")
    .select("id, slug, title")
    .order("display_order", { ascending: true });

  if (error) {
    return [];
  }

  return data;
}

export default async function EditProjectPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  const [project, areas] = await Promise.all([
    getProjectWithRelations(id),
    getAreas(),
  ]);

  if (!project) {
    notFound();
  }

  const supabase = await createClient();

  const images = (project.project_images ?? [])
    .slice()
    .sort((a, b) => a.display_order - b.display_order)
    .map((img) => {
      const { data: urlData } = supabase.storage
        .from("karya-images")
        .getPublicUrl(img.storage_path);

      return {
        id: img.id,
        storagePath: img.storage_path,
        label: img.label,
        aspect: img.aspect as "video" | "square" | "portrait",
        url: urlData.publicUrl,
      };
    });

  const tech = (project.project_tech ?? [])
    .slice()
    .sort((a, b) => a.display_order - b.display_order)
    .map((t) => ({ id: t.id, label: t.label }));

  const links = (project.project_links ?? [])
    .slice()
    .sort((a, b) => a.display_order - b.display_order)
    .map((l) => ({
      id: l.id,
      label: l.label,
      href: l.href,
      is_external: l.is_external,
    }));

  const initialData = {
    id: project.id,
    area_id: project.area_id,
    number: project.number,
    title: project.title,
    role_timeline: project.role_timeline,
    description: project.description,
    display_order: project.display_order,
    tech,
    links,
    images,
  };

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8 font-mono text-xs uppercase tracking-widest"
      >
        <ArrowLeft size={14} strokeWidth={1.6} />
        Kembali ke Projects
      </Link>

      <div className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">
          Admin / Projects / Edit
        </p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-3">
          Edit Project
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          Edit <span className="font-mono">{project.title}</span>.
        </p>
      </div>

      <ProjectForm mode="edit" areas={areas} initialData={initialData} />
    </div>
  );
}
