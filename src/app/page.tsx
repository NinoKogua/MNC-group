import Hero from "@/app/Home/Hero";
import WhyUsSection from "@/app/Home/WhyUs";
import ProjectSection from "@/components/common/ProjectSection";
import ProjectsGridSection from "@/app/Home/ProjectGridSection";
import CalculatorSection from "@/app/Home/Calculator";

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
