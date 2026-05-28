import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import cover from '@/app/assets/images/for_news.jpg' // შეცვალე შენი cover-ით

type Props = {
  params: Promise<{ locale: string }>
}

type Project = {
  id: string
  slug: string
  title: string
  location?: string
  category?: string
  status?: 'completed' | string
  coverImage?: { url?: string; alt?: string } | null
}

const statusLabel = (status: string, locale: string) => {
  if (status === 'completed') return locale === 'ka' ? 'დასრულებული' : 'Completed'
  return locale === 'ka' ? 'მიმდინარე' : 'Ongoing'
}

const statusColor = (status: string) =>
  status === 'completed' ? 'bg-[#006341]/10 text-[#006341]' : 'bg-[#D1C09B]/30 text-[#6B4F2A]'

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params

  const payload = await getPayload({ config })

  const { docs: projects } = (await payload.find({
    collection: 'projects' as any,
    locale: locale as 'en' | 'ka',
    depth: 2,
  })) as unknown as { docs: Project[] }

  return (
    <main className="w-full min-h-screen bg-[#FFFFFF]">
      {/* Hero */}
      <section className="relative w-full h-[40vh] min-h-[350px] max-h-[500px] flex flex-col justify-end overflow-hidden mb-16">
        <Image src={cover} alt="Projects Header" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/50 to-[#000000]/30" />

        <div className="relative z-10 max-w-[1408px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10">
          <span className="text-[#D1C09B] text-sm font-semibold tracking-widest uppercase block mb-3">
            {locale === 'ka' ? 'ჩვენი სამუშაოები' : 'Our Work'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#FFFFFF] tracking-tight">
            {locale === 'ka' ? 'პროექტები' : 'Projects'}
          </h1>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-[1408px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#D1C09B]/40">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {projects.length} {locale === 'ka' ? 'პროექტი' : 'Projects'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/${locale}/projects/${project.slug}`}
              className="group block"
            >
              <div className="flex flex-col rounded-2xl md:rounded-3xl border border-[#D1C09B]/20 overflow-hidden hover:border-[#006341]/30 transition-all duration-300 hover:bg-[#F5F5F5] h-full">
                {/* Cover Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#D1C09B]/10">
                  {project.coverImage && typeof project.coverImage === 'object' ? (
                    <Image
                      src={(project.coverImage as any).url!}
                      alt={(project.coverImage as any).alt || project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized={process.env.NODE_ENV === 'development'}
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#D1C09B]/20 flex items-center justify-center">
                      <span className="text-[#6B4F2A]/40 text-sm">No image</span>
                    </div>
                  )}

                  {/* Status Badge */}
                  {project.status && (
                    <span
                      className={`absolute top-3 left-3 px-3 pt-[6px] pb-[3px] rounded-xl text-xs font-semibold ${statusColor(project.status)}`}
                    >
                      {statusLabel(project.status, locale)}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-5">
                  <h2 className="font-kirovi font-medium text-[#000000] text-xl leading-snug mb-2 group-hover:text-[#006341] transition-colors duration-300">
                    {project.title}
                  </h2>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.location && (
                      <span className="flex items-center gap-1 text-xs text-[#6B4F2A]">
                        <svg
                          width="12"
                          height="12"
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
                    {project.category && (
                      <span className="text-xs px-2 pt-[5px] pb-[2px] bg-[#F5F5F5] text-gray-500 rounded-lg">
                        {project.category}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto">
                    <span className="inline-flex items-center px-5 pt-[10px] pb-[7px] text-sm font-medium bg-[#E8E8E8] group-hover:bg-[#006341] text-[#000000] group-hover:text-[#FFFFFF] rounded-xl transition-all duration-300">
                      {locale === 'ka' ? 'დეტალურად' : 'View Project'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[#6B4F2A] text-lg font-medium">
              {locale === 'ka' ? 'პროექტები ჯერ არ დამატებულა' : 'No projects found'}
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
