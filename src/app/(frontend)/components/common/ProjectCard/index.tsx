'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Bed, Calendar, Layers, Bath, AreaChart, Building2, KeyRound, LucideIcon } from 'lucide-react'
import AppButton from '@/app/(frontend)/components/ui/AppButton'

interface ProjectDetailProps {
  icon?: string
  label: string
  value: string | number
  unit?: string
}

const detailIcons: Record<string, LucideIcon> = {
  bed: Bed,
  calendar: Calendar,
  layers: Layers,
  bath: Bath,
  area: AreaChart,
  building: Building2,
  key: KeyRound,
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ icon, label, value, unit }) => {
  const Icon = detailIcons[icon ?? ''] || Bed
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Icon size={20} className="text-green-primary mb-1" />
      <span className="text-xl font-bold text-gray-800">
        {value} {unit && <span className="text-sm font-medium">{unit}</span>}
      </span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  )
}

export interface ProjectCardData {
  mainImage: string
  smallImages: string[]
  title: string
  description: string
  price?: string | number
  details: ProjectDetailProps[]
  href?: string
  ctaLabel?: string
}

export default function ProjectCard({ project }: { project: ProjectCardData }) {
  const { mainImage, smallImages, title, description, details, price, href, ctaLabel } = project

  const SmallImageBlock = ({ img, index }: { img: string; index: number }) => (
    <div className="overflow-hidden rounded-xl shadow-md h-32 md:h-48 relative">
      <Image
        src={img}
        alt={`${title} ${index + 1}`}
        fill
        className="object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  )

  const CtaButton = () => {
    const button = <AppButton variant="primary">{ctaLabel ?? 'სრულად'}</AppButton>
    return href ? (
      <Link href={href} className="block w-full">
        {button}
      </Link>
    ) : (
      button
    )
  }

  const gallery = smallImages.slice(0, 4)

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl flex flex-col lg:flex-row gap-8 shadow-sm">
      {/* Mobile View */}
      <div className="md:hidden w-full">
        {mainImage && (
          <div className="relative h-[300px] overflow-hidden rounded-2xl mb-4 shadow-lg">
            <Image src={mainImage} alt={title} fill className="object-cover" />
          </div>
        )}

        {gallery.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {gallery.map((img, index) => (
              <SmallImageBlock key={index} img={img} index={index} />
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
          <h3 className="text-3xl font-extrabold text-gray-800 font-kirovi">{title}</h3>
          {price && (
            <span className="text-3xl font-bold text-green-primary font-kirovi">${price}</span>
          )}
        </div>

        {details.length > 0 && (
          <div className="grid grid-cols-3 gap-4 py-4 mb-6">
            {details.map((detail, index) => (
              <ProjectDetail key={index} {...detail} />
            ))}
          </div>
        )}

        <p className="text-gray-600 mb-4 text-base">{description}</p>
        <CtaButton />
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex lg:flex-row gap-8 w-full">
        <div className="flex flex-col gap-4 w-2/5">
          {gallery.length > 0 && (
            <div className="grid grid-cols-2 gap-4 w-full">
              {gallery.map((img, index) => (
                <SmallImageBlock key={index} img={img} index={index} />
              ))}
            </div>
          )}

          <div className="flex flex-col">
            <p className="text-gray-600 mb-4 text-base">{description}</p>
            <CtaButton />
          </div>
        </div>

        <div className="w-3/5">
          {mainImage && (
            <div className="relative h-[400px] overflow-hidden rounded-2xl mb-6 shadow-lg">
              <Image src={mainImage} alt={title} fill className="object-cover" priority />
            </div>
          )}

          <div className="flex justify-between items-start mb-4">
            <h3 className="text-3xl font-kirovi font-extrabold text-gray-800">{title}</h3>
            {price && (
              <span className="text-3xl font-kirovi font-bold text-green-primary">${price}</span>
            )}
          </div>

          {details.length > 0 && (
            <div className="grid grid-cols-5 gap-4 py-4 mb-6">
              {details.map((detail, index) => (
                <ProjectDetail key={index} {...detail} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
