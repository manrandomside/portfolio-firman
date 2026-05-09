export type AboutMetaRow = {
  key: string;
  value: string;
};

export type AboutContent = {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  pills: string[];
  meta: AboutMetaRow[];
};

export const aboutContent: AboutContent = {
  eyebrow: "Tentang",
  heading: "Halo, saya Firman",
  paragraphs: [
    "Mahasiswa Informatika di Universitas Udayana yang sedang menempuh semester 6. Sebelumnya belajar fundamental coding di SMK jurusan Rekayasa Perangkat Lunak.",
    "Saat ini saya fokus membangun produk dengan stack modern dan mengeksplorasi AI engineering melalui project-project pribadi seperti Kioku dan Kobun. Pernah membangun sistem enterprise untuk PT Gapura Angkasa dan PT Citra Konsultama selama internship paralel di 2025.",
    "Di luar coding, saya senang menerjemahkan konsep teknis menjadi poster infografis yang mudah dipahami.",
  ],
  pills: ["Fullstack", "AI / ML", "Visual Design"],
  meta: [
    { key: "Based", value: "Bali, Indonesia" },
    { key: "Studying", value: "Informatika · Udayana" },
    { key: "Currently", value: "Semester 6 · Indie building" },
    { key: "Status", value: "Open to collab" },
  ],
};
