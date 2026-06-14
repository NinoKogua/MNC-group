import { getPayload } from 'payload'
import config from '@payload-config'
import RestaurantBookingClient from './RestaurantBookingClient'
import RestaurantHero from '../../components/common/RestaurantHero/index'
import RestaurantMenus from '../../components/common/RestaurantMenus/index'

type Props = {
  params: Promise<{ locale: string }>
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

  return (
    <main className="w-full min-h-screen bg-[#F8F6F1]">
      <RestaurantHero />
      <RestaurantMenus locale={currentLocale} />
      <RestaurantBookingClient locale={currentLocale} />
    </main>
  )
}
