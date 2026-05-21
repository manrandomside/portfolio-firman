import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PosterForm } from "../_components/PosterForm";

export const metadata = {
  title: "Tambah Poster — Admin",
};

export default function NewPosterPage() {
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
          Admin / Posters / New
        </p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-3">
          Tambah Poster
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          Buat poster baru dengan tools yang digunakan dan upload gambar.
        </p>
      </div>

      <PosterForm mode="create" />
    </div>
  );
}
