import { getPayload } from 'payload'
import config from '@payload-config'
import RestaurantBookingClient from './RestaurantBookingClient'
import RestaurantHero from '../../components/common/RestaurantHero/index'
import RestaurantMenus from '../../components/common/RestaurantMenus/index'

type Props = {
  params: Promise<{ locale: string }>
}

type Reservation = {
  id: string
  title: string
  start: string
  end?: string
}

export default async function RestaurantPage({ params }: Props) {
  const { locale } = await params
  const currentLocale = locale === 'ka' ? 'ka' : 'en'

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'restaurant-page',
    locale: currentLocale,
    fallbackLocale: false,
    limit: 1,
  })

  const page = docs[0]

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const reservationsRes = await fetch(`${baseUrl}/api/reservations`, {
    cache: 'no-store',
  })

  const reservations: Reservation[] = reservationsRes.ok ? await reservationsRes.json() : []

  return (
    <main className="w-full min-h-screen bg-[#F8F6F1]">
      <RestaurantHero />
      <RestaurantMenus locale={currentLocale} />
      <RestaurantBookingClient locale={currentLocale} />
    </main>
  )
}