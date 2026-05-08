export type Chapter = {
  number: string;
  label: string;
  title: string;
  tagline: string;
  quote: string;
  body: string;
  tags: string[];
};

export const chapters: Chapter[] = [
  {
    number: "01",
    label: "Chapter 1 · 2020-2023 · SMK Rekayasa Perangkat Lunak",
    title: "SMK Rekayasa Perangkat Lunak",
    tagline: "Where it all started",
    quote: "Mulai dari nol, jatuh cinta sama logika kode.",
    body: "Mengenal dunia programming sejak SMK jurusan Rekayasa Perangkat Lunak. Belajar fundamental web development, database, dan algoritma. Di sini semua dimulai — dari clueless jadi penasaran.",
    tags: ["HTML/CSS/JS", "MySQL", "PHP", "Database"],
  },
  {
    number: "02",
    label: "Chapter 2 · 2023-Sekarang · Informatika Universitas Udayana",
    title: "Informatika Universitas Udayana",
    tagline: "Going deeper",
    quote: "Kuliah membuka dimensi baru — dari teori ke produk nyata.",
    body: "Memperdalam software engineering, eksplorasi AI/ML, dan mulai membangun project-project pribadi. Sekarang sedang menempuh semester 6.",
    tags: ["Software Engineering", "AI/ML", "Algorithms", "Data Structures"],
  },
  {
    number: "03",
    label: "Chapter 3 · Jul-Des 2025 · OJT Gapura Angkasa",
    title: "OJT PT Gapura Angkasa",
    tagline: "Real enterprise scale",
    quote: "Coding untuk satu perusahaan, dampaknya ke ratusan karyawan.",
    body: "5 bulan OJT membangun sistem Kelola SDM untuk PT Gapura Angkasa, sambil tetap menjalankan kuliah di semester 5. Belajar bekerja di tim enterprise, code review, dan deliver fitur ke production.",
    tags: ["Fullstack", "HR System", "Enterprise", "Team Collaboration"],
  },
  {
    number: "04",
    label: "Chapter 4 · 2025 · PT Citra Konsultama Indonesia",
    title: "Internship PT Citra Konsultama",
    tagline: "Building tools that solve real problems",
    quote: "Setiap tiket pengaduan adalah masalah nyata yang menunggu solusi.",
    body: "Internship paralel membangun sistem Layanan Pengaduan & Ticketing untuk kebutuhan akademisi. Belajar arsitektur sistem ticketing dan handling user feedback.",
    tags: ["Web App", "Ticketing System", "Backend", "UX"],
  },
  {
    number: "05",
    label: "Chapter 5 · Sekarang · Personal Projects & AI Exploration",
    title: "Personal Projects & AI Exploration",
    tagline: "Where AI meets curiosity",
    quote: "Saatnya membangun ide-ide gila bersama AI.",
    body: "Membangun Kioku (terdaftar HKI) dan Kobun (Deep Learning) sebagai playground eksplorasi AI dan personal product. Vibe coding bareng AI tools untuk ship faster.",
    tags: ["Deep Learning", "Personal Products", "AI", "Indie Building"],
  },
];
