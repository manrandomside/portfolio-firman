"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Perjalanan", href: "#perjalanan" },
  { label: "Karya", href: "#karya" },
  { label: "Kolaborasi", href: "#kolaborasi" },
];

type Lang = "id" | "en";

export function Nav() {
  const [lang, setLang] = useState<Lang>("id");
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header className="bg-background/80 border-border supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur-md">
      <div className="container-narrow flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="text-foreground text-xl font-semibold tracking-tight"
        >
          Firman
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted hover:text-foreground text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="border-border hidden items-center rounded-full border p-1 md:flex">
            <button
              type="button"
              onClick={() => setLang("id")}
              aria-pressed={lang === "id"}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                lang === "id"
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground"
              )}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                lang === "en"
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground"
              )}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={
              mounted
                ? isDark
                  ? "Switch to light mode"
                  : "Switch to dark mode"
                : "Toggle theme"
            }
            className="text-muted hover:text-foreground hover:bg-border rounded-md p-2 transition-colors"
          >
            {mounted ? (
              isDark ? (
                <Sun size={18} aria-hidden />
              ) : (
                <Moon size={18} aria-hidden />
              )
            ) : (
              <span className="block h-[18px] w-[18px]" aria-hidden />
            )}
          </button>

          <button
            type="button"
            aria-label="Open menu"
            className="text-muted hover:text-foreground hover:bg-border rounded-md p-2 transition-colors md:hidden"
          >
            <Menu size={18} aria-hidden />
          </button>
        </div>
      </div>
    </header>
  );
}
