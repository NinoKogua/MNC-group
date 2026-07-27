import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// აბრუნებს ხელმისაწვდომ ფილტრის მნიშვნელობებს (საძინებლების რაოდენობები) დროფდაუნისთვის
export async function GET() {
  try {
    const payload = await getPayload({ config })

    const { docs: allApartments } = await payload.find({
      collection: 'apartments' as any,
      depth: 0,
      limit: 1000,
      where: {
        status: { equals: 'available' },
      },
    })

    const bedrooms = Array.from(
      new Set(
        (allApartments as any[])
          .map((apt) => Number(apt.bedrooms))
          .filter((count) => Number.isFinite(count) && count > 0),
      ),
    ).sort((a, b) => a - b)

    return NextResponse.json({ bedrooms })
  } catch (error) {
    console.error('Apartment Filters Error:', error)
    return NextResponse.json({ error: 'სერვერული შეცდომა' }, { status: 500 })
  }
}
