"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Image as ImageIcon } from "lucide-react";
import { deletePoster } from "../_actions";

type DeletePosterConfirmProps = {
  posterId: string;
  posterTitle: string;
  posterTopic: string;
  posterYear: string;
  posterTools: string[];
  posterImageUrl: string | null;
  posterImageLabel: string;
  hasStorageFile: boolean;
};

const INPUT_CLASSES =
  "w-full px-4 py-2.5 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

export function DeletePosterConfirm({
  posterId,
  posterTitle,
  posterTopic,
  posterYear,
  posterTools,
  posterImageUrl,
  posterImageLabel,
  hasStorageFile,
}: DeletePosterConfirmProps) {
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const isConfirmed = confirmText === posterTitle;

  async function handleDelete() {
    if (!isConfirmed || isDeleting) return;

    setError(null);
    setIsDeleting(true);

    try {
      const result = await deletePoster(posterId);

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
      {/* Poster context card */}
      <div className="bg-soft border border-border rounded-lg p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
          Poster yang akan dihapus
        </p>

        <div className="flex flex-col sm:flex-row gap-5">
          {/* Image preview */}
          <div className="flex-shrink-0">
            {posterImageUrl ? (
              <div className="w-32 h-40 rounded-md overflow-hidden border border-border bg-background relative">
                <Image
                  src={posterImageUrl}
                  alt={posterImageLabel}
                  fill
                  className="object-cover"
                  unoptimized
                  sizes="128px"
                />
              </div>
            ) : (
              <div className="w-32 h-40 rounded-md border border-dashed border-border bg-background grid place-items-center">
                <ImageIcon
                  size={24}
                  strokeWidth={1.4}
                  className="text-muted"
                />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 space-y-2">
            <h2 className="text-xl font-medium text-foreground">
              {posterTitle}
            </h2>
            <p className="text-sm text-muted">
              {posterTopic} · <span className="font-mono">{posterYear}</span>
            </p>

            {posterTools.length > 0 && (
              <div className="flex items-center flex-wrap gap-1.5 pt-2">
                {posterTools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-block font-mono text-[10px] uppercase tracking-wider text-foreground bg-background border border-border rounded-full px-2 py-0.5"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Warning about Storage file (only if has one) */}
      {hasStorageFile && (
        <div className="border border-foreground/40 rounded-lg p-6 bg-soft">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground mb-3">
            Peringatan
          </p>
          <p className="text-sm text-foreground leading-relaxed">
            File gambar di Supabase Storage juga akan dihapus permanen. Data tidak dapat dipulihkan.
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
            Ketik judul poster{" "}
            <code className="font-mono text-foreground bg-soft px-1.5 py-0.5 rounded">
              {posterTitle}
            </code>{" "}
            untuk mengaktifkan tombol hapus.
          </span>
        </label>
        <input
          id="confirm-title"
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder={posterTitle}
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
          href="/admin/posters"
          className="px-5 py-2.5 text-foreground font-mono text-xs uppercase tracking-widest rounded-md hover:bg-soft transition-colors"
        >
          Batal
        </Link>
      </div>
    </div>
  );
}
