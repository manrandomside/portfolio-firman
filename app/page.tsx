import { HeroSection } from "@/components/sections/HeroSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { Loader } from "@/components/shared/Loader";

export default function HomePage() {
  return (
    <>
      <Loader />
      <main>
        <HeroSection />
        <JourneySection />
      </main>
    </>
  );
}
