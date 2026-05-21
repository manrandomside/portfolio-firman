"use client";

import { useState } from "react";
import Link from "next/link";
import { createPoster } from "../_actions";
import { ToolsArrayInput } from "./ToolsArrayInput";
import { SingleImageInput } from "./SingleImageInput";

type PosterFormProps = {
  mode: "create";
};

const INPUT_CLASSES =
  "w-full px-4 py-2.5 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-colors disabled:opacity-60";

export function PosterForm({ mode }: PosterFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await createPoster(formData);

      if (result && !result.success) {
        setError(result.error);
        setIsSubmitting(false);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan.";
      if (!errorMessage.includes("NEXT_REDIRECT")) {
        setError(errorMessage);
        setIsSubmitting(false);
      }
    }
  }

  const currentYear = new Date().getFullYear();

  return (
    <form action={handleSubmit} className="space-y-10">
      {/* SECTION: Basic Info */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-foreground mb-1">
            Basic Info
          </h2>
          <p className="text-xs text-muted">Detail dasar poster</p>
        </div>

        <FormField label="Title" htmlFor="title">
          <input
            id="title"
            name="title"
            type="text"
            required
            disabled={isSubmitting}
            placeholder="Cultural Identity Series"
            className={INPUT_CLASSES}
          />
        </FormField>

        <FormField label="Topic" htmlFor="topic" hint="Tema atau subject poster.">
          <input
            id="topic"
            name="topic"
            type="text"
            required
            disabled={isSubmitting}
            placeholder="Cultural identity"
            className={INPUT_CLASSES}
          />
        </FormField>

        <FormField label="Year" htmlFor="year">
          <input
            id="year"
            name="year"
            type="number"
            min="1900"
            max="2100"
            required
            defaultValue={currentYear}
            disabled={isSubmitting}
            className={`${INPUT_CLASSES} max-w-[120px]`}
          />
        </FormField>

        <FormField
          label="Display Order"
          htmlFor="display_order"
          hint="Urutan tampil di grid."
        >
          <input
            id="display_order"
            name="display_order"
            type="number"
            min="0"
            required
            defaultValue={0}
            disabled={isSubmitting}
            className={`${INPUT_CLASSES} max-w-[120px]`}
          />
        </FormField>
      </section>

      {/* SECTION: Tools */}
      <section className="space-y-4 pt-8 border-t border-border">
        <div>
          <h2 className="text-lg font-medium text-foreground mb-1">Tools</h2>
          <p className="text-xs text-muted">
            Software yang dipakai untuk karya ini. Minimal 1 tool.
          </p>
        </div>

        <ToolsArrayInput disabled={isSubmitting} />
      </section>

      {/* SECTION: Image */}
      <section className="space-y-4 pt-8 border-t border-border">
        <div>
          <h2 className="text-lg font-medium text-foreground mb-1">Image</h2>
          <p className="text-xs text-muted">
            File gambar poster. Max 5MB. Aspect ratio 3:4 (portrait) recommended.
          </p>
        </div>

        <SingleImageInput
          disabled={isSubmitting}
          required={mode === "create"}
        />

        <FormField
          label="Image Label"
          htmlFor="image_label"
          hint="Deskripsi pendek gambar (untuk alt text)."
        >
          <input
            id="image_label"
            name="image_label"
            type="text"
            required
            disabled={isSubmitting}
            placeholder="Hero composition with traditional motifs"
            className={INPUT_CLASSES}
          />
        </FormField>
      </section>

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
      <div className="flex flex-wrap items-center gap-3 pt-8 border-t border-border">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 bg-foreground text-background font-mono text-xs uppercase tracking-widest rounded-md hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Menyimpan..." : "Tambah Poster"}
        </button>

        <Link
          href="/admin/posters"
          className="px-5 py-2.5 text-foreground font-mono text-xs uppercase tracking-widest rounded-md hover:bg-soft transition-colors"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}

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
        {hint && <span className="text-xs text-muted block mb-2">{hint}</span>}
      </label>
      {children}
    </div>
  );
}
