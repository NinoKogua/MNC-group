import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getBaseUrl } from '@/utilities/getBaseUrl'
import type { Project, Post, Apartment } from '@/payload-types'

const locales = ['ka', 'en'] as const

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: 'projects', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'restaurant', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: 'about-us', priority: 0.6, changeFrequency: 'monthly' },
  { path: 'contact-us', priority: 0.6, changeFrequency: 'monthly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl()
  const payload = await getPayload({ config })

  const entries: MetadataRoute.Sitemap = []

  for (const { path, priority, changeFrequency } of staticRoutes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${path ? `/${path}` : ''}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      })
    }
  }

  const [{ docs: projects }, { docs: posts }, { docs: apartments }] = await Promise.all([
    payload.find({
      collection: 'projects',
      depth: 0,
      limit: 1000,
      fallbackLocale: false,
    }),
    payload.find({
      collection: 'posts',
      depth: 0,
      limit: 1000,
      where: { status: { equals: 'published' } },
      fallbackLocale: false,
    }),
    payload.find({
      collection: 'apartments',
      depth: 1,
      limit: 1000,
      fallbackLocale: false,
    }),
  ])

  for (const locale of locales) {
    for (const project of projects as Project[]) {
      if (!project.slug) continue
      entries.push({
        url: `${baseUrl}/${locale}/projects/${project.slug}`,
        lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }

    for (const post of posts as Post[]) {
      if (!post.slug) continue
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }

    for (const apartment of apartments as Apartment[]) {
      const project = apartment.project
      if (!project || typeof project !== 'object' || !project.slug) continue
      entries.push({
        url: `${baseUrl}/${locale}/projects/${project.slug}/apartments/${apartment.id}`,
        lastModified: apartment.updatedAt ? new Date(apartment.updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      })
    }
  }

  return entries
}
