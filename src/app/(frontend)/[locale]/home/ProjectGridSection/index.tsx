import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ProjectFeatureCard from '../../../components/common/ProjectFeaturedCard'

interface PayloadImage {
  url: string
  alt?: string
}

interface FeaturedProject {
  id: string
  title: string
  description?: string
  image: PayloadImage | string
  isLarge: boolean
  tags?: string
  order?: number
}

async function getFeaturedProjects(): Promise<FeaturedProject[]> {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'projects-featured',
    sort: 'order',
    limit: 10,
    depth: 1,
  })

  return docs as unknown as FeaturedProject[]
}

function resolveImageUrl(image: PayloadImage | string): string {
  if (typeof image === 'string') return image
  return image?.url ?? ''
}

export default async function ProjectsGridSection() {
  const projects = await getFeaturedProjects()

  const largeProject = projects.find((p) => p.isLarge)
  const smallProjects = projects.filter((p) => !p.isLarge).slice(0, 2)

  if (!largeProject && smallProjects.length === 0) return null

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 sm:auto-rows-fr">
          {largeProject && (
            <ProjectFeatureCard
              image={resolveImageUrl(largeProject.image)}
              alt={typeof largeProject.image === 'object' ? (largeProject.image?.alt ?? '') : ''}
              isLarge={largeProject.isLarge}
            />
          )}

          {smallProjects.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {smallProjects.map((project) => (
                <ProjectFeatureCard
                  key={project.id}
                  image={resolveImageUrl(project.image)}
                  alt={typeof project.image === 'object' ? (project.image?.alt ?? '') : ''}
                  isLarge={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
