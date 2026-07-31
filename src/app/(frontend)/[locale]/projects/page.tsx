import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import DoorAnimation from '../../components/common/DoorAnimation/index'
import ProjectsClient from './ProjectsClient'
import {
  buildAlternates,
  buildKeywords,
  buildOgImages,
  type Locale as SiteLocale,
} from '@/utilities/seo'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const currentLocale = (locale === 'ka' ? 'ka' : 'en') as SiteLocale

  const title = currentLocale === 'ka' ? 'პროექტები' : 'Projects'
  const description =
    currentLocale === 'ka'
      ? 'გაეცანით MNC Group-ის მიმდინარე და დასრულებულ საცხოვრებელ პროექტებს საქართველოში.'
      : "Explore MNC Group's ongoing and completed residential projects across Georgia."

  const alternates = buildAlternates(currentLocale, 'projects')
  const keywords = buildKeywords(
    currentLocale,
    currentLocale === 'ka' ? ['საცხოვრებელი პროექტები'] : ['residential projects'],
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
      images: buildOgImages('/Logo.png', title),
    },
    twitter: { title, description, images: ['/Logo.png'] },
  }
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params
  const payload = await getPayload({ config })

  const { docs: projects } = (await payload.find({
    collection: 'projects' as any,
    locale: locale as 'en' | 'ka',
    depth: 2,
    limit: 100,
  })) as unknown as { docs: any[] }

  return (
    <DoorAnimation>
      <ProjectsClient projects={projects} locale={locale} />
    </DoorAnimation>
  )
}