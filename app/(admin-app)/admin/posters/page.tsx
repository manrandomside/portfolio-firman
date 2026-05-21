import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PostersTable } from "./_components/PostersTable";
import { PostersEmptyState } from "./_components/PostersEmptyState";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Posters — Admin",
};

async function getPosters() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posters")
    .select(
      "id, title, topic, year, tools, image_label, storage_path, display_order"
    )
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch posters:", error);
    return [];
  }

  return data.map((poster) => {
    let imageUrl: string | null = null;

    if (poster.storage_path) {
      const { data: urlData } = supabase.storage
        .from("karya-images")
        .getPublicUrl(poster.storage_path);
      imageUrl = urlData.publicUrl;
    }

    return {
      ...poster,
      tools: (poster.tools as string[]) ?? [],
      imageUrl,
    };
  });
}

export default async function AdminPostersPage() {
  const posters = await getPosters();

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">
            Admin / Posters
          </p>
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-2">
            Posters
          </h1>
          <p className="text-sm text-muted leading-relaxed max-w-prose">
            Karya infographic & poster design yang ditampilkan di
            /karya/infographic-design.
          </p>
        </div>

        <Link
          href="/admin/posters/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-foreground text-background font-mono text-xs uppercase tracking-widest rounded-md hover:opacity-90 transition-opacity self-start"
        >
          <Plus size={14} strokeWidth={2} />
          Tambah Poster
        </Link>
      </div>

      {/* Content */}
      {posters.length === 0 ? (
        <PostersEmptyState />
      ) : (
        <PostersTable posters={posters} />
      )}
    </div>
  );
}
