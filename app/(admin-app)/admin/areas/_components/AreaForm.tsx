"use client";

import { useState } from "react";
import Link from "next/link";
import { createArea, updateArea } from "../_actions";

type AreaInitialData = {
  id: string;
  slug: string;
  number_label: string;
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
};

type AreaFormProps =
  | { mode: "create"; initialData?: never }
  | { mode: "edit"; initialData: AreaInitialData };

// Available lucide icons that fit editorial monochrome aesthetic
const ICON_OPTIONS = [
  { value: "Code2", label: "Code2 (engineering, brackets)" },
  { value: "Target", label: "Target (focus, exploration)" },
  { value: "LayoutGrid", label: "LayoutGrid (visual, composition)" },
  { value: "Layers", label: "Layers (stacked, structure)" },
  { value: "Compass", label: "Compass (navigation, direction)" },
  { value: "Lightbulb", label: "Lightbulb (idea, innovation)" },
  { value: "Sparkles", label: "Sparkles (creative, polish)" },
  { value: "Workflow", label: "Workflow (process, system)" },
];

const INPUT_CLASSES =
  "w-full px-4 py-2.5 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

export function AreaForm(props: AreaFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEdit = props.mode === "edit";
  const initialData = isEdit ? props.initialData : null;

  async function handleSubmit(formData: FormData) {
    setError(null);
    setIsSubmitting(true);

    try {
      const result = isEdit
        ? await updateArea(initialData!.id, formData)
        : await createArea(formData);

      if (result && !result.success) {
        setError(result.error);
        setIsSubmitting(false);
      }
      // Success case: server action redirects, no need to handle
    } catch (err) {
      // Next.js redirect throws NEXT_REDIRECT internally, that is expected
      // Real errors land here
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan tidak terduga.";
      if (!errorMessage.includes("NEXT_REDIRECT")) {
        setError(errorMessage);
        setIsSubmitting(false);
      }
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Slug */}
      <FormField
        label="Slug"
        htmlFor="slug"
        hint="URL path. Hanya huruf kecil, angka, dan tanda hubung."
      >
        <input
          id="slug"
          name="slug"
          type="text"
          required
          pattern="[a-z0-9-]+"
          defaultValue={initialData?.slug ?? ""}
          disabled={isSubmitting}
          placeholder="software-engineering"
          className={INPUT_CLASSES}
        />
      </FormField>

      {/* Title */}
      <FormField
        label="Title"
        htmlFor="title"
        hint="Judul yang ditampilkan di card homepage."
      >
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={initialData?.title ?? ""}
          disabled={isSubmitting}
          placeholder="Software Engineering"
          className={INPUT_CLASSES}
        />
      </FormField>

      {/* Number Label */}
      <FormField
        label="Number Label"
        htmlFor="number_label"
        hint="Label di atas title. Format: '01 / Kategori'."
      >
        <input
          id="number_label"
          name="number_label"
          type="text"
          required
          defaultValue={initialData?.number_label ?? ""}
          disabled={isSubmitting}
          placeholder="01 / Engineering"
          className={INPUT_CLASSES}
        />
      </FormField>

      {/* Description */}
      <FormField
        label="Description"
        htmlFor="description"
        hint="Deskripsi singkat 1-2 kalimat."
      >
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          defaultValue={initialData?.description ?? ""}
          disabled={isSubmitting}
          placeholder="Membangun produk web end-to-end dengan stack modern..."
          className={`${INPUT_CLASSES} resize-y`}
        />
      </FormField>

      {/* Icon Name */}
      <FormField
        label="Icon"
        htmlFor="icon_name"
        hint="Icon dari lucide-react untuk card homepage."
      >
        <select
          id="icon_name"
          name="icon_name"
          required
          defaultValue={initialData?.icon_name ?? "Code2"}
          disabled={isSubmitting}
          className={INPUT_CLASSES}
        >
          {ICON_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FormField>

      {/* Display Order */}
      <FormField
        label="Display Order"
        htmlFor="display_order"
        hint="Urutan tampil. Semakin kecil = semakin atas."
      >
        <input
          id="display_order"
          name="display_order"
          type="number"
          min="0"
          required
          defaultValue={initialData?.display_order ?? 0}
          disabled={isSubmitting}
          className={`${INPUT_CLASSES} max-w-[120px]`}
        />
      </FormField>

      {/* Error display */}
      {error && (
        <div
          role="alert"
          className="px-4 py-3 bg-soft border border-foreground/30 rounded-md"
        >
          <p className="text-sm text-foreground">{error}</p>
        </div>
      )}

      {/* Submit + Cancel */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 bg-foreground text-background font-mono text-xs uppercase tracking-widest rounded-md hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? "Menyimpan..."
            : isEdit
              ? "Simpan Perubahan"
              : "Tambah Area"}
        </button>

        <Link
          href="/admin/areas"
          className="px-5 py-2.5 text-foreground font-mono text-xs uppercase tracking-widest rounded-md hover:bg-soft transition-colors"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}

// Reusable form field wrapper with label + hint
function FormField({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground block mb-1">
          {label}
        </span>
        {hint && (
          <span className="text-xs text-muted block mb-2">{hint}</span>
        )}
      </label>
      {children}
    </div>
  );
}
