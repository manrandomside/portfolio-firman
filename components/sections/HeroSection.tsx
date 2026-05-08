const ROLES = ["Fullstack Developer", "AI Engineer", "Vibe Coder"] as const;

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
            Mendokumentasikan setiap pelajaran sepanjang jalan.
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
          {/* TODO: Replace with <video> element when MP4 animation is generated */}
          <div className="border-border bg-border/30 flex aspect-square w-full items-center justify-center rounded-lg border border-dashed">
            <span className="text-muted font-mono text-xs tracking-widest uppercase">
              AI Engineer Animation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
