import Hero from "@/app/(frontend)/Home/Hero";
import WhyUsSection from "@/app/(frontend)/Home/WhyUs";
import ProjectSection from "@/app/(frontend)/components/common/ProjectSection";
import ProjectsGridSection from "@/app/(frontend)/Home/ProjectGridSection";
import CalculatorSection from "@/app/(frontend)/Home/Calculator";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Hero />
      <WhyUsSection />
      <ProjectSection />
      <ProjectsGridSection />
      <CalculatorSection />
    </main>
  );
}
