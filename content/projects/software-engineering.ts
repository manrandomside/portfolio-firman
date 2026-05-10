/**
 * @deprecated As of commit 22, this file is no longer imported by app code.
 * Content is now sourced from Supabase database. See lib/supabase/queries.ts.
 * This file is preserved as reference for the original seed data.
 * Future content changes happen via admin panel (commits 23+).
 */
import type { Project } from "@/content/projects/types";

export const softwareEngineeringProjects: Project[] = [
  {
    number: "01",
    title: "Kelola SDM PT Gapura Angkasa",
    roleAndTimeline: "Fullstack Developer · Jul-Des 2025 · OJT",
    description:
      "Sistem Kelola SDM yang dibangun selama 5 bulan OJT untuk PT Gapura Angkasa. Modul absensi, cuti, evaluasi, dan reporting untuk ratusan karyawan. Belajar bekerja di tim enterprise, code review, dan deliver fitur ke production.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind", "Drizzle ORM"],
    images: [
      { label: "Dashboard view" },
      { label: "Module list" },
      { label: "Reporting view" },
    ],
    links: [
      {
        label: "View Code",
        href: "https://github.com/manrandomside/kelola-sdm-gapura-angkasa",
      },
    ],
  },
  {
    number: "02",
    title: "Layanan Pengaduan Akademisi",
    roleAndTimeline: "Fullstack Developer · 2025 · Internship PT Citra Konsultama",
    description:
      "Sistem ticketing dan pengaduan untuk kebutuhan akademik, dibangun selama internship paralel di PT Citra Konsultama. Belajar arsitektur sistem ticketing dan handling user feedback.",
    tech: ["Web App", "Ticketing", "Backend"],
    images: [{ label: "Ticket list" }, { label: "Submission form" }],
    links: [
      {
        label: "View Code",
        href: "https://github.com/manrandomside/layanan-pengaduan-kebutuhan-akademisi-ticketing",
      },
    ],
  },
];
