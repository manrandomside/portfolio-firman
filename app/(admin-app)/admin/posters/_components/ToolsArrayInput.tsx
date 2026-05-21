"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

type ToolItem = {
  id: string;
  label: string;
};

type ToolsArrayInputProps = {
  initialItems?: ToolItem[];
  disabled?: boolean;
};

const INPUT_CLASSES =
  "w-full px-4 py-2.5 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-colors disabled:opacity-60";

export function ToolsArrayInput({
  initialItems = [],
  disabled = false,
}: ToolsArrayInputProps) {
  const [items, setItems] = useState<ToolItem[]>(
    initialItems.length > 0
      ? initialItems
      : [{ id: crypto.randomUUID(), label: "" }]
  );

  function addItem() {
    setItems([...items, { id: crypto.randomUUID(), label: "" }]);
  }

  function removeItem(id: string) {
    if (items.length === 1) return;
    setItems(items.filter((item) => item.id !== id));
  }

  function updateItem(id: string, value: string) {
    setItems(
      items.map((item) => (item.id === id ? { ...item, label: value } : item))
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.id} className="flex items-center gap-2">
          <input
            type="text"
            name={`tool_${index}_label`}
            value={item.label}
            onChange={(e) => updateItem(item.id, e.target.value)}
            placeholder="e.g., Photoshop, Illustrator, Figma"
            disabled={disabled}
            className={INPUT_CLASSES}
          />
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            disabled={disabled || items.length === 1}
            className="p-2.5 rounded-md text-muted hover:text-foreground hover:bg-soft transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Remove tool"
          >
            <X size={16} strokeWidth={1.6} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        disabled={disabled}
        className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted hover:text-foreground transition-colors disabled:opacity-60"
      >
        <Plus size={14} strokeWidth={1.8} />
        Tambah Tool
      </button>
    </div>
  );
}
