import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

const statusLabel = (status: string, locale: string) => {
  if (status === 'completed') return locale === 'ka' ? 'დასრულებული' : 'Completed'
  return locale === 'ka' ? 'მიმდინარე' : 'Ongoing'
}

const statusColor = (status: string) =>
  status === 'completed' ? 'bg-[#006341]/10 text-[#006341]' : 'bg-[#D1C09B]/30 text-[#6B4F2A]'

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

  const gallery = ((project.gallery || []) as any[]).map((g: any) => g.image).filter(Boolean)

  return (
    <main className="w-full min-h-screen bg-[#FFFFFF]">
      {/* Hero Cover */}
      <section className="relative w-full h-[55vh] min-h-[400px] max-h-[620px] overflow-hidden">
        {project.coverImage && typeof project.coverImage === 'object' ? (
          <Image
            src={(project.coverImage as any).url!}
            alt={(project.coverImage as any).alt || project.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#D1C09B]/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-[#000000]/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 max-w-[1408px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          {/* Back */}
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-[#D1C09B] text-sm mb-6 hover:text-white transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            {locale === 'ka' ? 'პროექტები' : 'Projects'}
          </Link>

          <div className="flex flex-wrap gap-3 mb-4">
            {project.status && (
              <span
                className={`px-3 pt-[6px] pb-[3px] rounded-xl text-xs font-semibold ${statusColor(project.status)}`}
              >
                {statusLabel(project.status, locale)}
              </span>
            )}
            {project.category && (
              <span className="px-3 pt-[6px] pb-[3px] rounded-xl text-xs font-semibold bg-white/10 text-white">
                {project.category}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-medium text-white tracking-tight mb-3">
            {project.title}
          </h1>

          {project.location && (
            <span className="flex items-center gap-2 text-[#D1C09B] text-sm">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {project.location}
            </span>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1408px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl">
          {project.description && (
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <RichText data={project.description as SerializedEditorState} />
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="max-w-[1408px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <h2 className="text-2xl font-medium text-[#000000] mb-8 pb-4 border-b border-[#D1C09B]/40">
            {locale === 'ka' ? 'გალერეა' : 'Gallery'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((img: any, i: number) => (
              <div
                key={i}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#D1C09B]/10"
              >
                <Image
                  src={img.url!}
                  alt={img.alt || `${project.title} — ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized={process.env.NODE_ENV === 'development'}
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
