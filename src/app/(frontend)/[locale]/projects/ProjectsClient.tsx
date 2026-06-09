'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Project = {
  id: string
  slug: string
  title: string
  location?: string
  category?: string
  status?: 'completed' | string
  year?: string
  coverImage?: { url?: string; alt?: string } | null
}

type Props = {
  projects: Project[]
  locale: string
}

const statusLabel = (status: string, locale: string) => {
  if (status === 'completed') return locale === 'ka' ? 'დასრულებული' : 'Completed'
  return locale === 'ka' ? 'მიმდინარე' : 'Ongoing'
}

const pattern = `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a2e2a' fill-opacity='0.030'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`

export default function ProjectsClient({ projects, locale }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(projects.map((p) => p.category).filter(Boolean))) as string[]

  const filtered = activeCategory
    ? projects.filter((p) => p.category === activeCategory)
    : projects

  return (
    <main
      className="w-full min-h-screen bg-[#F8F6F1]"
      style={{ backgroundImage: pattern }}
    >

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="font-kirovi text-6xl md:text-8xl text-[#1a2e2a] leading-none">
              {locale === 'ka' ? 'პროექტები' : 'Projects'}
            </h1>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed md:text-right">
            {locale === 'ka'
              ? `სულ ${projects.length} პროექტი`
              : `${projects.length} projects total`}
          </p>
        </div>

        {/* კატეგორიების filter */}
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 pt-[7px] pb-[4px] text-xs uppercase tracking-widest rounded-md border transition-colors ${
              activeCategory === null
                ? 'border-green-primary bg-green-primary text-white'
                : 'border-gray-300 text-gray-500 hover:border-gray-500'
            }`}
          >
            {locale === 'ka' ? 'ყველა' : 'All'}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 pt-[7px] pb-[4px] text-xs uppercase tracking-widest rounded-md border transition-colors ${
                activeCategory === cat
                  ? 'border-green-primary bg-green-primary text-white'
                  : 'border-gray-300 text-gray-500 hover:border-gray-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 h-px bg-gray-200 w-full" />
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <Link
              key={project.id}
              href={`/${locale}/projects/${project.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 rounded-t-2xl">
                {project.coverImage && typeof project.coverImage === 'object' && (project.coverImage as any).url ? (
                  <Image
                    src={(project.coverImage as any).url}
                    alt={(project.coverImage as any).alt || project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized={process.env.NODE_ENV === 'development'}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 rounded-t-2xl"
                  />
                ) : null}

                {project.category && (
                  <span className="absolute top-4 left-4 text-xs uppercase tracking-widest bg-white/90 text-gray-700 px-3 pt-[5px] pb-[3px] rounded-lg">
                    {project.category}
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  {project.year && (
                    <span className="text-xs text-gray-400 font-mono">{project.year}</span>
                  )}
                  {project.status && (
                    <span className={`text-xs uppercase tracking-widest px-2 pt-[5px] pb-[3px] rounded-md ${
                      project.status === 'completed'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {statusLabel(project.status, locale)}
                    </span>
                  )}
                </div>
                <h2 className="font-kirovi text-xl text-gray-900 group-hover:text-[#1a2e2a] transition-colors leading-snug mb-1">
                  {project.title}
                </h2>
                {project.location && (
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    {project.location}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-gray-400 text-sm uppercase tracking-widest">
              {locale === 'ka' ? 'პროექტები ვერ მოიძებნა' : 'No projects found'}
            </p>
          </div>
        )}
      </section>
    </main>
  )
}