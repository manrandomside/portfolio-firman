import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "../_components/ProjectForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tambah Project — Admin",
};

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

export default async function NewProjectPage() {
  const areas = await getAreas();

  if (areas.length === 0) {
    return (
      <div className="max-w-2xl">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8 font-mono text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={14} strokeWidth={1.6} />
          Kembali ke Projects
        </Link>

        <div className="border border-dashed border-border rounded-lg p-12 text-center">
          <h2 className="text-lg font-medium text-foreground mb-2">
            Belum ada Impact Area
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-sm mx-auto mb-6">
            Buat impact area dulu sebelum menambahkan project.
          </p>
          <Link
            href="/admin/areas/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-foreground text-background font-mono text-xs uppercase tracking-widest rounded-md hover:opacity-90 transition-opacity"
          >
            Tambah Impact Area
          </Link>
        </div>
      </div>
    );
  }

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
          Admin / Projects / New
        </p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-3">
          Tambah Project
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          Buat project baru dengan tech stack, images, dan action links.
        </p>
      </div>

      <ProjectForm mode="create" areas={areas} />
    </div>
  );
}
