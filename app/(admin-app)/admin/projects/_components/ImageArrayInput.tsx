"use client";

import { useState } from "react";
import { Plus, X, Image as ImageIcon } from "lucide-react";

type ImageItem = {
  id: string;
  file: File | null;
  label: string;
  aspect: "video" | "square" | "portrait";
  previewUrl: string | null;
};

type ImageArrayInputProps = {
  disabled?: boolean;
  maxImages?: number;
  maxSizeMB?: number;
};

const INPUT_CLASSES =
  "w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-colors disabled:opacity-60";

const SELECT_CLASSES =
  "px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-colors disabled:opacity-60";

export function ImageArrayInput({
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
  const [error, setError] = useState<string | null>(null);

  function addItem() {
    if (items.length >= maxImages) return;
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

  return (
    <div className="space-y-4">
      {error && (
        <div
          role="alert"
          className="px-4 py-3 bg-soft border border-foreground/30 rounded-md"
        >
          <p className="text-sm text-foreground">{error}</p>
        </div>
      )}

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

      <button
        type="button"
        onClick={addItem}
        disabled={disabled || items.length >= maxImages}
        className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted hover:text-foreground transition-colors disabled:opacity-60"
      >
        <Plus size={14} strokeWidth={1.8} />
        Tambah Image {items.length >= maxImages && `(max ${maxImages})`}
      </button>
    </div>
  );
}
