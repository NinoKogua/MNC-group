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
            <p className="text-white/60 text-sm uppercase tracking-widest">
              {project.location}
            </p>
          )}
        </div>
      </section>

      {/* დეტალები + აღწერა */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* მარცხენა — metadata */}
        <div className="lg:col-span-3 flex flex-col gap-7 border-t border-gray-100 pt-8">
          {project.status && (
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {locale === 'ka' ? 'სტატუსი' : 'Status'}
              </p>
              <span className={`text-xs uppercase tracking-widest px-3 pt-[6px] pb-[3px] rounded-full inline-block ${
                project.status === 'completed'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-amber-50 text-amber-700'
              }`}>
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

      {/* გალერეა */}
      {gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {gallery.map((img: any, i: number) => {
              const isWide = i === 0 || i % 5 === 0
              return (
                <div
                  key={i}
                  className={`relative overflow-hidden bg-gray-100 ${
                    isWide ? 'md:col-span-2 aspect-[16/7]' : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={img.url!}
                    alt={img.alt || `${project.title} — ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized={process.env.NODE_ENV === 'development'}
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              )
            })}
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
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                  {p.location}
                </p>
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