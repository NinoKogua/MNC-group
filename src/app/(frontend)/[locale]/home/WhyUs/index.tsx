'use client'

import React, { ComponentType, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import FeatureCard from '../../../components/common/FeaturedCard'
import CtaBanner from '../../../components/common/CtaBanner'
import HomeIcon from '@/app/assets/icons/Home'
import ShieldIcon from '@/app/assets/icons/Shield'
import CubeIcon from '@/app/assets/icons/Cube'
import StarsIcon from '@/app/assets/icons/Stars'

type IconType = ComponentType<{ size?: number; className?: string }>

const iconMap: Record<string, IconType> = {
  home: HomeIcon,
  shield: ShieldIcon,
  cube: CubeIcon,
  stars: StarsIcon,
}

type Feature = {
  icon: string
  title: string
  description: string
}

type WhyUsData = {
  sectionTitle: string
  sectionSubtitle: string
  features: Feature[]
  ctaTitle?: string
  ctaDescription?: string
  ctaBadges?: { text: string }[]
}

export default function WhyUsSection() {
  const params = useParams()
  const locale = (params?.locale as string) ?? 'ka'
  const [data, setData] = useState<WhyUsData | null>(null)

  useEffect(() => {
    fetch(`/api/why-us?locale=${locale}&limit=1`)
      .then((r) => r.json())
      .then((res) => setData(res.docs?.[0] ?? null))
  }, [locale])

  const sectionTitle = data?.sectionTitle ?? 'რატომ ფიჭვები?'
  const sectionSubtitle = data?.sectionSubtitle ?? 'უნიკალური უპირატესობა თქვენი კომფორტისთვის'
  const features = data?.features ?? []

  return (
    <section className="bg-beige-50 py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4 font-kirovi">{sectionTitle}</h2>
          <p className="text-lg text-gray-600 font-medium">{sectionSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon]
            return (
              <FeatureCard
                key={index}
                Icon={Icon}
                title={feature.title}
                description={feature.description}
              />
            )
          })}
        </div>

        <CtaBanner
          title={data?.ctaTitle}
          description={data?.ctaDescription}
          badges={data?.ctaBadges}
        />
      </div>
    </section>
  )
}
