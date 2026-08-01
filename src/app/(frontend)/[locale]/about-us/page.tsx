import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import AboutHero from './AboutHero'
import AboutTimeline from './AboutTimeline'
import AboutMission from './AboutMission'
import ClientAboutTeam from './ClientAboutTeam'
import type { AboutPage as AboutPageDoc, Media } from '@/payload-types'
import {
  buildAlternates,
  buildKeywords,
  buildOgImages,
  type Locale as SiteLocale,
} from '@/utilities/seo'
import { buildAboutPageJsonLd } from '@/utilities/jsonLd'
import JsonLd from '@/app/(frontend)/components/common/JsonLd'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const currentLocale = (locale === 'ka' ? 'ka' : 'en') as SiteLocale

  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'about-page',
    locale: currentLocale,
    limit: 1,
    depth: 1,
  })

  const data = docs[0]
  const title = data?.heroTitle || (currentLocale === 'ka' ? 'ჩვენ შესახებ' : 'About Us')
  const description =
    data?.heroDescription ||
    (currentLocale === 'ka'
      ? 'გაეცანით MNC Group-ის ისტორიას, მისიას და გუნდს.'
      : "Learn about MNC Group's history, mission, and team.")
  const image = mediaUrl(data?.heroImages?.[0]?.image)

  const alternates = buildAlternates(currentLocale, 'about-us')
  const keywords = buildKeywords(
    currentLocale,
    currentLocale === 'ka' ? ['ჩვენ შესახებ', 'კომპანიის ისტორია'] : ['about us', 'company history'],
  )

  return {
    title,
    description,
    keywords,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      locale: currentLocale === 'ka' ? 'ka_GE' : 'en_US',
      alternateLocale: currentLocale === 'ka' ? 'en_US' : 'ka_GE',
      images: buildOgImages(image, title),
    },
    twitter: { title, description, images: image ? [image] : undefined },
  }
}

/** ატვირთული ფოტოდან url-ის ამოღება (თუ ფოტო არაა, ვაბრუნებთ undefined და კომპონენტი თავის default-ს იყენებს) */
function mediaUrl(image: unknown): string | undefined {
  if (image && typeof image === 'object' && 'url' in image) {
    return (image as Media).url ?? undefined
  }
  return undefined
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const currentLocale = (locale === 'ka' ? 'ka' : 'en') as SiteLocale
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'about-page',
    locale: locale as 'en' | 'ka',
    limit: 1,
    depth: 1,
  })

  const data = (docs?.[0] ?? {}) as Partial<AboutPageDoc>
  const aboutPageJsonLd = buildAboutPageJsonLd(
    currentLocale,
    data.heroTitle || (currentLocale === 'ka' ? 'ჩვენ შესახებ' : 'About Us'),
    data.heroDescription ?? undefined,
  )

  return (
    <div className="w-full min-h-screen bg-[#F8F6F1]">
      <JsonLd data={aboutPageJsonLd} />
      <AboutHero
        badge={data.heroBadge ?? undefined}
        title={data.heroTitle ?? undefined}
        description={data.heroDescription ?? undefined}
        stats={data.heroStats ?? undefined}
        images={(data.heroImages ?? []).map((item) => mediaUrl(item?.image)).filter(Boolean) as string[]}
      />

      <AboutTimeline
        badge={data.timelineBadge ?? undefined}
        title={data.timelineTitle ?? undefined}
        items={data.timeline ?? undefined}
      />

      <AboutMission
        missionTitle={data.missionTitle ?? undefined}
        missionTitleHighlight={data.missionTitleHighlight ?? undefined}
        missionDescription={data.missionDescription ?? undefined}
        missionFeatures={(data.missionFeatures ?? []).map((item) => item?.text).filter(Boolean) as string[]}
        missionImage={mediaUrl(data.missionImage)}
        visionTitle={data.visionTitle ?? undefined}
        visionTitleHighlight={data.visionTitleHighlight ?? undefined}
        visionDescription={data.visionDescription ?? undefined}
        visionStats={data.visionStats ?? undefined}
        visionImage={mediaUrl(data.visionImage)}
      />

      <div id="our-team" className="scroll-mt-24">
        <ClientAboutTeam
          badge={data.teamBadge ?? undefined}
          title={data.teamTitle ?? undefined}
          members={(data.team ?? []).map((member) => ({
            name: member.name,
            role: member.role ?? '',
            image: mediaUrl(member.photo),
            facebookUrl: member.facebookUrl ?? undefined,
            instagramUrl: member.instagramUrl ?? undefined,
            whatsappUrl: member.whatsappUrl ?? undefined,
          }))}
        />
      </div>
    </div>
  )
}
