import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";

const internalLinks = [
  { label: "Tentang", href: "/#tentang" },
  { label: "Karya", href: "/#karya" },
];

const externalLinks = [
  { label: "GitHub", href: "https://github.com/manrandomside", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/firmanfadilah",
    external: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/manfdlh/",
    external: true,
  },
  { label: "Email", href: "mailto:firmanfdlh1@gmail.com", external: false },
];

export function Footer() {
  return (
    <Reveal
      as="footer"
      duration={400}
      className="border-border bg-background border-t"
    >
      <div className="container-narrow py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto_auto] md:gap-16">
          <div>
            <span
              aria-hidden="true"
              className="border-border text-foreground inline-grid h-8 w-8 place-items-center border font-mono text-sm font-medium"
            >
              F
            </span>
            <p className="text-muted mt-6 max-w-xs text-sm leading-relaxed">
              Membangun produk dengan kode, AI, dan sentuhan visual
              storytelling.
            </p>
          </div>

          <nav aria-label="Internal links">
            <p className="text-foreground mb-6 font-mono text-xs tracking-widest uppercase">
              Links
            </p>
            <ul className="space-y-3">
              {internalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="External links">
            <p className="text-foreground mb-6 font-mono text-xs tracking-widest uppercase">
              Connect
            </p>
            <ul className="space-y-3">
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                    className="text-muted hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-border mt-12 border-t pt-8 text-center">
          <p className="text-muted font-mono text-xs tracking-widest uppercase">
            © 2026 Firman Fadilah. All rights reserved.
          </p>
        </div>
      </div>
    </Reveal>
  );
}
