import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeftCircle } from 'lucide-react'

type Props = {
  params: Promise<{ locale: string; slug: string; id: string }>
}

const apartmentStatusLabel = (status: string, locale: string) => {
  if (status === 'available') return locale === 'ka' ? 'თავისუფალი' : 'Available'
  if (status === 'booked') return locale === 'ka' ? 'დაჯავშნილი' : 'Booked'
  return locale === 'ka' ? 'გაყიდული' : 'Sold'
}

export default async function ApartmentDetailPage({ params }: Props) {
  const { locale, slug, id } = await params

  const payload = await getPayload({ config })

  // ვიღებთ პროექტს (breadcrumb-ისთვის და დასტურისთვის, რომ ბინა ამ პროექტს ეკუთვნის)
  const { docs: projectDocs } = await payload.find({
    collection: 'projects' as any,
    locale: locale as 'en' | 'ka',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
  })
  const project = projectDocs[0] as any
  if (!project) return notFound()

  // ვიღებთ კონკრეტულ აპარტამენტს id-ით
  let apartment: any = null
  try {
    apartment = await payload.findByID({
      collection: 'apartments' as any,
      id,
      locale: locale as 'en' | 'ka',
      depth: 2,
    })
  } catch {
    return notFound()
  }

  if (!apartment) return notFound()

  // დავრწმუნდეთ რომ ეს აპარტამენტი მართლა ამ პროექტს ეკუთვნის
  const apartmentProjectId =
    typeof apartment.project === 'object' ? apartment.project?.id : apartment.project
  if (apartmentProjectId !== project.id) return notFound()

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Breadcrumb / უკან დაბრუნება */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Link
          href={`/${locale}/projects/${slug}`}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-800 transition-colors text-xs uppercase tracking-widest w-fit"
        >
          <ChevronLeftCircle /> {project.title}
        </Link>
      </div>

      {/* Hero — მთავარი გეგმარების სურათი */}
      <section className="max-w-7xl mx-auto px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* გეგმარება */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full bg-gray-50 border border-gray-100 rounded-lg overflow-hidden">
              {apartment.planImage && typeof apartment.planImage === 'object' ? (
                <Image
                  src={apartment.planImage.url}
                  alt={apartment.apartmentNumber}
                  fill
                  priority
                  className="object-contain p-6"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs uppercase tracking-widest">
                  {locale === 'ka' ? 'გეგმარება არ არის' : 'No plan image'}
                </div>
              )}
            </div>
          </div>

          {/* ინფორმაცია */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <h1 className="font-kirovi text-4xl md:text-5xl text-gray-900 leading-none">
                {locale === 'ka' ? 'ბინა' : 'Apt.'} {apartment.apartmentNumber}
              </h1>
              <span
                className={`text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded ${
                  apartment.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : apartment.status === 'booked'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-gray-200 text-gray-700'
                }`}
              >
                {apartmentStatusLabel(apartment.status, locale)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-y-5 gap-x-6 text-sm text-gray-600 border-t border-b border-gray-100 py-6 mb-8">
              <div>
                <span className="text-xs text-gray-400 block mb-1 uppercase tracking-widest">
                  {locale === 'ka' ? 'საერთო ფართი' : 'Total Area'}
                </span>
                <strong className="text-gray-900 text-lg">{apartment.area} კვ.მ</strong>
              </div>
              {apartment.floor && (
                <div>
                  <span className="text-xs text-gray-400 block mb-1 uppercase tracking-widest">
                    {locale === 'ka' ? 'სართული' : 'Floor'}
                  </span>
                  <strong className="text-gray-900 text-lg">{apartment.floor}</strong>
                </div>
              )}
              {apartment.bedrooms && (
                <div>
                  <span className="text-xs text-gray-400 block mb-1 uppercase tracking-widest">
                    {locale === 'ka' ? 'საძინებლები' : 'Bedrooms'}
                  </span>
                  <strong className="text-gray-900 text-lg">{apartment.bedrooms}</strong>
                </div>
              )}
              {apartment.price && (
                <div>
                  <span className="text-xs text-gray-400 block mb-1 uppercase tracking-widest">
                    {locale === 'ka' ? 'ფასი' : 'Price'}
                  </span>
                  <strong className="text-[#1a2e2a] text-lg">
                    ${apartment.price.toLocaleString()}
                  </strong>
                </div>
              )}
            </div>

            {/* ოთახების დეტალები */}
            {apartment.roomsDetails && apartment.roomsDetails.length > 0 && (
              <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5 mb-8">
                <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-3 font-medium">
                  {locale === 'ka' ? 'ოთახების დეტალები' : 'Room Details'}
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  {apartment.roomsDetails.map((room: any, rIdx: number) => (
                    <div
                      key={rIdx}
                      className="flex justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0 text-gray-600"
                    >
                      <span>{room.roomName}</span>
                      <span className="font-medium text-gray-900">{room.roomArea} მ²</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* მახასიათებლები */}
            {apartment.features && apartment.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100">
                {apartment.features.map((f: any, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs bg-white border border-gray-200 text-gray-500 px-3 py-1 rounded-sm"
                  >
                    {f.feature}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ბინის შიდა გალერეა */}
      {apartment.gallery && apartment.gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6 border-t border-gray-100 pt-8">
            {locale === 'ka' ? 'ბინის ფოტოები' : 'Apartment Photos'}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {apartment.gallery.map((galleryItem: any, gIdx: number) => {
              const img = galleryItem.image
              if (!img || typeof img !== 'object') return null
              return (
                <div
                  key={gIdx}
                  className="relative aspect-[4/3] overflow-hidden bg-gray-100 rounded-lg"
                >
                  <Image
                    src={img.url}
                    alt={img.alt || `Apartment photo ${gIdx + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              )
            })}
          </div>
        </section>
      )}
    </main>
  )
}
