import React, { ComponentType } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import FeatureCard from '../../../components/common/FeaturedCard'
import CtaBanner from '../../../components/common/CtaBanner'
import HomeIcon from '@/app/assets/icons/Home'
import ShieldIcon from '@/app/assets/icons/Shield'
import GraduationCapIcon from '@/app/assets/icons/GraduationCap'
import MessageIcon from '@/app/assets/icons/Message'

type IconType = ComponentType<{ size?: number; className?: string }>

const iconMap: Record<string, IconType> = {
  home: HomeIcon,
  shield: ShieldIcon,
  cube: GraduationCapIcon,
  stars: MessageIcon,
}

export default async function WhyUsSection({ locale }: { locale: string }) {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'why-us',
    locale: locale as 'en' | 'ka',
    limit: 1,
    depth: 1,
  })

  const data = docs?.[0]

  const sectionTitle = data?.sectionTitle ?? 'რატომ ფიჭვები?'
  const sectionSubtitle = data?.sectionSubtitle ?? 'უნიკალური უპირატესობა თქვენი კომფორტისთვის'
  const features = (data?.features ?? []) as { icon: string; title: string; description: string }[]
  const ctaBadges = (data?.ctaBadges ?? []).filter(
    (badge): badge is { text: string } => typeof badge?.text === 'string',
  )

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
          title={data?.ctaTitle ?? undefined}
          description={data?.ctaDescription ?? undefined}
          badges={ctaBadges.length ? ctaBadges : undefined}
        />
      </div>
    </section>
  )
}
