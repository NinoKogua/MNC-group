import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SerializedEditorState } from 'lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

const statusLabel = (status: string, locale: string) => {
  if (status === 'completed') return locale === 'ka' ? 'დასრულებული' : 'Completed'
  return locale === 'ka' ? 'მიმდინარე' : 'Ongoing'
}

const apartmentStatusLabel = (status: string, locale: string) => {
  if (status === 'available') return locale === 'ka' ? 'თავისუფალი' : 'Available'
  if (status === 'booked') return locale === 'ka' ? 'დაჯავშნილი' : 'Booked'
  return locale === 'ka' ? 'გაყიდული' : 'Sold'
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'projects' as any,
    locale: locale as 'en' | 'ka',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  const project = docs[0] as any
  if (!project) return notFound()

  // წამოვიღოთ ამ პროექტზე მიბმული აპარტამენტები
  const { docs: apartments } = await payload.find({
    collection: 'apartments' as any,
    locale: locale as 'en' | 'ka',
    depth: 2,
    limit: 100,
    where: { project: { equals: project.id } },
  })

  const gallery = ((project.gallery || []) as any[]).map((g: any) => g.image).filter(Boolean)

  // მსგავსი პროექტები
  const { docs: similar } = await payload.find({
    collection: 'projects' as any,
    locale: locale as 'en' | 'ka',
    depth: 2,
    limit: 4,
    where: { slug: { not_equals: slug } },
  })

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        {project.coverImage && typeof project.coverImage === 'object' ? (
          <Image
            src={(project.coverImage as any).url!}
            alt={(project.coverImage as any).alt || project.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100" />
        )}
        <div className="absolute inset-0 bg-black/35" />

        {/* უკან */}
        <div className="absolute top-8 left-6 md:left-12 z-10">
          <Link
            href={`/${locale}/projects`}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs uppercase tracking-widest"
          >
            {locale === 'ka' ? 'პროექტები' : 'Projects'}
          </Link>
        </div>

        {/* სათაური */}
        <div className="absolute bottom-12 left-6 md:left-12 z-10">
          {project.category && (
            <p className="text-white/50 text-xs uppercase tracking-[0.3em] mb-3">
              {project.category}
            </p>
          )}
          <h1 className="font-kirovi text-5xl md:text-7xl text-white leading-none mb-4">
            {project.title}
          </h1>
          {project.location && (
            <p className="text-white/60 text-sm uppercase tracking-widest">{project.location}</p>
          )}
        </div>
      </section>

      {/* დეტალები + აღწერა */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* მარცხენა — metadata */}
        <div className="lg:col-span-3 flex-col-span gap-7 border-t border-gray-100 pt-8">
          {project.status && (
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {locale === 'ka' ? 'სტატუსი' : 'Status'}
              </p>
              <span
                className={`text-xs uppercase tracking-widest px-3 pt-[6px] pb-[3px] rounded-full inline-block ${
                  project.status === 'completed'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {statusLabel(project.status, locale)}
              </span>
            </div>
          )}
          {project.location && (
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {locale === 'ka' ? 'ლოკაცია' : 'Location'}
              </p>
              <p className="text-gray-800 text-sm">{project.location}</p>
            </div>
          )}
          {project.category && (
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {locale === 'ka' ? 'კატეგორია' : 'Category'}
              </p>
              <p className="text-gray-800 text-sm">{project.category}</p>
            </div>
          )}
          {project.year && (
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {locale === 'ka' ? 'წელი' : 'Year'}
              </p>
              <p className="text-gray-800 text-sm">{project.year}</p>
            </div>
          )}
          {project.client && (
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {locale === 'ka' ? 'კლიენტი' : 'Client'}
              </p>
              <p className="text-gray-800 text-sm">{project.client}</p>
            </div>
          )}
        </div>

        {/* მარჯვენა — აღწერა */}
        <div className="lg:col-span-9 border-t border-gray-100 pt-8">
          {project.description && (
            <div className="prose prose-lg text-gray-600 leading-relaxed max-w-3xl">
              <RichText data={project.description as SerializedEditorState} />
            </div>
          )}
        </div>
      </section>

      {/* აპარტამენტები / ბინების სია */}
      {apartments.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="border-t border-gray-100 pt-12 mb-8">
            <h2 className="font-kirovi text-3xl text-gray-900 mb-2">
              {locale === 'ka' ? 'აირჩიე აპარტამენტი' : 'Choose an Apartment'}
            </h2>
            <p className="text-sm text-gray-400 tracking-wide uppercase">
              {locale === 'ka'
                ? `სულ ნაპოვნია ${apartments.length} ბინა`
                : `${apartments.length} apartments found`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(apartments as any[]).map((apt: any) => (
              /* დაემატა 'group' კლასი ჰოვერის სამართავად + Link აპარტამენტის შიდა გვერდზე */
              <Link
                key={apt.id}
                href={`/${locale}/projects/${slug}/apartments/${apt.id}`}
                className="group border border-gray-100 rounded-lg overflow-hidden bg-gray-50/50 flex flex-col hover:shadow-lg hover:border-gray-200 transition-all duration-300"
              >
                {/* ბინის მთავარი გეგმარების ფოტო */}
                <div className="relative aspect-[4/3] w-full bg-white border-b border-gray-100 p-4 overflow-hidden">
                  {apt.planImage && typeof apt.planImage === 'object' ? (
                    <Image
                      src={apt.planImage.url}
                      alt={apt.apartmentNumber}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs uppercase tracking-widest">
                      {locale === 'ka' ? 'გეგმარება არ არის' : 'No plan image'}
                    </div>
                  )}
                </div>

                {/* ბინის ძირითადი ინფო */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-kirovi text-xl text-gray-900 group-hover:text-[#1a2e2a] transition-colors">
                      {locale === 'ka' ? 'ბინა' : 'Apt.'} {apt.apartmentNumber}
                    </h3>
                    <span
                      className={`text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded ${
                        apt.status === 'available'
                          ? 'bg-green-100 text-green-800'
                          : apt.status === 'booked'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {apartmentStatusLabel(apt.status, locale)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-gray-600 border-t border-gray-100/80 pt-4 mb-4">
                    <div>
                      <span className="text-xs text-gray-400 block mb-0.5">
                        {locale === 'ka' ? 'საერთო ფართი' : 'Total Area'}
                      </span>
                      <strong className="text-gray-900">{apt.area} კვ.მ</strong>
                    </div>
                    {apt.floor && (
                      <div>
                        <span className="text-xs text-gray-400 block mb-0.5">
                          {locale === 'ka' ? 'სართული' : 'Floor'}
                        </span>
                        <strong className="text-gray-900">{apt.floor}</strong>
                      </div>
                    )}
                    {apt.bedrooms && (
                      <div>
                        <span className="text-xs text-gray-400 block mb-0.5">
                          {locale === 'ka' ? 'საძინებლები' : 'Bedrooms'}
                        </span>
                        <strong className="text-gray-900">{apt.bedrooms}</strong>
                      </div>
                    )}
                    {apt.price && (
                      <div>
                        <span className="text-xs text-gray-400 block mb-0.5">
                          {locale === 'ka' ? 'ფასი' : 'Price'}
                        </span>
                        <strong className="text-[#1a2e2a]">${apt.price.toLocaleString()}</strong>
                      </div>
                    )}
                  </div>

                  {/* ==========================================================================
                     ჰოვერ ბლოკი: იხსნება მხოლოდ group-hover-ზე ლამაზი ანიმაციით
                     ========================================================================== */}
                  <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-[600px] group-hover:opacity-100 group-hover:border-t group-hover:border-gray-100 group-hover:pt-4 group-hover:mb-4">
                    {/* 1. ოთახების დეტალური ჩამონათვალი (ექსელის ცხრილი) */}
                    {apt.roomsDetails && apt.roomsDetails.length > 0 && (
                      <div className="mb-4 bg-white border border-gray-100 rounded p-3">
                        <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2 font-medium">
                          {locale === 'ka' ? 'ოთახების დეტალები' : 'Room Details'}
                        </p>
                        <div className="flex flex-col gap-1.5 text-xs">
                          {apt.roomsDetails.map((room: any, rIdx: number) => (
                            <div
                              key={rIdx}
                              className="flex justify-between border-b border-gray-50 pb-1 last:border-0 last:pb-0 text-gray-600"
                            >
                              <span>{room.roomName}</span>
                              <span className="font-medium text-gray-900">{room.roomArea} მ²</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 2. ბინის შიდა ინდივიდუალური გალერეა */}
                    {apt.gallery && apt.gallery.length > 0 && (
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2 font-medium">
                          {locale === 'ka' ? 'ბინის ფოტოები' : 'Apartment Photos'}
                        </p>
                        <div className="grid grid-cols-4 gap-1.5">
                          {apt.gallery.map((galleryItem: any, gIdx: number) => {
                            const img = galleryItem.image
                            if (!img || typeof img !== 'object') return null
                            return (
                              <div
                                key={gIdx}
                                className="relative aspect-square rounded overflow-hidden border border-gray-100 bg-white group/img"
                              >
                                <Image
                                  src={img.url}
                                  alt={img.alt || `Apt photo ${gIdx + 1}`}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover/img:scale-110"
                                  sizes="10vw"
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* მახასიათებლები (სერვისები) — ყოველთვის ბოლოში რჩება */}
                  {apt.features && apt.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-gray-100/50">
                      {apt.features.map((f: any, idx: number) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-sm"
                        >
                          {f.feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* მსგავსი პროექტები */}
      {similar.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="border-t border-gray-200 pt-12 mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
              {locale === 'ka' ? 'სხვა პროექტები' : 'Other Projects'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(similar as any[]).map((p: any) => (
              <Link
                key={p.id}
                href={`/${locale}/projects/${p.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
                  {p.coverImage && typeof p.coverImage === 'object' && (
                    <Image
                      src={(p.coverImage as any).url!}
                      alt={(p.coverImage as any).alt || p.title}
                      fill
                      sizes="25vw"
                      unoptimized={process.env.NODE_ENV === 'development'}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{p.location}</p>
                <h3 className="font-kirovi text-xl text-gray-900 group-hover:text-[#1a2e2a] transition-colors">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
