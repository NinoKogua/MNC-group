import Hero from './home/Hero'
import WhyUsSection from './home/WhyUs'
import ProjectSection from '../components/common/ProjectSection'
import ProjectsGridSection from './home/ProjectGridSection'
import CalculatorSection from './home/Calculator'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <main className="w-full min-h-screen">
      <Hero locale={locale} />
      <WhyUsSection locale={locale} />
      <ProjectSection />
      <ProjectsGridSection />
      <CalculatorSection />
    </main>
  )
}
