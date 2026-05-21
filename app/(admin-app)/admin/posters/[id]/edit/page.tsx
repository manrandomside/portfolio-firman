import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PosterForm } from "../../_components/PosterForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Edit Poster — Admin",
};

type Params = Promise<{ id: string }>;

async function getPoster(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posters")
    .select(
      "id, title, topic, year, tools, image_label, storage_path, display_order"
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  let imageUrl: string | null = null;
  if (data.storage_path) {
    const { data: urlData } = supabase.storage
      .from("karya-images")
      .getPublicUrl(data.storage_path);
    imageUrl = urlData.publicUrl;
  }

  return {
    id: data.id as string,
    title: data.title as string,
    topic: data.topic as string,
    year: parseInt(data.year as string, 10),
    tools: (data.tools as string[]) ?? [],
    image_label: data.image_label as string,
    display_order: data.display_order as number,
    storage_path: (data.storage_path as string | null) ?? null,
    imageUrl,
  };
}

export default async function EditPosterPage({ params }: { params: Params }) {
  const { id } = await params;
  const poster = await getPoster(id);

  if (!poster) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/posters"
        className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8 font-mono text-xs uppercase tracking-widest"
      >
        <ArrowLeft size={14} strokeWidth={1.6} />
        Kembali ke Posters
      </Link>

      <div className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">
          Admin / Posters / Edit
        </p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-3">
          Edit Poster
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          Edit <span className="font-mono">{poster.title}</span>.
        </p>
      </div>

      <PosterForm mode="edit" initialData={poster} />
    </div>
  );
}
