import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AreasTable } from "./_components/AreasTable";
import { EmptyState } from "./_components/EmptyState";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Impact Areas — Admin",
};

async function getAreas() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("impact_areas")
    .select(
      "id, slug, number_label, title, description, icon_name, display_order"
    )
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch impact areas:", error);
    return [];
  }

  return data;
}

export default async function AdminAreasPage() {
  const areas = await getAreas();

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">
            Admin / Impact Areas
          </p>
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-2">
            Impact Areas
          </h1>
          <p className="text-sm text-muted leading-relaxed max-w-prose">
            Kategori karya yang ditampilkan di homepage. Setiap area memiliki
            halaman detail di /karya/[slug].
          </p>
        </div>

        <Link
          href="/admin/areas/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-foreground text-background font-mono text-xs uppercase tracking-widest rounded-md hover:opacity-90 transition-opacity self-start"
        >
          <Plus size={14} strokeWidth={2} />
          Tambah Area
        </Link>
      </div>

      {/* Content */}
      {areas.length === 0 ? <EmptyState /> : <AreasTable areas={areas} />}
    </div>
  );
}
