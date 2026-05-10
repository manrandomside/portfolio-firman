import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { getCurrentUser } from "@/lib/supabase/auth";

export const metadata = {
  title: "Admin — Firman Fadilah",
  robots: "noindex, nofollow",
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminTopBar userEmail={user.email ?? "Admin"} />
      <div className="flex min-h-[calc(100vh-64px)]">
        <AdminSidebar />
        <main className="flex-1 overflow-x-hidden">
          <div className="container-narrow py-12 md:py-16 px-6 md:px-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
