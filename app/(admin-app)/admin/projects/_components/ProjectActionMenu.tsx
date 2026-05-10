"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

type ProjectActionMenuProps = {
  projectId: string;
  projectTitle: string;
};

export function ProjectActionMenu({
  projectId,
  projectTitle,
}: ProjectActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-md hover:bg-background transition-colors text-muted hover:text-foreground"
        aria-label={`Actions for ${projectTitle}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <MoreHorizontal size={16} strokeWidth={1.8} />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1 w-44 bg-background border border-border rounded-md shadow-lg z-10 py-1"
        >
          <Link
            href={`/admin/projects/${projectId}/edit`}
            role="menuitem"
            className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-foreground hover:bg-soft transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Pencil size={14} strokeWidth={1.6} />
            Edit
          </Link>

          <Link
            href={`/admin/projects/${projectId}/delete`}
            role="menuitem"
            className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-foreground hover:bg-soft transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Trash2 size={14} strokeWidth={1.6} />
            Delete
          </Link>
        </div>
      )}
    </div>
  );
}
