import { Loader } from "@/components/shared/Loader";

export default function HomePage() {
  return (
    <>
      <Loader />
      <main className="bg-background flex min-h-screen items-center justify-center">
        <h1 className="text-foreground text-7xl font-medium tracking-tight">
          Firman
        </h1>
      </main>
    </>
  );
}
