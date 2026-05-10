"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { deleteArea } from "../_actions";

type CascadeCounts = {
  projects: number;
  tech: number;
  images: number;
  links: number;
};

type DeleteAreaConfirmProps = {
  areaId: string;
  areaSlug: string;
  areaTitle: string;
  areaDescription: string;
  cascadeCounts: CascadeCounts;
};

const INPUT_CLASSES =
  "w-full px-4 py-2.5 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

export function DeleteAreaConfirm({
  areaId,
  areaSlug,
  areaTitle,
  areaDescription,
  cascadeCounts,
}: DeleteAreaConfirmProps) {
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const isConfirmed = confirmText === areaSlug;
  const hasCascadeImpact =
    cascadeCounts.projects > 0 ||
    cascadeCounts.tech > 0 ||
    cascadeCounts.images > 0 ||
    cascadeCounts.links > 0;

  async function handleDelete() {
    if (!isConfirmed || isDeleting) return;

    setError(null);
    setIsDeleting(true);

    try {
      const result = await deleteArea(areaId);

      if (result && !result.success) {
        setError(result.error);
        setIsDeleting(false);
      }
      // Success case: server action redirects, no need to handle
    } catch (err) {
      // NEXT_REDIRECT is expected, real errors fall through
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan.";
      if (!errorMessage.includes("NEXT_REDIRECT")) {
        setError(errorMessage);
        setIsDeleting(false);
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* Area context card */}
      <div className="bg-soft border border-border rounded-lg p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">
          Area yang akan dihapus
        </p>
        <h2 className="text-xl font-medium text-foreground mb-2">
          {areaTitle}
        </h2>
        <code className="font-mono text-xs text-muted bg-background px-2 py-1 rounded inline-block mb-3">
          {areaSlug}
        </code>
        <p className="text-sm text-muted leading-relaxed">{areaDescription}</p>
      </div>

      {/* Cascade warning */}
      {hasCascadeImpact && (
        <div className="border border-foreground/40 rounded-lg p-6 bg-soft">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground mb-3">
            Peringatan: Cascade Delete
          </p>
          <p className="text-sm text-foreground leading-relaxed mb-4">
            Menghapus area ini akan otomatis menghapus seluruh data terkait:
          </p>
          <ul className="space-y-1.5 text-sm text-foreground">
            {cascadeCounts.projects > 0 && (
              <li className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted w-8 text-right">
                  {cascadeCounts.projects}
                </span>
                <span>project</span>
              </li>
            )}
            {cascadeCounts.tech > 0 && (
              <li className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted w-8 text-right">
                  {cascadeCounts.tech}
                </span>
                <span>tech tag</span>
              </li>
            )}
            {cascadeCounts.images > 0 && (
              <li className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted w-8 text-right">
                  {cascadeCounts.images}
                </span>
                <span>image record</span>
              </li>
            )}
            {cascadeCounts.links > 0 && (
              <li className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted w-8 text-right">
                  {cascadeCounts.links}
                </span>
                <span>action link</span>
              </li>
            )}
          </ul>
          <p className="text-xs text-muted leading-relaxed mt-4">
            Data tidak dapat dipulihkan setelah dihapus.
          </p>
        </div>
      )}

      {/* Slug typing confirmation */}
      <div className="space-y-3">
        <label htmlFor="confirm-slug" className="block">
          <span className="font-mono text-xs uppercase tracking-widest text-foreground block mb-1">
            Konfirmasi penghapusan
          </span>
          <span className="text-xs text-muted block mb-2">
            Ketik{" "}
            <code className="font-mono text-foreground bg-soft px-1.5 py-0.5 rounded">
              {areaSlug}
            </code>{" "}
            untuk mengaktifkan tombol hapus.
          </span>
        </label>
        <input
          id="confirm-slug"
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder={areaSlug}
          disabled={isDeleting}
          autoComplete="off"
          spellCheck={false}
          className={INPUT_CLASSES}
        />
      </div>

      {/* Error display */}
      {error && (
        <div
          role="alert"
          className="px-4 py-3 bg-soft border border-foreground/30 rounded-md"
        >
          <p className="text-sm text-foreground">{error}</p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={handleDelete}
          disabled={!isConfirmed || isDeleting}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background font-mono text-xs uppercase tracking-widest rounded-md hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Trash2 size={14} strokeWidth={1.8} />
          {isDeleting ? "Menghapus..." : "Hapus Permanen"}
        </button>

        <Link
          href="/admin/areas"
          className="px-5 py-2.5 text-foreground font-mono text-xs uppercase tracking-widest rounded-md hover:bg-soft transition-colors"
        >
          Batal
        </Link>
      </div>
    </div>
  );
}
