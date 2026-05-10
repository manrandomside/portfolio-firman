import Link from "next/link";
import { Layers, Plus } from "lucide-react";

export function EmptyState() {
  return (
    <div className="border border-dashed border-border rounded-lg p-12 text-center">
      <div className="w-12 h-12 mx-auto mb-5 grid place-items-center bg-soft border border-border rounded-full">
        <Layers size={20} strokeWidth={1.4} className="text-muted" />
      </div>

      <h2 className="text-lg font-medium text-foreground mb-2">
        Belum ada Impact Area
      </h2>

      <p className="text-sm text-muted leading-relaxed max-w-sm mx-auto mb-6">
        Mulai dengan menambahkan kategori karya pertama. Setiap area akan
        ditampilkan sebagai card di homepage.
      </p>

      <Link
        href="/admin/areas/new"
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-foreground text-background font-mono text-xs uppercase tracking-widest rounded-md hover:opacity-90 transition-opacity"
      >
        <Plus size={14} strokeWidth={2} />
        Tambah Area
      </Link>
    </div>
  );
}
