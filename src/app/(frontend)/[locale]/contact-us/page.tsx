import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import ContactHero from './ContactHero'
import ContactSection from './ContactPageContainer'
import { buildAlternates } from '@/utilities/seo'

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

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      locale: currentLocale === 'ka' ? 'ka_GE' : 'en_US',
    },
    twitter: { title, description },
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params

  const currentLocale: Locale = locale === 'ka' ? 'ka' : 'en'

  return (
    <main className="w-full bg-[#ffffff] min-h-screen">
      <ContactHero locale={currentLocale} />
      <ContactSection locale={currentLocale} />
    </main>
  )
}
