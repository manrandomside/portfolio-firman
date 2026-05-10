import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DeleteAreaConfirm } from "../../_components/DeleteAreaConfirm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Hapus Impact Area — Admin",
};

type Params = Promise<{ id: string }>;

async function getAreaWithCascadeCounts(id: string) {
  const supabase = await createClient();

  // Fetch area details
  const { data: area, error: areaError } = await supabase
    .from("impact_areas")
    .select("id, slug, title, description")
    .eq("id", id)
    .single();

  if (areaError || !area) {
    return null;
  }

  // Fetch project count for this area
  const { count: projectCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("area_id", id);

  // Fetch project IDs to count their relations
  const { data: projects } = await supabase
    .from("projects")
    .select("id")
    .eq("area_id", id);

  const projectIds = projects?.map((p) => p.id) ?? [];

  let techCount = 0;
  let imageCount = 0;
  let linkCount = 0;

  if (projectIds.length > 0) {
    const [techResult, imageResult, linkResult] = await Promise.all([
      supabase
        .from("project_tech")
        .select("*", { count: "exact", head: true })
        .in("project_id", projectIds),
      supabase
        .from("project_images")
        .select("*", { count: "exact", head: true })
        .in("project_id", projectIds),
      supabase
        .from("project_links")
        .select("*", { count: "exact", head: true })
        .in("project_id", projectIds),
    ]);

    techCount = techResult.count ?? 0;
    imageCount = imageResult.count ?? 0;
    linkCount = linkResult.count ?? 0;
  }

  return {
    area,
    cascadeCounts: {
      projects: projectCount ?? 0,
      tech: techCount,
      images: imageCount,
      links: linkCount,
    },
  };
}

export default async function DeleteAreaPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const result = await getAreaWithCascadeCounts(id);

  if (!result) {
    notFound();
  }

  const { area, cascadeCounts } = result;

  return (
    <div className="max-w-2xl">
      {/* Back link */}
      <Link
        href="/admin/areas"
        className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8 font-mono text-xs uppercase tracking-widest"
      >
        <ArrowLeft size={14} strokeWidth={1.6} />
        Kembali ke Areas
      </Link>

      {/* Page header */}
      <div className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">
          Admin / Areas / Delete
        </p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-3">
          Konfirmasi Hapus
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          Pastikan keputusan ini sebelum melanjutkan. Penghapusan tidak dapat
          dibatalkan.
        </p>
      </div>

      {/* Confirmation form */}
      <DeleteAreaConfirm
        areaId={area.id}
        areaSlug={area.slug}
        areaTitle={area.title}
        areaDescription={area.description}
        cascadeCounts={cascadeCounts}
      />
    </div>
  );
}
