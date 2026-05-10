import { AboutSection } from "@/components/sections/AboutSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { KaryaSection } from "@/components/sections/KaryaSection";
import { Loader } from "@/components/shared/Loader";

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Loader />
      <main>
        <HeroSection />
        <AboutSection />
        <KaryaSection />
      </main>
    </>
  );
}
