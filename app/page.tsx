"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function HomePage() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return (
    <main className="bg-background flex min-h-screen items-center justify-center">
      <div className="container-narrow text-center">
        <h1 className="text-foreground text-5xl font-medium tracking-tight">
          Portfolio Firman
        </h1>
        <p className="text-muted mt-4 text-lg">Foundation ready</p>
        <hr className="border-border mx-auto mt-12 w-24 border-t" />

        <div className="border-border mx-auto mt-12 max-w-md border-t pt-8">
          <p className="text-muted font-mono text-xs uppercase tracking-widest">
            Theme test (temporary)
          </p>
          <p className="text-foreground mt-3 text-sm">
            {mounted
              ? `Selected: ${theme} · Resolved: ${resolvedTheme}`
              : "Loading…"}
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className="border-border text-foreground hover:bg-foreground hover:text-background border px-3 py-1.5 text-sm transition-colors"
            >
              Light
            </button>
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className="border-border text-foreground hover:bg-foreground hover:text-background border px-3 py-1.5 text-sm transition-colors"
            >
              Dark
            </button>
            <button
              type="button"
              onClick={() => setTheme("system")}
              className="border-border text-foreground hover:bg-foreground hover:text-background border px-3 py-1.5 text-sm transition-colors"
            >
              System
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
