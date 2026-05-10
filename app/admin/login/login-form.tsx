"use client";

import { useState } from "react";
import { signInAction } from "./actions";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setIsLoading(true);

    try {
      const result = await signInAction(formData);

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setIsLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="font-mono text-xs uppercase tracking-widest text-muted block"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={isLoading}
          className="w-full px-4 py-3 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-colors disabled:opacity-60"
          placeholder="firman@example.com"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="font-mono text-xs uppercase tracking-widest text-muted block"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          disabled={isLoading}
          className="w-full px-4 py-3 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-colors disabled:opacity-60"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="px-4 py-3 bg-background border border-border rounded-md"
        >
          <p className="text-sm text-foreground">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest rounded-md hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? "Loading..." : "Masuk"}
      </button>
    </form>
  );
}
