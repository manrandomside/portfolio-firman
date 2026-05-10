import Link from "next/link";
import { signOut } from "@/lib/supabase/auth";

type AdminTopBarProps = {
  userEmail: string;
};

export function AdminTopBar({ userEmail }: AdminTopBarProps) {
  return (
    <header className="sticky top-0 z-40 h-16 bg-background border-b border-border flex items-center justify-between px-6 md:px-8">
      <div className="flex items-center gap-3">
        <Link href="/admin" className="flex items-center gap-2.5 group">
          <span
            className="w-7 h-7 grid place-items-center border border-border rounded-md font-mono text-xs font-medium text-foreground transition-colors group-hover:border-foreground"
            aria-hidden
          >
            F
          </span>
          <span className="font-medium text-foreground">Admin</span>
        </Link>

        <span className="font-mono text-xs uppercase tracking-widest text-muted hidden sm:inline">
          / Firman Portfolio
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-mono text-xs uppercase tracking-widest text-muted hidden md:inline">
          {userEmail}
        </span>

        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors hidden sm:inline"
        >
          View Site →
        </Link>

        <form action={signOut}>
          <button
            type="submit"
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors"
          >
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}
