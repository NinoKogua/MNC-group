import Hero from './home/Hero'
import WhyUsSection from './home/WhyUs'
import ProjectSection from '../components/common/ProjectSection'
import ProjectsGridSection from './home/ProjectGridSection'
import CalculatorSection from './home/Calculator'

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Hero />
      <WhyUsSection />
      <ProjectSection />
      <ProjectsGridSection />
      <CalculatorSection />
    </main>
  )
}
