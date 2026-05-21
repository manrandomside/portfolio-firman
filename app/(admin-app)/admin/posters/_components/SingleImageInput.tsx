"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Image as ImageIcon, X } from "lucide-react";

type SingleImageInputProps = {
  disabled?: boolean;
  maxSizeMB?: number;
  existingImageUrl?: string | null;
  existingImageLabel?: string;
  required?: boolean;
};

export function SingleImageInput({
  disabled = false,
  maxSizeMB = 5,
  existingImageUrl = null,
  existingImageLabel = "",
  required = true,
}: SingleImageInputProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleFileChange(selectedFile: File | null) {
    setError(null);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File terlalu besar (max ${maxSizeMB}MB).`);
      setPreviewUrl(null);
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("File bukan image yang valid.");
      setPreviewUrl(null);
      return;
    }

    const newPreviewUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(newPreviewUrl);
  }

  function clearFile() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setError(null);

    const input = document.getElementById("image_file") as HTMLInputElement | null;
    if (input) input.value = "";
  }

  const showNewPreview = previewUrl !== null;
  const showExistingPreview = !showNewPreview && existingImageUrl !== null;

  return (
    <div className="space-y-3">
      {/* Preview area */}
      <div className="border border-border rounded-lg p-4 bg-soft">
        {showNewPreview && previewUrl ? (
          <div className="relative">
            <div className="aspect-[3/4] w-full max-w-xs mx-auto rounded-md overflow-hidden border border-border bg-background relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="New image preview"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between mt-3 px-1">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                New image
              </span>
              <button
                type="button"
                onClick={clearFile}
                disabled={disabled}
                className="inline-flex items-center gap-1 text-xs text-muted hover:text-foreground transition-colors disabled:opacity-60"
                aria-label="Remove selected file"
              >
                <X size={12} strokeWidth={1.6} />
                Hapus pilihan
              </button>
            </div>
          </div>
        ) : showExistingPreview && existingImageUrl ? (
          <div>
            <div className="aspect-[3/4] w-full max-w-xs mx-auto rounded-md overflow-hidden border border-border bg-background relative">
              <Image
                src={existingImageUrl}
                alt={existingImageLabel || "Existing image"}
                fill
                className="object-cover"
                unoptimized
                sizes="(max-width: 640px) 100vw, 320px"
              />
            </div>
            <p className="text-xs text-muted text-center mt-3 font-mono uppercase tracking-widest">
              Existing image — upload baru untuk replace
            </p>
          </div>
        ) : (
          <div className="aspect-[3/4] w-full max-w-xs mx-auto rounded-md border border-dashed border-border bg-background grid place-items-center">
            <div className="text-center">
              <ImageIcon
                size={24}
                strokeWidth={1.4}
                className="text-muted mx-auto mb-2"
              />
              <p className="text-xs text-muted">Belum ada gambar</p>
            </div>
          </div>
        )}
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

      {/* File input */}
      <div>
        <input
          id="image_file"
          type="file"
          name="image_file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          required={required && !existingImageUrl}
          disabled={disabled}
          onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
          className="block w-full text-xs text-muted file:mr-3 file:px-3 file:py-1.5 file:rounded-md file:border-0 file:bg-background file:border file:border-border file:text-foreground file:font-mono file:text-xs file:uppercase file:tracking-widest file:cursor-pointer hover:file:bg-soft transition-colors"
        />
        <p className="text-xs text-muted mt-2">
          JPG, PNG, WebP, atau GIF. Max {maxSizeMB}MB. Aspect ratio 3:4 (portrait) recommended.
        </p>
      </div>
    </div>
  );
}
