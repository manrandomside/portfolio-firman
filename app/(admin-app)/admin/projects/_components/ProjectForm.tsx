"use client";

import { useState } from "react";
import Link from "next/link";
import { createProject } from "../_actions";
import { TechArrayInput } from "./TechArrayInput";
import { ImageArrayInput } from "./ImageArrayInput";
import { LinkArrayInput } from "./LinkArrayInput";

type Area = {
  id: string;
  title: string;
  slug: string;
};

type ProjectFormProps = {
  mode: "create";
  areas: Area[];
};

const INPUT_CLASSES =
  "w-full px-4 py-2.5 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-colors disabled:opacity-60";

export function ProjectForm({ areas }: ProjectFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await createProject(formData);

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

  return (
    <form action={handleSubmit} className="space-y-10">
      {/* SECTION: Basic Info */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-foreground mb-1">
            Basic Info
          </h2>
          <p className="text-xs text-muted">Detail dasar project</p>
        </div>

        <FormField
          label="Area"
          htmlFor="area_id"
          hint="Impact area parent untuk project ini."
        >
          <select
            id="area_id"
            name="area_id"
            required
            defaultValue=""
            disabled={isSubmitting}
            className={INPUT_CLASSES}
          >
            <option value="" disabled>
              Pilih area...
            </option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.title}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          label="Number"
          htmlFor="number"
          hint="Nomor urut dalam area (e.g., 01, 02)."
        >
          <input
            id="number"
            name="number"
            type="text"
            required
            disabled={isSubmitting}
            placeholder="01"
            className={`${INPUT_CLASSES} max-w-[120px]`}
          />
        </FormField>

        <FormField label="Title" htmlFor="title">
          <input
            id="title"
            name="title"
            type="text"
            required
            disabled={isSubmitting}
            placeholder="Kelola SDM PT Gapura Angkasa"
            className={INPUT_CLASSES}
          />
        </FormField>

        <FormField
          label="Role & Timeline"
          htmlFor="role_timeline"
          hint="Format: 'Role · Periode · Konteks'"
        >
          <input
            id="role_timeline"
            name="role_timeline"
            type="text"
            required
            disabled={isSubmitting}
            placeholder="Fullstack Developer · Jul-Des 2025 · OJT"
            className={INPUT_CLASSES}
          />
        </FormField>

        <FormField label="Description" htmlFor="description">
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            disabled={isSubmitting}
            placeholder="Deskripsi project, konteks, dan key learnings..."
            className={`${INPUT_CLASSES} resize-y`}
          />
        </FormField>

        <FormField
          label="Display Order"
          htmlFor="display_order"
          hint="Urutan tampil dalam area."
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

      {/* SECTION: Tech Stack */}
      <section className="space-y-4 pt-8 border-t border-border">
        <div>
          <h2 className="text-lg font-medium text-foreground mb-1">
            Tech Stack
          </h2>
          <p className="text-xs text-muted">
            Tag teknologi yang dipakai. Minimal 1 tag.
          </p>
        </div>

        <TechArrayInput disabled={isSubmitting} />
      </section>

      {/* SECTION: Images */}
      <section className="space-y-4 pt-8 border-t border-border">
        <div>
          <h2 className="text-lg font-medium text-foreground mb-1">Images</h2>
          <p className="text-xs text-muted">
            Screenshot atau gambar project. Maks 10 gambar, 5MB per gambar.
          </p>
        </div>

        <ImageArrayInput disabled={isSubmitting} />
      </section>

      {/* SECTION: Links */}
      <section className="space-y-4 pt-8 border-t border-border">
        <div>
          <h2 className="text-lg font-medium text-foreground mb-1">Links</h2>
          <p className="text-xs text-muted">
            Action links (View Code, Live Demo, dll).
          </p>
        </div>

        <LinkArrayInput disabled={isSubmitting} />
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
          {isSubmitting ? "Menyimpan..." : "Tambah Project"}
        </button>

        <Link
          href="/admin/projects"
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
        {hint && (
          <span className="text-xs text-muted block mb-2">{hint}</span>
        )}
      </label>
      {children}
    </div>
  );
}
