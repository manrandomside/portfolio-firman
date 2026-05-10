import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AreaForm } from "../../_components/AreaForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Edit Impact Area — Admin",
};

type Params = Promise<{ id: string }>;

async function getArea(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("impact_areas")
    .select(
      "id, slug, number_label, title, description, icon_name, display_order"
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function EditAreaPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const area = await getArea(id);

  if (!area) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/areas"
        className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8 font-mono text-xs uppercase tracking-widest"
      >
        <ArrowLeft size={14} strokeWidth={1.6} />
        Kembali ke Areas
      </Link>

      <div className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">
          Admin / Areas / Edit
        </p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-3">
          Edit Area
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          Ubah detail untuk <span className="font-mono">{area.title}</span>.
        </p>
      </div>

      <AreaForm mode="edit" initialData={area} />
    </div>
  );
}
