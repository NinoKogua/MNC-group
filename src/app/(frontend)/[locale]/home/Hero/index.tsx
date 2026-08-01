import { getPayload } from 'payload'
import configPromise from '@payload-config'
import HeroSlider from './HeroSlider'

export default async function Hero({ locale }: { locale: string }) {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'hero-slides',
    locale: locale as 'en' | 'ka',
    sort: 'order',
    limit: 10,
    depth: 1,
  })

  const slides = docs.map((doc) => ({
    id: String(doc.id),
    title: doc.title as string,
    highlight: (doc.highlight as string) ?? '',
    description: (doc.description as string) ?? '',
    image: {
      url: (doc.image as { url: string; alt?: string })?.url ?? '',
      alt: (doc.image as { url: string; alt?: string })?.alt,
    },
    primaryButtonText: doc.primaryButtonText as string | undefined,
    primaryButtonLink: doc.primaryButtonLink as string | undefined,
    secondaryButtonText: doc.secondaryButtonText as string | undefined,
  }))

  return <HeroSlider slides={slides} locale={locale} />
}
