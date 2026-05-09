const ROLES = [
  "Software Engineer",
  "AI Explorer",
  "Infographic Designer",
] as const;

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="container-narrow section-padding scroll-mt-24"
    >
      <div className="grid min-h-[80vh] grid-cols-1 items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <div className="flex flex-col">
          <p className="text-muted mb-6 font-mono text-xs tracking-widest uppercase md:mb-8">
            Bertransformasi melalui perubahan
          </p>

          <h1 className="text-foreground mb-12 text-[clamp(80px,12vw,180px)] leading-[0.9] font-medium tracking-tight md:mb-16">
            Firman
          </h1>

          <p className="text-foreground mb-10 max-w-lg text-lg leading-relaxed md:mb-12">
            Membangun produk bersama AI sebagai pasangan ngoding.
            Mendokumentasikan setiap pelajaran sepanjang jalan — dari logika
            pertama di SMK sampai ship-an indie hari ini.
          </p>

          <div className="text-muted flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {ROLES.map((role, index) => (
              <span key={role} className="flex items-center gap-x-4">
                {index > 0 && <span aria-hidden="true">·</span>}
                <span>{role}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="w-full max-w-md justify-self-start lg:max-w-none lg:justify-self-end">
          <div
            aria-label="Hero animation placeholder"
            className="border-border bg-soft relative aspect-square w-full overflow-hidden rounded-lg border"
          >
            <div
              aria-hidden="true"
              className="hero-grid-bg pointer-events-none absolute inset-0 opacity-70"
            />

            <span
              aria-hidden="true"
              className="text-muted absolute top-4 left-4 font-mono text-[11px] tracking-[0.2em] uppercase"
            >
              {"// Hero / 1:1"}
            </span>
            <span
              aria-hidden="true"
              className="text-muted absolute top-4 right-4 font-mono text-[11px] tracking-[0.2em] uppercase"
            >
              v.0.1 · MP4
            </span>

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <span className="text-foreground font-mono text-[14vw] leading-[0.9] font-light tracking-[-0.05em] lg:text-[clamp(120px,11vw,200px)]">
                {"{ F }"}
              </span>
              <span className="text-muted font-mono text-xs tracking-widest uppercase">
                Animation Placeholder
              </span>
            </div>

            <div className="text-foreground absolute right-6 bottom-12 left-6 font-mono text-xs leading-[1.7]">
              <div>
                <span className="text-muted">$</span> firman.run --mode=vibe
              </div>
              <div>
                <span className="text-muted">→</span> spawning copilot...
                <span
                  aria-hidden="true"
                  className="bg-foreground animate-blink ml-1 inline-block h-[13px] w-[7px] align-[-2px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
