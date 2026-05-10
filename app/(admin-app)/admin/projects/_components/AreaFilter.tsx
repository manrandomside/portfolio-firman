"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Area = {
  id: string;
  slug: string;
  title: string;
};

type AreaFilterProps = {
  areas: Area[];
  currentSlug?: string;
};

const SELECT_CLASSES =
  "px-4 py-2.5 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-colors cursor-pointer";

export function AreaFilter({ areas, currentSlug }: AreaFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams);

    if (value === "all") {
      params.delete("area");
    } else {
      params.set("area", value);
    }

    const queryString = params.toString();
    router.push(`/admin/projects${queryString ? `?${queryString}` : ""}`);
  }

  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="area-filter"
        className="font-mono text-xs uppercase tracking-widest text-muted"
      >
        Filter by Area:
      </label>
      <select
        id="area-filter"
        value={currentSlug ?? "all"}
        onChange={(e) => handleChange(e.target.value)}
        className={SELECT_CLASSES}
      >
        <option value="all">All Areas</option>
        {areas.map((area) => (
          <option key={area.id} value={area.slug}>
            {area.title}
          </option>
        ))}
      </select>
    </div>
  );
}
