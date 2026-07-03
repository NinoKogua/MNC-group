import Hero from './home/Hero'
import WhyUsSection from './home/WhyUs'
import ProjectSection from '../components/common/ProjectSection'
import ProjectsGridSection from './home/ProjectGridSection'
import CalculatorSection from './home/Calculator'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({ params, searchParams }: Props) {
  const { locale } = await params

  return (
    <main className="w-full min-h-screen">
      <Hero locale={locale} />
      <WhyUsSection locale={locale} />
      <ProjectSection />
      <ProjectsGridSection />
      <CalculatorSection searchParams={searchParams} />
    </main>
  )
}
