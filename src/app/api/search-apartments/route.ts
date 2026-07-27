import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // უარყოფითი / არავალიდური მნიშვნელობები იგნორირდება (მინიმუმი 0)
  const parsePositiveParam = (key: string) => {
    const raw = searchParams.get(key)
    if (!raw) return null
    const value = Number(raw)
    if (!Number.isFinite(value) || value < 0) return null
    return value
  }

  const targetTotalArea = parsePositiveParam('totalArea')
  const targetBedroomCount = parsePositiveParam('bedroom')

  try {
    const payload = await getPayload({ config })

    const { docs: allApartments } = await payload.find({
      collection: 'apartments' as any,
      depth: 2,
      limit: 100,
      where: {
        status: { equals: 'available' },
      },
    })

    const filtered = (allApartments as any[]).filter((apt) => {
      // 1. საერთო ფართის ფილტრაცია (apt.area) -> ± 10 კვ.მ
      if (targetTotalArea) {
        const minTotal = targetTotalArea - 10
        const maxTotal = targetTotalArea + 10
        if (apt.area < minTotal || apt.area > maxTotal) {
          return false
        }
      }

      // 2. საძინებლების რაოდენობის ფილტრაცია (apt.bedrooms) -> ზუსტი დამთხვევა
      if (targetBedroomCount) {
        if (Number(apt.bedrooms) !== targetBedroomCount) {
          return false
        }
      }

      return true
    })

    return NextResponse.json(filtered)
  } catch (error) {
    console.error('Search Error:', error)
    return NextResponse.json({ error: 'სერვერული შეცდომა' }, { status: 500 })
  }
}
