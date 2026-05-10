import Link from "next/link";
import { FolderKanban, Plus } from "lucide-react";

type ProjectsEmptyStateProps = {
  areaFilter?: string;
};

export function ProjectsEmptyState({ areaFilter }: ProjectsEmptyStateProps) {
  const isFiltered = !!areaFilter;

  return (
    <div className="border border-dashed border-border rounded-lg p-12 text-center">
      <div className="w-12 h-12 mx-auto mb-5 grid place-items-center bg-soft border border-border rounded-full">
        <FolderKanban size={20} strokeWidth={1.4} className="text-muted" />
      </div>

      <h2 className="text-lg font-medium text-foreground mb-2">
        {isFiltered
          ? `Belum ada project di ${areaFilter}`
          : "Belum ada Project"}
      </h2>

      <p className="text-sm text-muted leading-relaxed max-w-sm mx-auto mb-6">
        {isFiltered
          ? "Tambah project pertama untuk area ini, atau hapus filter untuk lihat semua project."
          : "Mulai dengan menambahkan project pertama. Setiap project akan ditampilkan di halaman detail karya."}
      </p>

      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-foreground text-background font-mono text-xs uppercase tracking-widest rounded-md hover:opacity-90 transition-opacity"
        >
          <Plus size={14} strokeWidth={2} />
          Tambah Project
        </Link>

        {isFiltered && (
          <Link
            href="/admin/projects"
            className="px-4 py-2.5 text-foreground font-mono text-xs uppercase tracking-widest rounded-md hover:bg-soft transition-colors"
          >
            Clear filter
          </Link>
        )}
      </div>
    </div>
  );
}
