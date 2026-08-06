import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import RestaurantBookingClient from './RestaurantBookingClient'
import RestaurantHero from '../../components/common/RestaurantHero/index'
import RestaurantMenus from '../../components/common/RestaurantMenus/index'
import restaurantCover from '../../../assets/images/restaurant_imgs/restaurantt.jpg'
import {
  buildAlternates,
  buildKeywords,
  buildOgImages,
  type Locale as SiteLocale,
} from '@/utilities/seo'
import { buildRestaurantJsonLd } from '@/utilities/jsonLd'
import JsonLd from '../../components/common/JsonLd'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const currentLocale = (locale === 'ka' ? 'ka' : 'en') as SiteLocale

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'restaurant-page',
    locale: currentLocale,
    fallbackLocale: false,
    limit: 1,
  })

  const page = docs[0]
  const title = page?.heroTitle || (currentLocale === 'ka' ? 'რესტორანი' : 'Restaurant')
  const description =
    page?.heroDescription ||
    (currentLocale === 'ka'
      ? 'დაჯავშნეთ მაგიდა აემანი-ს რესტორანში.'
      : "Book a table at Aemani's restaurant.")

  const alternates = buildAlternates(currentLocale, 'restaurant')
  const keywords = buildKeywords(
    currentLocale,
    currentLocale === 'ka' ? ['რესტორანი', 'მაგიდის დაჯავშნა'] : ['restaurant', 'table booking'],
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
      images: buildOgImages(restaurantCover.src, title),
    },
    twitter: { title, description, images: [restaurantCover.src] },
  }
}

export default async function RestaurantPage({ params }: Props) {
  const { locale } = await params
  const currentLocale = locale === 'ka' ? 'ka' : 'en'

  const payload = await getPayload({ config })

  const [{ docs }, { docs: contactDocs }] = await Promise.all([
    payload.find({
      collection: 'restaurant-page',
      locale: currentLocale,
      fallbackLocale: false,
      limit: 1,
    }),
    payload.find({
      collection: 'contact-info',
      locale: currentLocale,
      fallbackLocale: false,
      limit: 1,
    }),
  ])

  const page = docs[0]
  const restaurantJsonLd = buildRestaurantJsonLd(
    currentLocale,
    page?.heroTitle || (currentLocale === 'ka' ? 'რესტორანი' : 'Restaurant'),
    page?.heroDescription ?? undefined,
    contactDocs[0],
  )

  return (
    <main className="w-full min-h-screen bg-[#F8F6F1]">
      <RestaurantHero locale={currentLocale} />
      <RestaurantMenus locale={currentLocale} />
      <RestaurantBookingClient locale={currentLocale} />
    </main>
  )
}
