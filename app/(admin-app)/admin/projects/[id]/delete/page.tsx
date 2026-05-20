import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DeleteProjectConfirm } from "../../_components/DeleteProjectConfirm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Hapus Project — Admin",
};

type Params = Promise<{ id: string }>;

async function getProjectWithCascadeCounts(id: string) {
  const supabase = await createClient();

  // Fetch project base data with area title
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select(
      `
      id,
      number,
      title,
      role_timeline,
      impact_areas (title)
    `
    )
    .eq("id", id)
    .single();

  if (projectError || !project) {
    return null;
  }

  const projectRow = project as unknown as {
    id: string;
    number: string;
    title: string;
    role_timeline: string;
    impact_areas: { title: string } | null;
  };

  // Count relations in parallel
  const [techResult, imageResult, linkResult] = await Promise.all([
    supabase
      .from("project_tech")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id),
    supabase
      .from("project_images")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id),
    supabase
      .from("project_links")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id),
  ]);

  return {
    project: {
      id: projectRow.id,
      number: projectRow.number,
      title: projectRow.title,
      role_timeline: projectRow.role_timeline,
      areaTitle: projectRow.impact_areas?.title ?? "Unknown",
    },
    cascadeCounts: {
      tech: techResult.count ?? 0,
      images: imageResult.count ?? 0,
      links: linkResult.count ?? 0,
    },
  };
}

export default async function DeleteProjectPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const result = await getProjectWithCascadeCounts(id);

  if (!result) {
    notFound();
  }

  const { project, cascadeCounts } = result;

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8 font-mono text-xs uppercase tracking-widest"
      >
        <ArrowLeft size={14} strokeWidth={1.6} />
        Kembali ke Projects
      </Link>

      <div className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">
          Admin / Projects / Delete
        </p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-3">
          Konfirmasi Hapus Project
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          Pastikan keputusan ini sebelum melanjutkan. Penghapusan tidak dapat
          dibatalkan.
        </p>
      </div>

      <DeleteProjectConfirm
        projectId={project.id}
        projectTitle={project.title}
        projectNumber={project.number}
        projectRoleTimeline={project.role_timeline}
        areaTitle={project.areaTitle}
        cascadeCounts={cascadeCounts}
      />
    </div>
  );
}
