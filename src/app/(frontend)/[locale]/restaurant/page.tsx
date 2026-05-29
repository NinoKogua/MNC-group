import { getPayload } from 'payload'
import config from '@payload-config'
import RestaurantBookingClient from './RestaurantBookingClient'

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
      <section className="relative bg-[#135544] text-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#D1C09B] uppercase font-bold tracking-widest mb-4">
            {page?.id || (currentLocale === 'ka' ? 'რესტორანი' : 'Restaurant')}
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            {page?.heroTitle || (currentLocale === 'ka' ? 'დაჯავშნე მაგიდა' : 'Book a Table')}
          </h1>

          <p className="max-w-2xl text-lg text-white/80">
            {page?.heroDescription ||
              (currentLocale === 'ka'
                ? 'აირჩიეთ სასურველი დრო კალენდრიდან და დაჯავშნეთ მაგიდა მარტივად.'
                : 'Choose your preferred time from the calendar and book a table easily.')}
          </p>
        </div>
      </section>

      <RestaurantBookingClient locale={currentLocale} reservations={reservations} />
    </main>
  )
}
