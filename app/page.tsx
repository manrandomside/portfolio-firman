import { AboutSection } from "@/components/sections/AboutSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { Loader } from "@/components/shared/Loader";

export default function HomePage() {
  return (
    <>
      <Loader />
      <main>
        <HeroSection />
        <AboutSection />
      </main>
    </>
  );
}
