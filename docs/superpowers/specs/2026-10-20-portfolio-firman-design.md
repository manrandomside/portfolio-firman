# Portofolio Firman Fadilah — dokumen desain

Tanggal: 2026-10-20 · Status: menunggu persetujuan Firman

## 1. Maksud dan alasan

Portofolio lama (https://portfolio-manrandomside.vercel.app/, repo `next/portfolio-firman`) dirombak total dan pindah framework. Firman menilai portofolio itu "masih jelek": hero hanya bertuliskan nama, ada kotak "ANIMATION PLACEHOLDER", isinya dikelola lewat admin Supabase, dan sebagian besar kartunya masih placeholder.

Portofolio baru harus melayani **dua pembaca secara seimbang** (keputusan Firman):

1. **Pemilik UMKM** yang mungkin dibuatkan website. Firman mengikuti cara kerja temannya, Andika Pramana (andikapramana.com): mencari usaha yang belum punya website, membuatkan contoh website lebih dulu, lalu menawarkannya. Portofolio adalah tempat yang ditunjukkan saat menawarkan itu.
2. **Perekrut dan perusahaan** yang menilai Firman sebagai developer.

Rujukan strukturnya adalah portofolio Andika (repo `MadeAndikaPramana/portofolio-andika-web`): satu halaman panjang, beranda yang hanya menampilkan beberapa karya unggulan, halaman `/work` berisi semua karya dengan filter, panel detail per karya, tanpa harga, dan semua isi diatur dari satu file data. **Desainnya tidak boleh disalin.** Ide khas Andika (kartu nama 3D yang berbalik, latar titik, kursor terbalik) tidak dipakai.

## 2. Tujuan, bukan tujuan, dan larangan

**Tujuan**
- Pemilik UMKM langsung paham tawaran Firman dalam satu layar, lalu bisa chat WhatsApp dengan pesan yang sudah terisi.
- Perekrut dalam satu layar melihat bukti: juara lomba, sertifikasi BNSP, pengalaman magang, dan produk yang online.
- Firman bisa menambah karya baru lewat Claude dengan mengubah satu file data, tanpa admin.

**Bukan tujuan**
- Tidak ada halaman admin, login, database, Supabase, atau backend dalam bentuk apa pun (keputusan Firman: "admin hilangkan total").
- Tidak ada kisaran harga (keputusan Firman).
- Tidak ada blog atau CMS.

**Larangan (gagal walaupun berfungsi)**
- Terlihat seperti template AI: kotak teks generik, status pill, emoji sebagai penanda, gradasi ungu-biru.
- Ramai. Pelajaran dari Early Beauty: Andika menilai versi pertamanya "kurang minimalis, rame", lalu versi minimalis yang dipakai.
- Menampilkan karya yang dikecualikan Firman (lihat §4).
- Memasang scan sertifikat utuh (berisi foto wajah, tanda tangan, nomor registrasi).

## 3. Keputusan Firman

- Framework diganti. Admin dan Supabase dihapus total.
- Dua bahasa: **Indonesia dan Inggris** dengan tombol ganti bahasa, seperti portofolio lama.
- Kisaran harga tidak ditampilkan. Calon klien diarahkan ke WhatsApp.
- Ada foto Firman. **Slotnya dikosongkan dulu** sampai fotonya dikirim.
- Sertifikat magang Gapura Angkasa menyusul. **Slotnya dikosongkan dulu.**
- Daftar karya dan pengecualian di §4.
- Arah tampilan diserahkan ke Claude ("yang paling bagus menurut kamu").
- **Jangan commit atau push ke GitHub dulu.** Commit dibuat nanti setelah Firman mengizinkan, per tugas dengan gaya Conventional Commits seperti repo `tangkis`, tanpa baris Co-Authored-By.

## 4. Isi

### Karya unggulan

| Karya | Kategori | Fakta yang dipakai | Link |
|---|---|---|---|
| **Early Beauty Studio** | Website klien | Website pertama untuk usaha (salon eyelash, nails, alis di Negara, Jembrana). Kalkulator harga nails, booking WhatsApp, jam buka WITA, kalender Galungan, tanpa backend. Astro, Cloudflare Pages, 2026. | earlybeauty.pages.dev · github.com/manrandomside/early-beauty-studio |
| **Kioku** | Produk & AI | Platform belajar bahasa Jepang untuk penutur Indonesia. Algoritma FSRS, tutor AI, 2.909 kosakata, 214 kana, 3.123 audio, gratis tanpa iklan. **Terdaftar HKI.** Next.js 16, Supabase. | kioku-learn.vercel.app · github.com/manrandomside/kioku |
| **Kelola SDM Gapura Angkasa** | Sistem perusahaan | OJT di PT Gapura Angkasa, Bandara I Gusti Ngurah Rai, Jul–Des 2025. Mengelola 1.273+ karyawan dari 10 penyedia tenaga kerja, dasbor analitik real-time, asisten AI HR, PDF laporan, PWA. Next.js 15, Supabase. | github.com/manrandomside/kelola-sdm-gapura-angkasa (sistem internal, tanpa link publik) |
| **CAST** (Citra Academic Support & Ticketing) | Sistem perusahaan | Hasil PPIDK di PT Citra Konsultama Indonesia. Pengaduan dan permintaan layanan akademik real-time (Pusher WebSocket), empat sub-peran pengguna, kuota tiket. Laravel 12, React 19, MySQL. | github.com/manrandomside/layanan-pengaduan-kebutuhan-akademisi-ticketing |
| **Miaw** | Produk & AI | Digital pet dan asisten rumah pintar. Terhubung ke ESP32 lewat MQTT, ngobrol lewat LLM (Groq, OpenRouter), ekspresi wajah real-time. Next.js 15, Supabase Realtime. | github.com/manrandomside/miaw |
| **Tangkis** | Produk & AI | Aplikasi Android offline pendeteksi pesan penipuan dengan neural network Multilayer Perceptron, kunci kata sandi, riwayat terenkripsi. Proyek mata kuliah. | github.com/manrandomside/tangkis |
| **Teen Digital Toxicity** | Desain | Poster infografis. **Juara 1 Internasional**, Kreasi Publik FIA Universitas Brawijaya. | instagram.com/p/DLMrBqHyheA |
| **Health Care Revolution** | Desain | Poster infografis. **Juara 1 Nasional**, UPCOFEST. | instagram.com/p/DJwfFAmprbw |
| **SoilSense** | Desain | Poster infografis. **Juara 3 Nasional**, FNWMU Universitas Udayana (penilaian desain terbaik, posisi 3 setelah presentasi). | instagram.com/p/DNkIpHzx_FY |

Beranda menampilkan **3 karya unggulan**: Early Beauty Studio, Kioku, Kelola SDM Gapura Angkasa. Halaman `/karya` menampilkan semuanya dengan filter **Website klien · Sistem & produk · Desain**. Filter "Sistem & produk" menggabungkan sistem perusahaan dan produk AI.

**Arsip** (daftar ringkas di bawah `/karya`, hanya nama, satu baris, dan link GitHub): Pangan Pintar API, tugas Machine Learning dan Data Science, NLP Hugging Face, latihan IoT. Builder mengambil URL dari `git remote` di folder masing-masing di `ProjectWebDev`, dan melewati yang tidak punya remote.

**Dikecualikan, jangan ditampilkan:** Alter Ego, kejutan ulang tahun (`client-bday-surprise`), Gapura Angkasa versi Laravel, Kobun.

### Pengalaman dan sertifikasi

| Item | Isi |
|---|---|
| OJT PT Gapura Angkasa | Jul–Des 2025, Fullstack Developer → Kelola SDM. Sertifikat menyusul (slot kosong). |
| PPIDK PT Citra Konsultama Indonesia (lewat NF Academy) | 6 Nov 2025 – 7 Jan 2026 → CAST. Nilai rata-rata **95 (A)** di lima aspek: tanggung jawab, kerja sama tim, komunikasi, hasil proyek, presentasi. |
| BNSP · Junior Web Developer (Pengembang Web Pratama) | LSP Teknologi Digital, 12 Jan 2026, berlaku sampai Jan 2029. Sertifikasi utama. |
| BNSP · Junior Coder (Pemrogram Junior) | LSP TIK Triatma Kompetensi, 29 Mei 2023. Masa berlaku sudah habis (Mei 2026), ditulis sebagai riwayat "2023". |

Sertifikat ditampilkan sebagai kartu ringkas: nama, lembaga, tanggal. Tidak ada scan dan tidak ada nomor sertifikat di website.

### Tentang Firman

Mahasiswa Informatika Universitas Udayana, lulusan SMK Rekayasa Perangkat Lunak, berbasis di Bali. Membangun website, sistem, dan produk AI, serta mendesain poster infografis. Teks lengkap ditulis builder dari fakta ini dan dari `next/portfolio-firman/content/about.ts`, tanpa menyebut Kobun dan tanpa menulis semester (cepat basi).

### Kontak

- WhatsApp **0821-4471-5831** (`wa.me/6282144715831`) dengan pesan terisi, misalnya "Halo Firman, saya punya usaha ___ dan tertarik dibuatkan website."
- Email firmanfdlh1@gmail.com · GitHub github.com/manrandomside · LinkedIn linkedin.com/in/firmanfadilah · Instagram instagram.com/manfdlh
- CV PDF berbahasa Inggris untuk perekrut, lihat §9.

## 5. Susunan halaman

Beranda, dari atas ke bawah:

1. **Pembuka singkat** (maks. ±1,2 detik, sekali per sesi, dilewati jika reduced motion).
2. **Hero "Dari Instagram ke website"** — ide khas portofolio ini. Kiri: judul "Usahamu sudah ramai di Instagram. Saatnya punya website.", satu kalimat bahwa Firman membuatkan contohnya dulu, tombol **Chat WhatsApp** dan **Lihat karya**. Kanan: dua layar HP. HP pertama berisi grid ala profil Instagram, HP kedua berisi website Early Beauty yang asli. Saat di-scroll, petak-petak grid Instagram berpindah dan tersusun menjadi bagian-bagian website. Ini satu-satunya animasi besar di halaman.
3. **Baris bukti** (diambil dari arah A pada mockup): angka besar yang menghitung naik saat terlihat, yaitu 3 juara lomba poster (1 internasional), sertifikasi BNSP Junior Web Developer, nilai PPIDK 95, dan Kioku terdaftar HKI. Baris ini menjadi jalan pintas untuk perekrut.
4. **Karya pilihan**: 3 kartu, tautan "Lihat semua karya" ke `/karya`. Mengetuk kartu membuka panel detail: cerita singkat, peran, teknologi, link live dan GitHub, penghargaan beserta link buktinya.
5. **Tentang**: foto (slot kosong dulu), paragraf singkat, fakta singkat (Bali, Udayana, fokus).
6. **Pengalaman dan sertifikasi**: urutan waktu OJT, PPIDK, BNSP. Setiap pengalaman menautkan karyanya.
7. **Cara kerja** (untuk UMKM): langkah berurutan, yaitu lihat usahamu (Instagram atau Google Maps), buatkan contoh website, revisi bersama, online dan serah terima. Tanpa harga.
8. **Tanya jawab** singkat, 4–5 pertanyaan yang biasa ditanyakan UMKM: berapa lama, perlu domain atau tidak, bisa ubah harga sendiri atau tidak, berapa biayanya (dijawab: tergantung kebutuhan, chat dulu).
9. **Kontak dan footer**: tombol WhatsApp, email, tautan sosial, unduh CV, nama Firman sebagai watermark samar (seperti footer Early Beauty dan Kioku).

Navigasi tetap: nama Firman, Karya, Tentang, Kontak, tombol **ID / EN**.

Halaman `/karya`: kepala kecil, filter, semua kartu, arsip, lalu kontak.

Mockup arah yang dipilih: https://claude.ai/artifact/2xWqYQWRSNes4NVNxX6f8t (arah B, ditambah baris angka dari arah A).

## 6. Tampilan

Pilihan Claude, berdasarkan mockup arah B:

- **Font**: Unbounded untuk judul (dipakai hemat), Onest untuk teks, satu font mono untuk label dan angka bukti.
- **Warna**: latar abu kebiruan terang, tinta hampir hitam, satu aksen oranye sinyal untuk tombol WhatsApp dan penanda penting. Satu bagian gelap boleh dipakai sebagai jeda (misalnya Karya pilihan), tidak lebih.
- **Gerak**: smooth scroll Lenis, judul muncul per baris, kartu muncul saat terlihat, satu jenis easing, setiap animasi hanya sekali. Animasi besar hanya di hero. Semuanya mati untuk pengguna yang memilih "kurangi animasi".
- Desain untuk HP lebih dulu. Hero di HP tetap menampilkan perubahan Instagram ke website, dengan dua HP ditumpuk atau bergantian.

## 7. Batasan teknis

- **Astro** (versi 7, seperti Early Beauty), tanpa React dan Tailwind. Satu komponen per bagian. Gambar lewat `astro:assets`, font self-host lewat Astro Fonts API. Pola Early Beauty (`src/data`, `src/scripts/motion.js`, reveal, Lenis) dipakai ulang.
- **Satu file data** berisi profil, kontak, karya, pengalaman, sertifikasi, dan semua teks dalam dua bahasa. Menambah karya berarti menambah satu entri dan satu gambar.
- **Dua bahasa sebagai halaman statis**: bahasa Indonesia di `/`, bahasa Inggris di `/en/` (begitu juga `/karya` dan `/en/work`). Tombol ID / EN berpindah ke halaman pasangannya. Ini baik untuk SEO dan tidak butuh JavaScript.
- Tanpa backend. WhatsApp lewat link `wa.me`.
- SEO: meta, Open Graph 1200×630, `robots.txt`, `sitemap.xml`, data terstruktur `Person`.
- Folder baru `astro/portfolio-firman`. Repo lama `next/portfolio-firman` tidak disentuh.
- **Hosting: Cloudflare Pages** (pilihan Claude). Portofolio ini menawarkan jasa berbayar, sedangkan Vercel Hobby hanya untuk penggunaan non-komersial. Ini juga sama dengan Early Beauty.

## 8. Diserahkan ke builder

- Teks lengkap kedua bahasa, mengikuti fakta di atas dan nada Early Beauty: kalimat pendek, bahasa sehari-hari, tanpa klaim "terbaik".
- Detail visual dalam batas §6, termasuk cara teknis animasi hero.
- Gambar karya: tangkapan layar Early Beauty dan Kioku dari situs live, Kelola SDM dan CAST dari folder `public` repo masing-masing, poster dari file 51.jpg, 52.jpg, 53.jpg di folder unggahan sesi. Untuk Miaw dan Tangkis, kartu tanpa tangkapan layar asli boleh memakai tampilan tipografi sampai gambar tersedia.
- Komponen: hal kecil di dalam satu bagian.

## 9. Hal yang belum lengkap dan keputusan setelah pengecekan

**Menunggu dari Firman**
- **CV PDF.** Firman belum punya. Tombol unduh CV hanya muncul jika file-nya diisi di data, jadi untuk sekarang tidak tampil. Membuat CV adalah pekerjaan terpisah.
- Foto Firman dan sertifikat magang Gapura Angkasa (slot kosong, lihat §3).

**Diputuskan Claude**
- **Gambar poster** ada di `C:\Users\Manrandomside\AppData\Local\Temp\claude\C--Users-Manrandomside-ProjectWebDev\92198a70-3713-47b0-ae0e-b4ceecd618f6\images\` (51.jpg Health Care Revolution, 52.jpg SoilSense, 53.jpg Teen Digital Toxicity). Builder menyalinnya ke `src/assets/` pada langkah pertama karena folder sementara bisa terhapus.
- **Alamat**: `https://firmanfadilah.pages.dev` (jika nama itu sudah dipakai, nama terdekat yang tersedia). Nilai `site` di Astro dan semua URL mutlak diambil dari satu tempat. Website lama di Vercel dibiarkan dulu. Mengalihkannya ke alamat baru diputuskan saat deploy.
- **Halaman `/en/`** memakai susunan yang sama dengan halaman Indonesia, sehingga data dan komponennya satu. Hero bahasa Inggris tetap menawarkan website untuk usaha kecil, ditulis ulang secara alami, bukan terjemahan kata per kata.
- **Baris bukti** menulis "Sertifikasi BNSP Junior Web Developer", bukan "2 sertifikasi BNSP", karena salah satunya sudah habis masa berlakunya.
