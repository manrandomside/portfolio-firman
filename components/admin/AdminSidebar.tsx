"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  Image as ImageIcon,
  Layers,
  LayoutDashboard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  matchPattern: RegExp;
};

const navItems: NavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    matchPattern: /^\/admin\/?$/,
  },
  {
    href: "/admin/areas",
    label: "Impact Areas",
    icon: Layers,
    matchPattern: /^\/admin\/areas/,
  },
  {
    href: "/admin/projects",
    label: "Projects",
    icon: FolderKanban,
    matchPattern: /^\/admin\/projects/,
  },
  {
    href: "/admin/posters",
    label: "Posters",
    icon: ImageIcon,
    matchPattern: /^\/admin\/posters/,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden md:block w-60 bg-soft border-r border-border"
      aria-label="Admin navigation"
    >
      <nav className="sticky top-16 px-4 py-8">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-4 px-3">
          Manage
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.matchPattern.test(pathname);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-background text-foreground font-medium"
                      : "text-muted hover:text-foreground hover:bg-background"
                  )}
                >
                  <Icon size={16} strokeWidth={1.6} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
