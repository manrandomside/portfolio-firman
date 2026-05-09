import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { impactAreas } from "@/content/karya";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return impactAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = impactAreas.find((a) => a.slug === slug);

  if (!area) {
    return { title: "Not Found" };
  }

  return {
    title: `${area.title} — Firman Fadilah`,
    description: area.description,
  };
}

export default async function KaryaDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const area = impactAreas.find((a) => a.slug === slug);

  if (!area) {
    notFound();
  }

  return (
    <div className="container-narrow section-padding scroll-mt-24">
      <div className="mb-12">
        <p className="text-muted mb-4 font-mono text-xs tracking-widest uppercase">
          Karya / {area.title}
        </p>

        <Link
          href="/#karya"
          className="text-muted hover:text-foreground mb-8 inline-block font-mono text-xs tracking-widest uppercase transition-colors"
        >
          ← Kembali ke Karya
        </Link>

        <h1 className="text-foreground text-[clamp(48px,7vw,96px)] leading-tight font-medium tracking-tight">
          {area.title}
        </h1>

        <p className="text-muted mt-6 max-w-2xl text-lg leading-relaxed">
          {area.description}
        </p>
      </div>

      <div className="border-border bg-soft rounded-lg border p-12 text-center">
        <p className="text-muted font-mono text-xs tracking-widest uppercase">
          Detail content coming soon
        </p>
      </div>
    </div>
  );
}
