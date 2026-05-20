"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

type LinkItem = {
  id: string;
  label: string;
  href: string;
  is_external: boolean;
};

type LinkArrayInputProps = {
  initialItems?: LinkItem[];
  disabled?: boolean;
};

const INPUT_CLASSES =
  "w-full px-4 py-2.5 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-colors disabled:opacity-60";

export function LinkArrayInput({
  initialItems = [],
  disabled = false,
}: LinkArrayInputProps) {
  const [items, setItems] = useState<LinkItem[]>(
    initialItems.length > 0
      ? initialItems
      : [
          {
            id: crypto.randomUUID(),
            label: "",
            href: "",
            is_external: true,
          },
        ]
  );

  function addItem() {
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        label: "",
        href: "",
        is_external: true,
      },
    ]);
  }

  function removeItem(id: string) {
    if (items.length === 1) return;
    setItems(items.filter((item) => item.id !== id));
  }

  function updateItem(
    id: string,
    field: keyof Omit<LinkItem, "id">,
    value: string | boolean
  ) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="border border-border rounded-lg p-4 space-y-3"
        >
          <div className="flex items-start justify-between gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Link {index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              disabled={disabled || items.length === 1}
              className="p-1 rounded-md text-muted hover:text-foreground hover:bg-soft transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Remove link"
            >
              <X size={14} strokeWidth={1.6} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              name={`link_${index}_label`}
              value={item.label}
              onChange={(e) => updateItem(item.id, "label", e.target.value)}
              placeholder="Label (e.g., View Code)"
              disabled={disabled}
              className={INPUT_CLASSES}
            />
            <input
              type="text"
              name={`link_${index}_href`}
              value={item.href}
              onChange={(e) => updateItem(item.id, "href", e.target.value)}
              placeholder="URL or path"
              disabled={disabled}
              className={INPUT_CLASSES}
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
            <input
              type="checkbox"
              checked={item.is_external}
              onChange={(e) =>
                updateItem(item.id, "is_external", e.target.checked)
              }
              disabled={disabled}
              className="rounded border-border"
            />
            <span>External link (opens in new tab)</span>
          </label>
          <input
            type="hidden"
            name={`link_${index}_is_external`}
            value={item.is_external.toString()}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        disabled={disabled}
        className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted hover:text-foreground transition-colors disabled:opacity-60"
      >
        <Plus size={14} strokeWidth={1.8} />
        Tambah Link
      </button>
    </div>
  );
}
