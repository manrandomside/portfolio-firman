"use client";

import { usePathname } from "next/navigation";
import { Fab } from "@/components/shared/Fab";
import { Footer } from "@/components/shared/Footer";
import { Nav } from "@/components/shared/Nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Nav />
      {children}
      <Footer />
      <Fab />
    </>
  );
}
