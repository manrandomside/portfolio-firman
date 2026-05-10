import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AreaForm } from "../_components/AreaForm";

export const metadata = {
  title: "Tambah Impact Area — Admin",
};

export default function NewAreaPage() {
  return (
    <div className="max-w-2xl">
      {/* Header with back link */}
      <Link
        href="/admin/areas"
        className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8 font-mono text-xs uppercase tracking-widest"
      >
        <ArrowLeft size={14} strokeWidth={1.6} />
        Kembali ke Areas
      </Link>

      <div className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">
          Admin / Areas / New
        </p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-3">
          Tambah Impact Area
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          Buat kategori karya baru untuk ditampilkan di homepage.
        </p>
      </div>

      <AreaForm mode="create" />
    </div>
  );
}
