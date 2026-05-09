import type { Project } from "./types";

export const aiExplorationProjects: Project[] = [
  {
    number: "01",
    title: "Kobun",
    roleAndTimeline: "Personal Project · Deep Learning · 2026",
    description: "Personal Deep Learning project. Eksplorasi neural networks dan model training. Tempat saya mencoba konsep ML baru tanpa pressure produksi — dari arsitektur model sampai optimisasi training pipeline.",
    tech: ["Python", "Deep Learning", "Neural Networks", "PyTorch"],
    images: [
      { label: "Model Architecture" },
      { label: "Training Pipeline" },
      { label: "Evaluation Results" },
    ],
    links: [
      { label: "View Code", href: "https://github.com/manrandomside/kobun" },
    ],
  },
  {
    number: "02",
    title: "Kioku",
    roleAndTimeline: "Personal Project · Terdaftar HKI · 2026",
    description: "Personal AI project, terdaftar HKI. Aplikasi yang mengeksplorasi konsep memory dan pembelajaran personal melalui pendekatan AI. Project ini dijadikan basis untuk keperluan akademik dan pendaftaran HKI.",
    tech: ["AI", "Next.js", "Personal", "HKI"],
    images: [
      { label: "Memory Interface" },
      { label: "AI Interaction" },
    ],
    links: [
      { label: "View Code", href: "https://github.com/manrandomside/kioku" },
    ],
  },
];
