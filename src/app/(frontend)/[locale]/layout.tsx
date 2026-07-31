import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import '@/app/(frontend)/globals.css'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'
import { notFound } from 'next/navigation'
import { getBaseUrl } from '@/utilities/getBaseUrl'
import { buildOrganizationJsonLd } from '@/utilities/jsonLd'
import { SITE_KEYWORDS } from '@/utilities/seo'
import JsonLd from '../components/common/JsonLd'

const DEFAULT_DESCRIPTION =
  'ფიჭვების პროექტი მაღალმთიანი ტიპის ეკომეგობრული სივრცეების შექმნას ისახავს მიზნად.'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: 'MNC Group',
    template: '%s | MNC Group',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [...SITE_KEYWORDS.ka, ...SITE_KEYWORDS.en],
  publisher: 'MNC Group',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.ico' }],
  },
  openGraph: {
    siteName: 'MNC Group',
    type: 'website',
    alternateLocale: ['en_US', 'ka_GE'],
    images: [{ url: '/Logo.png', width: 1080, height: 1080, alt: 'MNC Group' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/Logo.png'],
  },
}

const locales = ['ka', 'en'] as const
type Locale = (typeof locales)[number]

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!isLocale(locale)) return notFound()

  const payload = await getPayload({ config })
  const [{ docs: contactDocs }, { docs: footerDocs }] = await Promise.all([
    payload.find({ collection: 'contact-info', locale, fallbackLocale: false, limit: 1 }),
    payload.find({ collection: 'footer', locale, limit: 1 }),
  ])

  const organizationJsonLd = buildOrganizationJsonLd(
    locale,
    contactDocs[0],
    footerDocs[0]?.socialLinks ?? undefined,
  )

  return (
    <html lang={locale}>
      <body>
        <JsonLd data={organizationJsonLd} />
        <Navbar />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}
