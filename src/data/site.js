// Everything that changes lives here: contact, works, experience and every line of copy in both languages.
// Bilingual text is { id, en }. To add a work: one entry in PROJECTS plus its image in src/assets.

export const ME = {
  name: "Firman Fadilah",
  short: "Firman",
  role: { id: "Web developer dan desainer infografis", en: "Web developer and infographic designer" },
  place: "Bali",
  wa: "6282144715831", // digits only, with country code
  waDisplay: "0821-4471-5831",
  email: "firmanfdlh1@gmail.com",
  github: "https://github.com/manrandomside",
  linkedin: "https://www.linkedin.com/in/firmanfadilah",
  instagram: "https://www.instagram.com/manfdlh/",
  cv: null, // path under public/ once Firman has a CV PDF; the download button shows only when set
  photo: "me/firman" // a stand-in photo for now; swap the file at src/assets/me/firman.jpg for a better one later
};

// cat: "klien" client website · "sistem" company system or product · "desain" design work
// image: key under src/assets without extension, or null for a type-only card
export const PROJECTS = [
  {
    slug: "early-beauty",
    name: "Early Beauty Studio",
    cat: "klien",
    year: "2026",
    line: { id: "Website salon di Negara: 5 halaman, 2 bahasa, admin pengumuman.", en: "A salon website in Negara, Bali: 5 pages, 2 languages, an announcement admin." },
    story: {
      id: "Website pertama yang saya buat untuk usaha sungguhan. Pelanggan studio ini datang dari Instagram dan booking lewat WhatsApp, jadi website-nya menjawab pertanyaan yang paling sering masuk: buka atau tidak, berapa harganya, dan jam berapa bisa datang. Setelah versi pertama dikritik terlalu ramai dalam satu halaman, saya memecahnya menjadi lima halaman dengan menu yang selalu terlihat, menambah versi bahasa Inggris untuk turis, peta lokasi, galeri dari Instagram, dan halaman admin agar pemiliknya bisa memasang pengumuman libur sendiri. Hasilnya: website-nya cepat dibuka di HP, mudah ditemukan di Google, dan nyaman dipakai siapa saja.",
      en: "The first website I built for a real business. The studio's customers find it on Instagram and book on WhatsApp, so the site answers what they always ask: are you open, how much, and when can I come. After the first version was critiqued as too crowded on one page, I split it into five pages with a menu that stays in view, added an English version for tourists, a location map, an Instagram gallery and an admin page so the owner can post holiday notices. The result: it opens fast on a phone, is easy to find on Google and is comfortable for anyone to use."
    },
    role: { id: "Desain dan pengembangan, sendiri", en: "Design and build, solo" },
    stack: ["Astro", "Cloudflare Pages Functions", "KV", "Lenis", "i18n ID/EN"],
    live: "https://earlybeauty.pages.dev",
    repo: "https://github.com/manrandomside/early-beauty-studio",
    award: null,
    image: "shots/early-beauty"
  },
  {
    slug: "kioku",
    name: "Kioku",
    cat: "sistem",
    year: "2026",
    line: { id: "Belajar kosakata bahasa Jepang dengan tutor AI. Terdaftar HKI.", en: "Japanese vocabulary with an AI tutor. Registered copyright (HKI)." },
    story: {
      id: "Platform belajar bahasa Jepang untuk penutur Indonesia. Jadwal hafalan memakai algoritma FSRS, ada tutor AI, 2.909 kosakata, 214 kana, dan 3.123 audio. Semuanya berjalan di layanan gratis, jadi Kioku gratis tanpa iklan. Kioku sudah terdaftar HKI.",
      en: "A Japanese learning platform for Indonesian speakers. Reviews are scheduled with the FSRS algorithm, and there is an AI tutor, 2,909 words, 214 kana and 3,123 audio clips. It runs entirely on free tiers, so Kioku is free with no ads. Kioku is registered with Indonesia's copyright office (HKI)."
    },
    role: { id: "Produk pribadi, dari desain sampai rilis", en: "Personal product, design to launch" },
    stack: ["Next.js", "TypeScript", "Supabase", "FSRS", "AI"],
    live: "https://kioku-learn.vercel.app",
    repo: "https://github.com/manrandomside/kioku",
    award: null,
    image: "shots/kioku"
  },
  {
    slug: "kelola-sdm",
    name: "Kelola SDM Gapura Angkasa",
    cat: "sistem",
    year: "2025",
    line: { id: "Sistem data karyawan untuk 1.273+ karyawan di Bandara Ngurah Rai.", en: "Staff records for 1,273+ employees at Bali's Ngurah Rai airport." },
    story: {
      id: "Dibangun selama OJT di PT Gapura Angkasa, Bandara I Gusti Ngurah Rai. Sistem ini mengelola data 1.273+ karyawan dari 10 penyedia tenaga kerja, dengan dasbor analitik real-time, asisten AI untuk pertanyaan seputar data karyawan, pemantauan kontrak otomatis, dan laporan PDF. Bisa dipasang sebagai aplikasi di HP maupun laptop.",
      en: "Built during my on-the-job training at PT Gapura Angkasa, I Gusti Ngurah Rai International Airport. It manages 1,273+ employees from 10 labour providers, with a real-time analytics dashboard, an AI assistant for questions about staff data, automatic contract monitoring and PDF reports. It installs as an app on phones and laptops."
    },
    role: { id: "Fullstack developer, OJT Jul–Des 2025", en: "Full-stack developer, training Jul–Dec 2025" },
    stack: ["Next.js", "TypeScript", "Supabase", "PWA", "AI"],
    live: null, // internal company system
    repo: "https://github.com/manrandomside/kelola-sdm-gapura-angkasa",
    award: null,
    image: "shots/kelola-sdm"
  },
  {
    slug: "cast",
    name: "CAST",
    cat: "sistem",
    year: "2025",
    line: { id: "Pengaduan dan layanan akademik real-time untuk kampus.", en: "Real-time academic complaints and service requests." },
    story: {
      id: "Citra Academic Support & Ticketing, hasil PPIDK di PT Citra Konsultama Indonesia. Mahasiswa, dosen, asisten dosen, dan staf bisa mengirim pengaduan, memantau tiketnya, dan berbalas pesan dengan admin secara real-time tanpa memuat ulang halaman. Ada kuota tiket supaya tidak disalahgunakan.",
      en: "Citra Academic Support & Ticketing, built during my industry placement at PT Citra Konsultama Indonesia. Students, lecturers, teaching assistants and staff submit complaints, track their tickets and chat with admins in real time without reloading. A ticket quota keeps it from being abused."
    },
    role: { id: "Fullstack developer, PPIDK", en: "Full-stack developer, industry placement" },
    stack: ["Laravel", "React", "MySQL", "Pusher"],
    live: null,
    repo: "https://github.com/manrandomside/layanan-pengaduan-kebutuhan-akademisi-ticketing",
    award: null,
    image: "shots/cast" // a responsive web app, so the card shows its desktop dashboard
  },
  {
    slug: "miaw",
    name: "Miaw",
    cat: "sistem",
    year: "2026",
    line: { id: "Hewan peliharaan digital yang terhubung ke perangkat rumah.", en: "A digital pet wired to real hardware at home." },
    story: {
      id: "Asisten rumah berwujud hewan peliharaan digital. Miaw terhubung ke ESP32 lewat MQTT untuk membaca kondisi ruangan, bisa diajak mengobrol lewat model bahasa (Groq dan OpenRouter), memutar radio, dan berganti ekspresi wajah secara real-time.",
      en: "A home assistant shaped like a digital pet. Miaw talks to an ESP32 over MQTT to read the room, chats through language models (Groq and OpenRouter), plays the radio and changes its face in real time."
    },
    role: { id: "Proyek pribadi", en: "Personal project" },
    stack: ["Next.js", "Supabase Realtime", "MQTT", "ESP32", "LLM"],
    live: "https://miaw-ai.vercel.app",
    repo: "https://github.com/manrandomside/miaw",
    award: null,
    image: "shots/miaw"
  },
  {
    slug: "tangkis",
    name: "Tangkis",
    cat: "sistem",
    year: "2026",
    line: { id: "Aplikasi Android offline pendeteksi pesan penipuan.", en: "An offline Android app that flags scam messages." },
    story: {
      id: "Aplikasi Android yang mendeteksi pesan penipuan tanpa internet memakai neural network Multilayer Perceptron. Riwayat pesan dienkripsi dan aplikasinya bisa dikunci dengan kata sandi. Proyek mata kuliah.",
      en: "An Android app that spots scam messages without internet, using a Multilayer Perceptron neural network. Message history is encrypted and the app can be locked with a password. A course project."
    },
    role: { id: "Proyek mata kuliah", en: "Course project" },
    stack: ["Kotlin", "Python", "MLP"],
    live: null,
    repo: "https://github.com/manrandomside/tangkis",
    award: null,
    image: "shots/tangkis-mockup",
    mockup: true // an Android app, shown as Firman's phone mockup (transparent PNG), contained not cropped
  },
  {
    slug: "teen-digital-toxicity",
    name: "Teen Digital Toxicity",
    cat: "desain",
    year: "2025",
    line: { id: "Poster infografis. Juara 1 internasional.", en: "Infographic poster. 1st place, international." },
    story: {
      id: "Poster infografis tentang dampak racun digital pada remaja. Juara 1 tingkat internasional di Kreasi Publik FIA Universitas Brawijaya.",
      en: "An infographic poster on how digital toxicity affects teenagers. 1st place at the international level, Kreasi Publik FIA Universitas Brawijaya."
    },
    role: { id: "Desain poster", en: "Poster design" },
    stack: ["Infografis"],
    live: null,
    repo: null,
    award: { title: { id: "Juara 1 Internasional", en: "1st place, international" }, by: "Kreasi Publik FIA Universitas Brawijaya", proof: "https://www.instagram.com/p/DLMrBqHyheA/" },
    image: "posters/teen-digital-toxicity"
  },
  {
    slug: "health-care-revolution",
    name: "Health Care Revolution",
    cat: "desain",
    year: "2025",
    line: { id: "Poster infografis. Juara 1 nasional.", en: "Infographic poster. 1st place, national." },
    story: {
      id: "Poster infografis tentang perubahan layanan kesehatan. Juara 1 tingkat nasional di UPCOFEST.",
      en: "An infographic poster on how healthcare is changing. 1st place at the national level, UPCOFEST."
    },
    role: { id: "Desain poster", en: "Poster design" },
    stack: ["Infografis"],
    live: null,
    repo: null,
    award: { title: { id: "Juara 1 Nasional", en: "1st place, national" }, by: "UPCOFEST", proof: "https://www.instagram.com/p/DJwfFAmprbw/" },
    image: "posters/health-care-revolution"
  },
  {
    slug: "soilsense",
    name: "SoilSense",
    cat: "desain",
    year: "2025",
    line: { id: "Poster infografis. Juara 3 nasional.", en: "Infographic poster. 3rd place, national." },
    story: {
      id: "Poster infografis tentang pemantauan tanah. Juara 3 tingkat nasional di FNWMU Universitas Udayana. Desainnya dinilai paling baik, lalu berada di posisi 3 setelah sesi presentasi.",
      en: "An infographic poster on soil monitoring. 3rd place at the national level, FNWMU Universitas Udayana. The design scored highest and finished third after the presentation round."
    },
    role: { id: "Desain poster", en: "Poster design" },
    stack: ["Infografis"],
    live: null,
    repo: null,
    award: { title: { id: "Juara 3 Nasional", en: "3rd place, national" }, by: "FNWMU Universitas Udayana", proof: "https://www.instagram.com/p/DNkIpHzx_FY/" },
    image: "posters/soilsense"
  }
];

export const FEATURED = ["early-beauty", "kioku", "kelola-sdm"];

// the phone-first wall: mobile screens of websites (not apps) in three columns, each opening its project
export const PHONES = [
  [{ image: "shots/early-beauty-phone", slug: "early-beauty" }, { image: "phones/kioku", slug: "kioku" }],
  [{ image: "phones/early-beauty-harga", slug: "early-beauty" }, { image: "shots/cast-mobile", slug: "cast" }],
  [{ image: "phones/miaw", slug: "miaw" }, { image: "phones/early-beauty-layanan", slug: "early-beauty" }]
];

export const FILTERS = [
  { key: "all", label: { id: "Semua", en: "All" } },
  { key: "klien", label: { id: "Website klien", en: "Client websites" } },
  { key: "sistem", label: { id: "Sistem & produk", en: "Systems & products" } },
  { key: "desain", label: { id: "Desain", en: "Design" } }
];

export const CATS = { klien: FILTERS[1].label, sistem: FILTERS[2].label, desain: FILTERS[3].label };

// smaller coursework and practice, listed under the work page
export const ARCHIVE = [
  { name: "Pangan Pintar ML Ops", line: { id: "API machine learning untuk proyek Pangan Pintar", en: "Machine learning API for the Pangan Pintar project" }, repo: "https://github.com/manrandomside/pangan-pintar-ml-ops" },
  { name: "NLP with Hugging Face", line: { id: "Latihan NLP dengan Transformers", en: "NLP practice with Transformers" }, repo: "https://github.com/manrandomside/NLP_with_HF_Transformers" },
  { name: "Machine Learning AI B10", line: { id: "Tugas machine learning", en: "Machine learning coursework" }, repo: "https://github.com/manrandomside/machine-learning-ai-b10" },
  { name: "Data Science AI B10", line: { id: "Tugas data science", en: "Data science coursework" }, repo: "https://github.com/manrandomside/data-science-ai-b10" },
  { name: "IoT First Study", line: { id: "Latihan pertama IoT", en: "First IoT practice" }, repo: "https://github.com/manrandomside/iot-first-study" }
];

export const EXPERIENCE = [
  {
    org: "PT Gapura Angkasa",
    what: { id: "On-the-job training · Fullstack developer", en: "On-the-job training · Full-stack developer" },
    when: { id: "Jul – Des 2025", en: "Jul – Dec 2025" },
    note: { id: "Membangun sistem Kelola SDM untuk 1.273+ karyawan.", en: "Built the staff records system for 1,273+ employees." },
    project: "kelola-sdm",
    cert: null // image key once Firman sends the certificate
  },
  {
    org: "PT Citra Konsultama Indonesia",
    what: { id: "PPIDK lewat NF Academy · Fullstack developer", en: "Industry placement via NF Academy · Full-stack developer" },
    when: { id: "6 Nov 2025 – 7 Jan 2026", en: "6 Nov 2025 – 7 Jan 2026" },
    note: { id: "Membangun CAST. Nilai akhir 95 (A) untuk tanggung jawab, kerja sama tim, komunikasi, hasil proyek, dan presentasi.", en: "Built CAST. Final score 95 (A) for responsibility, teamwork, communication, project result and presentation." },
    project: "cast",
    cert: null
  }
];

// no scans and no certificate numbers on the site, on purpose
export const CERTS = [
  { name: { id: "Junior Web Developer (Pengembang Web Pratama)", en: "Junior Web Developer" }, by: "BNSP · LSP Teknologi Digital", when: { id: "Jan 2026, berlaku sampai Jan 2029", en: "Jan 2026, valid until Jan 2029" }, cert: "bnsp-jwd" },
  { name: { id: "Junior Coder (Pemrogram Junior)", en: "Junior Coder" }, by: "BNSP · LSP TIK Triatma Kompetensi", when: { id: "2023", en: "2023" } }
];

// order matters: this is how a website project goes
export const STEPS = [
  { title: { id: "Saya lihat usahamu", en: "I look at your business" }, text: { id: "Dari Instagram, Google Maps, dan pertanyaan yang paling sering masuk ke WhatsApp-mu.", en: "Your Instagram, Google Maps, and the questions that keep landing in your WhatsApp." } },
  { title: { id: "Saya buatkan contohnya", en: "I build a sample" }, text: { id: "Website yang sudah bisa dibuka dan diklik, sebelum kamu memutuskan apa pun.", en: "A website you can open and click through before you decide anything." } },
  { title: { id: "Kita revisi bersama", en: "We revise it together" }, text: { id: "Harga, foto, dan kata-kata disesuaikan sampai terasa seperti usahamu.", en: "Prices, photos and words are adjusted until it feels like your business." } },
  { title: { id: "Website online", en: "Your site goes live" }, text: { id: "Website dipasang, lalu saya jelaskan cara pakainya dan apa yang perlu dikabari kalau ada perubahan.", en: "The site goes live, and I show you how it works and what to send me when something changes." } }
];

export const FAQ = [
  { q: { id: "Berapa lama sampai jadi?", en: "How long does it take?" }, a: { id: "Contoh pertama biasanya siap dalam beberapa hari. Lama revisinya tergantung seberapa cepat foto dan harga terkumpul.", en: "The first sample is usually ready within a few days. Revisions depend on how quickly photos and prices come together." } },
  { q: { id: "Berapa biayanya?", en: "How much does it cost?" }, a: { id: "Tergantung kebutuhan usahamu. Chat saja dulu, lihat contohnya, baru bicara biaya.", en: "It depends on what your business needs. Message me, see the sample first, then we talk about cost." } },
  { q: { id: "Apakah harus beli domain?", en: "Do I need to buy a domain?" }, a: { id: "Tidak harus. Website bisa online dengan alamat gratis, dan domain sendiri bisa ditambahkan kapan saja.", en: "No. The site can go live on a free address, and your own domain can be added any time." } },
  { q: { id: "Kalau harga berubah, bagaimana?", en: "What if my prices change?" }, a: { id: "Kirim daftar harga barunya lewat WhatsApp. Semua harga ada di satu tempat, jadi cepat diganti.", en: "Send me the new price list on WhatsApp. All prices live in one place, so changes are quick." } },
  { q: { id: "Saya tidak paham teknologi. Apakah masalah?", en: "I'm not good with technology. Is that a problem?" }, a: { id: "Tidak. Website dibuat supaya kamu tidak perlu login atau merawat apa pun.", en: "No. The site is built so you never need to log in or maintain anything." } }
];

export const UI = {
  waText: { id: "Halo Firman, saya punya usaha ___ dan tertarik dibuatkan website.", en: "Hi Firman, I have a business called ___ and I'd like a website." },
  nav: { home: { id: "Beranda", en: "Home" }, work: { id: "Karya", en: "Work" }, about: { id: "Tentang", en: "About" }, contact: { id: "Kontak", en: "Contact" }, main: { id: "Menu utama", en: "Main menu" }, menu: { id: "Menu", en: "Menu" }, close: { id: "Tutup", en: "Close" } },
  meta: {
    home: {
      title: { id: "Firman Fadilah · Website untuk usaha di Bali", en: "Firman Fadilah · Websites for businesses in Bali" },
      description: { id: "Firman Fadilah, web developer di Bali. Saya buatkan contoh website untuk usahamu lebih dulu. Lihat karya, juara lomba poster, dan sertifikasi BNSP.", en: "Firman Fadilah, web developer in Bali. I build a sample website for your business first. See my work, poster competition wins and BNSP certification." }
    },
    work: {
      title: { id: "Karya · Firman Fadilah", en: "Work · Firman Fadilah" },
      description: { id: "Semua karya Firman Fadilah: website klien, sistem perusahaan, produk AI, dan poster infografis juara.", en: "All of Firman Fadilah's work: client websites, company systems, AI products and award-winning infographic posters." }
    }
  },
  hero: {
    // the second part is set in the annotation ink
    title: [{ id: "Website yang menjawab pelanggan", en: "A website that answers customers" }, { id: "sebelum mereka bertanya.", en: "before they ask." }],
    lead: { id: "Saya buatkan contoh website untuk usahamu dulu. Kalau cocok, baru kita lanjut.", en: "I build a sample website for your business first. If you like it, we carry on." },
    wa: { id: "Chat WhatsApp", en: "Message on WhatsApp" },
    example: { id: "Lihat contohnya", en: "See an example" },
    sign: { id: "Firman Fadilah · web developer di Bali", en: "Firman Fadilah · web developer in Bali" },
    phoneAlt: { id: "Halaman depan website Early Beauty Studio di HP", en: "The Early Beauty Studio website on a phone" },
    // what the annotated phone points out: [x %, y %] on the screenshot, then the note
    notes: [
      // pins sit beside what they point at, never on its text
      { at: [9, 17], text: { id: "Foto hasil kerja asli, bukan foto stok", en: "Real photos of the work, not stock" } },
      { at: [62, 4.3], text: { id: "Dua bahasa untuk tamu dari luar negeri", en: "Two languages for visitors from abroad" } },
      { at: [21, 41.9], text: { id: "Pelanggan menghitung harganya sendiri", en: "Customers work out the price themselves" } },
      { at: [97.6, 4.3], text: { id: "Lima halaman, satu menu yang selalu terlihat", en: "Five pages, one menu always in view" } }
    ],
    igCaption: { id: "Sebelum: hanya Instagram", en: "Before: Instagram only" },
    siteCaption: { id: "Sesudah: earlybeauty.pages.dev", en: "After: earlybeauty.pages.dev" }
  },
  phones: {
    eyebrow: { id: "Di HP pelangganmu", en: "On your customer's phone" },
    // the second part is set in the annotation ink
    title: [{ id: "HP dulu,", en: "Phone first," }, { id: "baru laptop.", en: "laptop second." }],
    lead: {
      id: "Pelangganmu membuka website dari HP, sering sambil antre atau di jalan, dan memutuskan dalam beberapa detik. Jadi layar HP saya kerjakan lebih dulu, versi laptop menyusul.",
      en: "Your customers open your site on a phone, often in a queue or on the road, and decide within seconds. So I build the phone screen first and the laptop version follows."
    },
    points: [{ id: "Tombol pas untuk jempol", en: "Buttons sized for thumbs" }, { id: "Terbaca tanpa zoom", en: "Readable without zooming" }, { id: "WhatsApp satu ketukan", en: "WhatsApp one tap away" }, { id: "Ringan di sinyal 4G", en: "Light on a 4G signal" }],
    alt: { id: "Tampilan HP", en: "Phone view of" }
  },
  statement: {
    id: "Banyak usaha di Bali sudah ramai di Instagram, tapi tidak muncul saat orang mencarinya di Google. Karena itu saya buatkan contohnya dulu: kamu lihat, kamu klik, baru kamu putuskan.",
    en: "Plenty of businesses in Bali are busy on Instagram but invisible when people search Google. So I build the sample first: you look, you click, then you decide."
  },
  flow: {
    eyebrow: { id: "Contoh nyata · Early Beauty Studio", en: "A real example · Early Beauty Studio" },
    title: { id: "Dari profil Instagram, jadi website sungguhan.", en: "From an Instagram profile to a real website." },
    lead: {
      id: "Salon eyelash dan nails di Negara ini dulu hanya punya Instagram. Sekarang pelanggan bisa cek harga, menghitung harga nails sendiri, lalu booking lewat WhatsApp, dalam bahasa Indonesia atau Inggris. Pemiliknya mengatur pengumuman libur sendiri dari halaman admin.",
      en: "This lash and nail studio in Negara used to have only Instagram. Now customers check prices, price their own nails and book on WhatsApp, in Indonesian or English. The owner posts holiday notices from a simple admin page."
    },
    facts: [{ id: "5 halaman", en: "5 pages" }, { id: "2 bahasa", en: "2 languages" }, { id: "Admin pengumuman", en: "Announcement admin" }, { id: "Cepat dibuka di HP", en: "Opens fast on phones" }],
    live: { id: "Buka website-nya", en: "Open the website" },
    story: { id: "Baca ceritanya", en: "Read the story" }
  },
  work: {
    eyebrow: { id: "Karya pilihan", en: "Selected work" },
    // the second part is set in the annotation ink
    title: [{ id: "Karya yang sudah", en: "Work people" }, { id: "dipakai orang.", en: "actually use." }],
    all: { id: "Lihat semua karya", en: "See all work" },
    // {n} is the number of projects
    allN: { id: "Lihat semua {n} karya", en: "See all {n} projects" },
    sub: { id: "Tiga dari {n} karya: website klien, sistem perusahaan, dan produk belajar.", en: "Three of {n}: a client website, a company system and a learning product." },
    pageTitle: { id: "Semua karya", en: "All work" },
    pageLead: { id: "Website klien, sistem perusahaan, produk AI, dan poster infografis.", en: "Client websites, company systems, AI products and infographic posters." },
    archive: { id: "Arsip latihan dan tugas", en: "Practice and coursework" },
    back: { id: "Kembali ke beranda", en: "Back to home" },
    open: { id: "Lihat detail", en: "View details" },
    live: { id: "Buka website", en: "Open website" },
    code: { id: "Lihat kode", en: "View code" },
    proof: { id: "Lihat bukti", en: "See proof" },
    close: { id: "Tutup", en: "Close" },
    role: { id: "Peran", en: "Role" },
    stack: { id: "Teknologi", en: "Built with" }
  },
  about: {
    eyebrow: { id: "Tentang", en: "About" },
    title: { id: "Halo, saya Firman.", en: "Hi, I'm Firman." },
    body: {
      id: [
        "Mahasiswa Informatika di Universitas Udayana, Bali. Saya mulai menulis kode di SMK jurusan Rekayasa Perangkat Lunak.",
        "Sekarang saya membuat website untuk usaha, sistem untuk perusahaan, dan produk berbasis AI. Di luar kode, saya mendesain poster infografis yang menerjemahkan topik rumit menjadi visual yang mudah dipahami. Tiga di antaranya juara lomba."
      ],
      en: [
        "Informatics student at Universitas Udayana, Bali. I started writing code at a vocational high school, majoring in software engineering.",
        "Now I build websites for businesses, systems for companies and AI-powered products. Away from code, I design infographic posters that turn complicated topics into visuals people get at a glance. Three of them have won competitions."
      ]
    },
    photo: { id: "Foto menyusul", en: "Photo coming soon" },
    facts: [
      { k: { id: "Lokasi", en: "Based in" }, v: { id: "Bali, Indonesia", en: "Bali, Indonesia" } },
      { k: { id: "Kuliah", en: "Studying" }, v: { id: "Informatika, Universitas Udayana", en: "Informatics, Universitas Udayana" } },
      { k: { id: "Fokus", en: "Focus" }, v: { id: "Website, sistem, AI, desain", en: "Websites, systems, AI, design" } }
    ]
  },
  cert: {
    view: { id: "Lihat sertifikat", en: "View certificate" },
    title: { id: "Sertifikat BNSP · Junior Web Developer", en: "BNSP certificate · Junior Web Developer" },
    front: { id: "Sertifikat kompetensi Junior Web Developer atas nama Firman Fadilah", en: "Junior Web Developer certificate of competence for Firman Fadilah" },
    units: { id: "Daftar unit kompetensi yang diujikan", en: "The list of units of competency assessed" },
    close: { id: "Tutup", en: "Close" }
  },
  exp: {
    eyebrow: { id: "Pengalaman", en: "Experience" },
    title: { id: "Kerja nyata, sertifikat, dan juara.", en: "Real work, certificates and wins." },
    work: { id: "Pengalaman kerja", en: "Work experience" },
    certs: { id: "Sertifikasi", en: "Certifications" },
    awards: { id: "Penghargaan", en: "Awards" },
    see: { id: "Lihat karyanya", en: "See the work" }
  },
  process: {
    eyebrow: { id: "Cara kerja", en: "How it works" },
    title: { id: "Lihat dulu, baru putuskan.", en: "See it first, then decide." }
  },
  faq: {
    eyebrow: { id: "Tanya jawab", en: "Questions" },
    title: { id: "Yang biasa ditanyakan.", en: "What people usually ask." }
  },
  contact: {
    title: { id: "Punya usaha yang belum punya website?", en: "Have a business without a website?" },
    lead: { id: "Ceritakan usahamu lewat WhatsApp. Perekrut juga bisa menghubungi saya lewat email atau LinkedIn.", en: "Tell me about your business on WhatsApp. Recruiters can reach me by email or LinkedIn too." },
    cv: { id: "Unduh CV", en: "Download CV" },
    copy: { id: "Salin", en: "Copy" },
    copied: { id: "Tersalin", en: "Copied" }
  },
  lang: { id: "Bahasa", en: "Language" }
};
