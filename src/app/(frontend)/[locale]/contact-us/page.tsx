import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import ContactHero from './ContactHero'
import ContactSection from './ContactPageContainer'
import { buildAlternates, buildKeywords, buildOgImages } from '@/utilities/seo'
import { buildContactPageJsonLd } from '@/utilities/jsonLd'
import JsonLd from '@/app/(frontend)/components/common/JsonLd'

type Locale = 'en' | 'ka'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const currentLocale: Locale = locale === 'ka' ? 'ka' : 'en'

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'contact-info',
    locale: currentLocale,
    fallbackLocale: false,
    limit: 1,
  })

  const info = docs[0]
  const title = info?.heroTitle || (currentLocale === 'ka' ? 'დაგვიკავშირდით' : 'Contact Us')
  const description =
    info?.heroDescription ||
    (currentLocale === 'ka'
      ? 'გვიკავშირდით ნებისმიერ კითხვაზე - სიამოვნებით დაგეხმარებით.'
      : 'Get in touch with us - we are happy to help.')

  const alternates = buildAlternates(currentLocale, 'contact-us')
  const keywords = buildKeywords(
    currentLocale,
    currentLocale === 'ka' ? ['დაგვიკავშირდით'] : ['contact MNC Group'],
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

export default async function ContactPage({ params }: Props) {
  const { locale } = await params

  const currentLocale: Locale = locale === 'ka' ? 'ka' : 'en'

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'contact-info',
    locale: currentLocale,
    fallbackLocale: false,
    limit: 1,
  })

  const info = docs[0]
  const title = info?.heroTitle || (currentLocale === 'ka' ? 'დაგვიკავშირდით' : 'Contact Us')
  const description =
    info?.heroDescription ||
    (currentLocale === 'ka'
      ? 'გვიკავშირდით ნებისმიერ კითხვაზე - სიამოვნებით დაგეხმარებით.'
      : 'Get in touch with us - we are happy to help.')
  const contactPageJsonLd = buildContactPageJsonLd(currentLocale, title, description)

  return (
    <main className="w-full bg-[#ffffff] min-h-screen">
      <JsonLd data={contactPageJsonLd} />
      <ContactHero locale={currentLocale} />
      <ContactSection locale={currentLocale} />
    </main>
  )
}
