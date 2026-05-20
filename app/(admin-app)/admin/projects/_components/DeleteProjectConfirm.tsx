"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { deleteProject } from "../_actions";

type CascadeCounts = {
  tech: number;
  images: number;
  links: number;
};

type DeleteProjectConfirmProps = {
  projectId: string;
  projectTitle: string;
  projectNumber: string;
  projectRoleTimeline: string;
  areaTitle: string;
  cascadeCounts: CascadeCounts;
};

const INPUT_CLASSES =
  "w-full px-4 py-2.5 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

export function DeleteProjectConfirm({
  projectId,
  projectTitle,
  projectNumber,
  projectRoleTimeline,
  areaTitle,
  cascadeCounts,
}: DeleteProjectConfirmProps) {
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const isConfirmed = confirmText === projectTitle;
  const hasCascadeImpact =
    cascadeCounts.tech > 0 ||
    cascadeCounts.images > 0 ||
    cascadeCounts.links > 0;

  async function handleDelete() {
    if (!isConfirmed || isDeleting) return;

    setError(null);
    setIsDeleting(true);

    try {
      const result = await deleteProject(projectId);

      if (result && !result.success) {
        setError(result.error);
        setIsDeleting(false);
      }
    } catch (err) {
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
      {/* Project context card */}
      <div className="bg-soft border border-border rounded-lg p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">
          Project yang akan dihapus
        </p>
        <div className="flex items-baseline gap-3 mb-2 flex-wrap">
          <code className="font-mono text-xs text-muted bg-background px-2 py-1 rounded">
            #{projectNumber}
          </code>
          <h2 className="text-xl font-medium text-foreground">
            {projectTitle}
          </h2>
        </div>
        <p className="text-sm text-muted leading-relaxed mb-4">
          {projectRoleTimeline}
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Area:
          </span>
          <span className="inline-block font-mono text-xs uppercase tracking-wider text-foreground bg-background border border-border rounded-full px-2.5 py-1">
            {areaTitle}
          </span>
        </div>
      </div>

      {/* Cascade warning */}
      {hasCascadeImpact && (
        <div className="border border-foreground/40 rounded-lg p-6 bg-soft">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground mb-3">
            Peringatan: Cascade Delete
          </p>
          <p className="text-sm text-foreground leading-relaxed mb-4">
            Menghapus project ini akan otomatis menghapus seluruh data terkait:
          </p>
          <ul className="space-y-1.5 text-sm text-foreground">
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
                <span>image (DB record dan file di Storage)</span>
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
            File gambar di Supabase Storage juga akan dihapus permanen. Data
            tidak dapat dipulihkan.
          </p>
        </div>
      )}

      {/* Title typing confirmation */}
      <div className="space-y-3">
        <label htmlFor="confirm-title" className="block">
          <span className="font-mono text-xs uppercase tracking-widest text-foreground block mb-1">
            Konfirmasi penghapusan
          </span>
          <span className="text-xs text-muted block mb-2">
            Ketik judul project{" "}
            <code className="font-mono text-foreground bg-soft px-1.5 py-0.5 rounded">
              {projectTitle}
            </code>{" "}
            untuk mengaktifkan tombol hapus.
          </span>
        </label>
        <input
          id="confirm-title"
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder={projectTitle}
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
          href="/admin/projects"
          className="px-5 py-2.5 text-foreground font-mono text-xs uppercase tracking-widest rounded-md hover:bg-soft transition-colors"
        >
          Batal
        </Link>
      </div>
    </div>
  );
}
