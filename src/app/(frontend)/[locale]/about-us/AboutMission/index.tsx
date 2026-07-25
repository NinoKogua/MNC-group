import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

type VisionStat = {
  value: string
  label: string
}

type Props = {
  missionTitle?: string
  missionTitleHighlight?: string
  missionDescription?: string
  missionFeatures?: string[]
  missionImage?: string
  visionTitle?: string
  visionTitleHighlight?: string
  visionDescription?: string
  visionStats?: VisionStat[]
  visionImage?: string
}

export default function AboutMission({
  missionTitle,
  missionTitleHighlight,
  missionDescription,
  missionFeatures,
  missionImage,
  visionTitle,
  visionTitleHighlight,
  visionDescription,
  visionStats,
  visionImage,
}: Props) {
  const features = missionFeatures ?? []
  const stats = visionStats ?? []

  const hasMission = Boolean(
    missionTitle || missionTitleHighlight || missionDescription || features.length || missionImage,
  )
  const hasVision = Boolean(
    visionTitle || visionTitleHighlight || visionDescription || stats.length || visionImage,
  )

  if (!hasMission && !hasVision) return null

  return (
    <div className="w-full pb-20 px-4 md:px-8 space-y-8">
      {/* მისია */}
      {hasMission && (
        <section
          className={`max-w-7xl mx-auto grid grid-cols-1 gap-0 overflow-hidden rounded-2xl ${
            missionImage ? 'md:grid-cols-2' : ''
          }`}
        >
          {/* ტექსტი */}
          <div className="bg-green-primary p-10 md:p-14 flex flex-col justify-center space-y-7">
            {(missionTitle || missionTitleHighlight) && (
              <h2 className="font-kirovi text-4xl md:text-5xl text-white leading-tight">
                {missionTitle}{' '}
                {missionTitleHighlight && (
                  <span className="text-beige-primary">{missionTitleHighlight}</span>
                )}
              </h2>
            )}
            {missionDescription && (
              <p className="text-white/50 text-sm leading-relaxed">{missionDescription}</p>
            )}
            {features.length > 0 && (
              <ul className="space-y-3 pt-2">
                {features.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                    <CheckCircle2 size={16} className="text-beige-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ფოტო */}
          {missionImage && (
            <div className="relative h-[420px] md:h-auto">
              <Image src={missionImage} alt={missionTitle ?? ''} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          )}
        </section>
      )}

      {/* ხედვა */}
      {hasVision && (
        <section
          className={`max-w-7xl mx-auto grid grid-cols-1 gap-0 overflow-hidden rounded-2xl ${
            visionImage ? 'md:grid-cols-2' : ''
          }`}
        >
          {/* ფოტო */}
          {visionImage && (
            <div className="relative h-[420px] md:h-auto order-2 md:order-1">
              <Image src={visionImage} alt={visionTitle ?? ''} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          )}

          {/* ტექსტი */}
          <div className="bg-[#F8F6F1] p-10 md:p-14 flex flex-col justify-center space-y-7 order-1 md:order-2">
            {(visionTitle || visionTitleHighlight) && (
              <h2 className="font-kirovi text-4xl md:text-5xl text-[#1a2e2a] leading-tight">
                {visionTitle}{' '}
                {visionTitleHighlight && (
                  <span className="text-green-primary">{visionTitleHighlight}</span>
                )}
              </h2>
            )}
            {visionDescription && (
              <p className="text-gray-500 text-sm leading-relaxed">{visionDescription}</p>
            )}

            {/* სტატისტიკა */}
            {stats.length > 0 && (
              <div className="flex gap-10 pt-6 border-t border-gray-200">
                {stats.map((stat, index) => (
                  <React.Fragment key={stat.label}>
                    {index > 0 && <div className="w-px bg-gray-200" />}
                    <div>
                      <p className="font-kirovi text-4xl text-[#1a2e2a]">{stat.value}</p>
                      <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                        {stat.label}
                      </p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
