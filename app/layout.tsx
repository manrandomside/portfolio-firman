import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Fab } from "@/components/shared/Fab";
import { Footer } from "@/components/shared/Footer";
import { Nav } from "@/components/shared/Nav";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Firman Fadilah",
  description:
    "Personal portfolio of Firman Fadilah, Fullstack Developer, AI Engineer, and Vibe Coder",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Nav />
          {children}
          <Footer />
          <Fab />
        </ThemeProvider>
      </body>
    </html>
  );
}
