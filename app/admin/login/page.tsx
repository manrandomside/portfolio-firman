import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/supabase/auth";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Admin Login — Firman Fadilah",
  robots: "noindex, nofollow",
};

export default async function AdminLoginPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div
            className="w-12 h-12 grid place-items-center border border-border rounded-md font-mono text-sm font-medium text-foreground"
            aria-label="Firman portfolio"
          >
            F
          </div>
        </div>

        <div className="bg-soft border border-border rounded-lg p-10">
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">
              Admin Access
            </p>
            <h1 className="text-3xl font-medium tracking-tight text-foreground mb-2">
              Login
            </h1>
            <p className="text-sm text-muted leading-relaxed">
              Masuk untuk mengelola konten portfolio.
            </p>
          </div>

          <LoginForm />
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
