import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Phone, Mail, MapPin } from 'lucide-react'

type Props = {
  locale: 'en' | 'ka'
}

const ContactHero = async ({ locale }: Props) => {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'contact-info',
    locale,
    fallbackLocale: false,
    limit: 1,
  })

  const info = docs[0]

  return (
    <div className="w-full bg-[#F8F6F1]">
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-20 text-center">
        <h1 className="font-kirovi text-4xl sm:text-5xl md:text-8xl text-green-primary leading-tight mb-6">
          {info?.heroTitle || (locale === 'ka' ? 'კონტაქტი' : 'Contact')}
        </h1>

        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          {info?.heroDescription ||
            (locale === 'ka'
              ? 'გვიკავშირდით ნებისმიერ კითხვაზე - სიამოვნებით დაგეხმარებით.'
              : 'Get in touch with us - we are happy to help.')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-10">
          {info?.phone && (
            <a href={`tel:${info.phone}`} className="flex flex-col items-center gap-1 group">
              <span className="text-xs uppercase tracking-widest text-gray-400">
                {locale === 'ka' ? 'ტელეფონი' : 'Phone'}
              </span>
              <span className="flex items-center gap-2 text-sm sm:text-base text-[#1a2e2a] font-medium group-hover:text-green-primary transition-colors">
                <Phone size={15} />
                {info.phone}
              </span>
            </a>
          )}

          {info?.phone && info?.email && <div className="hidden sm:block h-8 w-px bg-gray-300" />}

          {info?.email && (
            <a href={`mailto:${info.email}`} className="flex flex-col items-center gap-1 group">
              <span className="text-xs uppercase tracking-widest text-gray-400">
                {locale === 'ka' ? 'ელ-ფოსტა' : 'Email'}
              </span>
              <span className="flex items-center gap-2 text-sm sm:text-base text-[#1a2e2a] font-medium group-hover:text-green-primary transition-colors">
                <Mail size={15} className="text-green-primary" />
                {info.email}
              </span>
            </a>
          )}

          {info?.email && info?.address && <div className="hidden sm:block h-8 w-px bg-gray-300" />}

          {info?.address && (
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs uppercase tracking-widest text-gray-400">
                {locale === 'ka' ? 'მისამართი' : 'Address'}
              </span>
              <span className="flex items-center gap-2 text-sm sm:text-base text-[#1a2e2a] font-medium">
                <MapPin size={15} className="text-green-primary" />
                {info.address}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactHero
