'use client'
import React from 'react'
import { MessageCircle } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import Image, { StaticImageData } from 'next/image'
import Facebook from '@/app/assets/icons/Facebook'
import Instagram from '@/app/assets/icons/Instagram'

import 'swiper/css'
import 'swiper/css/pagination'

interface MemberProps {
  name: string
  role?: string
  image?: string | StaticImageData
  facebookUrl?: string
  instagramUrl?: string
  whatsappUrl?: string
}

const TeamMember = ({ name, role, image, facebookUrl, instagramUrl, whatsappUrl }: MemberProps) => {
  const socials = [
    { url: facebookUrl, Icon: Facebook, label: 'Facebook' },
    { url: instagramUrl, Icon: Instagram, label: 'Instagram' },
    { url: whatsappUrl, Icon: MessageCircle, label: 'WhatsApp' },
  ].filter((social) => social.url)

  return (
    <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-50 group h-full">
      <div className="h-[300px] overflow-hidden relative bg-gray-100">
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        )}
        {socials.length > 0 && (
          <div className="absolute bottom-4 left-4 flex gap-2 z-10">
            {socials.map(({ url, Icon, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} - ${label}`}
                className="w-8 h-8 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center text-green-primary hover:bg-green-primary hover:text-white transition-colors cursor-pointer"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="p-6 bg-white">
        <h4 className="font-bold text-gray-800 uppercase tracking-tighter truncate">{name}</h4>
        <p className="text-xs text-green-700 font-bold uppercase mt-1 font-mtavruli">{role}</p>
      </div>
    </div>
  )
}

type Member = {
  name: string
  role?: string
  image?: string | StaticImageData
  facebookUrl?: string
  instagramUrl?: string
  whatsappUrl?: string
}

type Props = {
  badge?: string
  title?: string
  members?: Member[]
}

export default function AboutTeam({ badge, title, members }: Props) {
  const teamMembers = members ?? []

  if (!teamMembers.length) return null

  return (
    <section className="max-w-7xl mx-auto px-4 py-24 pt-0 bg-[#F0F2F0]/30 rounded-[64px] mb-20 font-kirovi">
      <div className="text-center mb-16 px-4">
        {badge && (
          <p className="text-green-primary font-bold uppercase text-[20px] tracking-[0.2em] mb-3">
            {badge}
          </p>
        )}
        {title && (
          <h2 className="text-3xl md:text-4xl leading-none font-extrabold text-gray-800 uppercase">
            {title}
          </h2>
        )}
      </div>

      <div className="team-swiper-container">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2, centeredSlides: false },
            1024: { slidesPerView: 4, centeredSlides: false, allowTouchMove: false },
          }}
          className="pb-24"
        >
          {teamMembers.map((m, i) => (
            <SwiperSlide key={i}>
              <TeamMember {...m} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .team-swiper-container {
          position: relative;
        }
        .team-swiper-container .swiper-pagination {
          bottom: 10px !important;
        }
        .team-swiper-container .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #075f44;
          opacity: 0.2;
          transition: all 0.3s ease;
        }
        .team-swiper-container .swiper-pagination-bullet-active {
          background: #075f44 !important;
          opacity: 1;
          width: 30px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  )
}
