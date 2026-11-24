import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import Hero from './home/Hero'
import WhyUsSection from './home/WhyUs'
import ProjectSection from '../components/common/ProjectSection'
import ProjectsGridSection from './home/ProjectGridSection'
import CalculatorSection from './home/Calculator'
import { buildAlternates, buildKeywords, buildOgImages, type Locale as SiteLocale } from '@/utilities/seo'

type Props = {
  params: Promise<{ locale: string }>
}

export const revalidate = 300

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const currentLocale = (locale === 'ka' ? 'ka' : 'en') as SiteLocale

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'hero-slides',
    locale: currentLocale,
    sort: 'order',
    limit: 1,
    depth: 1,
  })

  const slide = docs[0]
  const title =
    currentLocale === 'ka' ? 'ემენსი ჯგუფი | MNC Group' : 'MNC Group - Real Estate in Georgia'
  const description =
    slide?.description ||
    (currentLocale === 'ka'
      ? 'ფიჭვების პროექტი მაღალმთიანი ტიპის ეკომეგობრული სივრცეების შექმნას ისახავს მიზნად.'
      : 'MNC Group builds eco-friendly high-altitude residential and hospitality spaces in Georgia.')
  const image = (slide?.image as { url?: string } | undefined)?.url

  const alternates = buildAlternates(currentLocale, '')
  const keywords = buildKeywords(
    currentLocale,
    currentLocale === 'ka'
      ? ['საცხოვრებელი კომპლექსი', 'ბინების გაყიდვა']
      : ['residential complex Georgia', 'apartments for sale Georgia'],
  )

  return {
    title,
    description,
    keywords,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      locale: currentLocale === 'ka' ? 'ka_GE' : 'en_US',
      alternateLocale: currentLocale === 'ka' ? 'en_US' : 'ka_GE',
      images: buildOgImages(image, title),
    },
    twitter: {
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

export default async function Home({ params }: Props) {
  const { locale } = await params

  return (
    <main className="w-full min-h-screen">
      <Hero locale={locale} />
      <WhyUsSection locale={locale} />
      <ProjectSection locale={locale} />
      <ProjectsGridSection />
      <CalculatorSection />
    </main>
  )
}
