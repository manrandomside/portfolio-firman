import {
  Code2,
  FolderKanban,
  Image as ImageIcon,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { StatsCard } from "@/components/admin/StatsCard";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getDashboardStats() {
  const supabase = await createClient();

  const [areasResult, projectsResult, techResult, postersResult] =
    await Promise.all([
      supabase.from("impact_areas").select("*", { count: "exact", head: true }),
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("project_tech").select("*", { count: "exact", head: true }),
      supabase.from("posters").select("*", { count: "exact", head: true }),
    ]);

  return {
    areas: areasResult.count ?? 0,
    projects: projectsResult.count ?? 0,
    tech: techResult.count ?? 0,
    posters: postersResult.count ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div>
      <div className="mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">
          Admin / Dashboard
        </p>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-3">
          Selamat datang
        </h1>
        <p className="text-base text-muted leading-relaxed max-w-prose">
          Kelola konten portfolio dari sini. Tambah, edit, atau hapus impact
          areas, projects, dan posters yang ditampilkan di public site.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <StatsCard
          label="Impact Areas"
          value={stats.areas}
          icon={Layers}
          description="Kategori karya"
        />
        <StatsCard
          label="Projects"
          value={stats.projects}
          icon={FolderKanban}
          description="Total project"
        />
        <StatsCard
          label="Tech Tags"
          value={stats.tech}
          icon={Code2}
          description="Tech stack tags"
        />
        <StatsCard
          label="Posters"
          value={stats.posters}
          icon={ImageIcon}
          description="Visual work"
        />
      </div>

      <section>
        <h2 className="text-lg font-medium text-foreground mb-4">
          Quick Actions
        </h2>
        <p className="text-sm text-muted leading-relaxed mb-6">
          Shortcut untuk operasi yang paling sering dilakukan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/areas"
            className="block bg-soft border border-border rounded-lg p-6 hover:border-foreground/40 transition-colors"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
              Areas
            </p>
            <p className="text-base font-medium text-foreground mb-1">
              Kelola Impact Areas →
            </p>
            <p className="text-xs text-muted">
              Tambah atau edit kategori karya
            </p>
          </Link>

          <Link
            href="/admin/projects"
            className="block bg-soft border border-border rounded-lg p-6 hover:border-foreground/40 transition-colors"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
              Projects
            </p>
            <p className="text-base font-medium text-foreground mb-1">
              Kelola Projects →
            </p>
            <p className="text-xs text-muted">
              Tambah atau edit project per area
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
