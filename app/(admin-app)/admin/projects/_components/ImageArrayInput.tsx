"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, X, Image as ImageIcon } from "lucide-react";

type ImageItem = {
  id: string;
  file: File | null;
  label: string;
  aspect: "video" | "square" | "portrait";
  previewUrl: string | null;
};

type ExistingImage = {
  id: string;
  storagePath: string;
  label: string;
  aspect: "video" | "square" | "portrait";
  url: string;
};

type ImageArrayInputProps = {
  existingImages?: ExistingImage[];
  disabled?: boolean;
  maxImages?: number;
  maxSizeMB?: number;
};

const INPUT_CLASSES =
  "w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-colors disabled:opacity-60";

const SELECT_CLASSES =
  "px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-colors disabled:opacity-60";

export function ImageArrayInput({
  existingImages = [],
  disabled = false,
  maxImages = 10,
  maxSizeMB = 5,
}: ImageArrayInputProps) {
  const [items, setItems] = useState<ImageItem[]>([
    {
      id: crypto.randomUUID(),
      file: null,
      label: "",
      aspect: "video",
      previewUrl: null,
    },
  ]);
  const [deletedImageIds, setDeletedImageIds] = useState<Set<string>>(
    new Set()
  );
  const [error, setError] = useState<string | null>(null);

  const keptExistingCount = existingImages.filter(
    (img) => !deletedImageIds.has(img.id)
  ).length;
  const newFileCount = items.filter((i) => i.file !== null).length;
  const totalImageCount = keptExistingCount + newFileCount;
  const limitReached = totalImageCount >= maxImages;

  function toggleDelete(imageId: string) {
    const next = new Set(deletedImageIds);
    if (next.has(imageId)) {
      next.delete(imageId);
    } else {
      next.add(imageId);
    }
    setDeletedImageIds(next);
  }

  function addItem() {
    if (limitReached) return;
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        file: null,
        label: "",
        aspect: "video",
        previewUrl: null,
      },
    ]);
  }

  function removeItem(id: string) {
    if (items.length === 1) {
      const current = items[0];
      if (current.previewUrl) {
        URL.revokeObjectURL(current.previewUrl);
      }
      setItems([
        {
          id: crypto.randomUUID(),
          file: null,
          label: "",
          aspect: "video",
          previewUrl: null,
        },
      ]);
      return;
    }

    const item = items.find((i) => i.id === id);
    if (item?.previewUrl) {
      URL.revokeObjectURL(item.previewUrl);
    }

    setItems(items.filter((item) => item.id !== id));
  }

  function handleFileChange(id: string, file: File | null) {
    setError(null);

    if (!file) {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, file: null, previewUrl: null } : item
        )
      );
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File ${file.name} terlalu besar (max ${maxSizeMB}MB).`);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError(`File ${file.name} bukan image yang valid.`);
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setItems(
      items.map((item) => {
        if (item.id !== id) return item;

        if (item.previewUrl) {
          URL.revokeObjectURL(item.previewUrl);
        }

        return { ...item, file, previewUrl };
      })
    );
  }

  function updateLabel(id: string, value: string) {
    setItems(
      items.map((item) => (item.id === id ? { ...item, label: value } : item))
    );
  }

  function updateAspect(id: string, value: ImageItem["aspect"]) {
    setItems(
      items.map((item) => (item.id === id ? { ...item, aspect: value } : item))
    );
  }

  const hasExisting = existingImages.length > 0;

  return (
    <div className="space-y-6">
      {error && (
        <div
          role="alert"
          className="px-4 py-3 bg-soft border border-foreground/30 rounded-md"
        >
          <p className="text-sm text-foreground">{error}</p>
        </div>
      )}

      {hasExisting && (
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Existing Images ({existingImages.length})
          </p>

          {existingImages.map((img, index) => {
            const isMarkedForDelete = deletedImageIds.has(img.id);

            return (
              <div
                key={img.id}
                className={`border rounded-lg p-4 transition-opacity ${
                  isMarkedForDelete
                    ? "border-foreground/20 opacity-40"
                    : "border-border"
                }`}
              >
                <input
                  type="hidden"
                  name={`existing_image_${index}_id`}
                  value={img.id}
                />
                <input
                  type="hidden"
                  name={`existing_image_${index}_delete`}
                  value={isMarkedForDelete ? "true" : "false"}
                />

                <div className="flex gap-3 items-start">
                  <div className="w-24 h-24 rounded-md overflow-hidden border border-border bg-soft flex-shrink-0 relative">
                    <Image
                      src={img.url}
                      alt={img.label}
                      fill
                      className="object-cover"
                      unoptimized
                      sizes="96px"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <p
                      className={`text-sm text-foreground ${
                        isMarkedForDelete ? "line-through" : ""
                      }`}
                    >
                      {img.label}
                    </p>
                    <p className="text-xs text-muted font-mono uppercase">
                      Aspect: {img.aspect}
                    </p>

                    <label className="flex items-center gap-2 text-sm text-muted cursor-pointer mt-2">
                      <input
                        type="checkbox"
                        checked={isMarkedForDelete}
                        onChange={() => toggleDelete(img.id)}
                        disabled={disabled}
                        className="rounded border-border"
                      />
                      <span>Hapus image ini</span>
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          {hasExisting ? "Tambah Image Baru" : "Images"}
        </p>

        {items.map((item, index) => (
          <div
            key={item.id}
            className="border border-border rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                Image {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                disabled={disabled}
                className="p-1 rounded-md text-muted hover:text-foreground hover:bg-soft transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Remove image"
              >
                <X size={14} strokeWidth={1.6} />
              </button>
            </div>

            <div className="flex gap-3 items-start">
              {item.previewUrl ? (
                <div className="w-24 h-24 rounded-md overflow-hidden border border-border bg-soft flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.previewUrl}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-md border border-dashed border-border bg-soft flex-shrink-0 grid place-items-center">
                  <ImageIcon
                    size={20}
                    strokeWidth={1.4}
                    className="text-muted"
                  />
                </div>
              )}

              <div className="flex-1 space-y-2">
                <input
                  type="file"
                  name={`image_${index}_file`}
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(e) =>
                    handleFileChange(item.id, e.target.files?.[0] ?? null)
                  }
                  disabled={disabled}
                  className="block w-full text-xs text-muted file:mr-3 file:px-3 file:py-1.5 file:rounded-md file:border-0 file:bg-background file:border file:border-border file:text-foreground file:font-mono file:text-xs file:uppercase file:tracking-widest file:cursor-pointer hover:file:bg-soft transition-colors"
                />
                <p className="text-xs text-muted">
                  JPG, PNG, WebP, atau GIF. Max {maxSizeMB}MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3">
              <input
                type="text"
                name={`image_${index}_label`}
                value={item.label}
                onChange={(e) => updateLabel(item.id, e.target.value)}
                placeholder="Label (e.g., Dashboard view)"
                disabled={disabled}
                className={INPUT_CLASSES}
              />
              <select
                name={`image_${index}_aspect`}
                value={item.aspect}
                onChange={(e) =>
                  updateAspect(item.id, e.target.value as ImageItem["aspect"])
                }
                disabled={disabled}
                className={SELECT_CLASSES}
              >
                <option value="video">Video (16:9)</option>
                <option value="square">Square (1:1)</option>
                <option value="portrait">Portrait (3:4)</option>
              </select>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={addItem}
            disabled={disabled || limitReached}
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted hover:text-foreground transition-colors disabled:opacity-60"
          >
            <Plus size={14} strokeWidth={1.8} />
            Tambah Image {limitReached && `(max ${maxImages})`}
          </button>
          {hasExisting && (
            <p className="font-mono text-xs text-muted">
              Total: {totalImageCount} / {maxImages}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
