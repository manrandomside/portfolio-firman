import type { LucideIcon } from "lucide-react";
import { Code2, LayoutGrid, Target } from "lucide-react";

export type ImpactArea = {
  slug: "software-engineering" | "ai-exploration" | "infographic-design";
  numberLabel: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export const impactAreas: ImpactArea[] = [
  {
    slug: "software-engineering",
    numberLabel: "01 / Engineering",
    title: "Software Engineering",
    description:
      "Membangun produk web end-to-end dengan stack modern. Dari database design sampai pixel-perfect UI.",
    icon: Code2,
    href: "/karya/software-engineering",
  },
  {
    slug: "ai-exploration",
    numberLabel: "02 / Exploration",
    title: "AI Exploration",
    description:
      "Mengeksplorasi machine learning, deep learning, dan integrasi AI ke dalam aplikasi nyata.",
    icon: Target,
    href: "/karya/ai-exploration",
  },
  {
    slug: "infographic-design",
    numberLabel: "03 / Visual",
    title: "Infographic Design",
    description:
      "Menerjemahkan konsep teknis kompleks menjadi visual yang mudah dipahami melalui poster dan infografis.",
    icon: LayoutGrid,
    href: "/karya/infographic-design",
  },
];
