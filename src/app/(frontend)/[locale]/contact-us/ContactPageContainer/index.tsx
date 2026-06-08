import React from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'
import ContactForm from '../ContactForm'
import ContactInfoCard from '../../../components/common/ContactInfoCard'
import { getPayload } from 'payload'
import config from '@payload-config'

type Props = {
  locale: 'en' | 'ka'
}

export default async function ContactSection({ locale }: Props) {
  const payload = await getPayload({ config })

  const currentLocale = locale === 'ka' ? 'ka' : 'en'

  const contactInfo = await payload.find({
    collection: 'contact-info',
    locale: currentLocale,
    fallbackLocale: false,
    limit: 1,
  })

  const info = contactInfo.docs[0]

  if (!info) return null

  return (
    <section className="bg-white pb-20 mt-20">
      <div className="max-w-5xl mx-auto px-4 -mt-16 relative z-20 flex flex-col gap-8">

        {/* ფორმა */}
        <div className="bg-white mt-10 rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12">
          <ContactForm info={info} />
        </div>

        {/* რუკა */}
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="bg-green-primary px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <MapPin size={18} className="text-beige-primary" />
              <span className="text-sm uppercase tracking-widest font-semibold">
                {locale === 'ka' ? 'მისამართი' : 'Address'}
              </span>
            </div>
            {info.address && (
              <span className="text-sm text-white">
                {info.address}
              </span>
            )}
          </div>

          {info.mapEmbed && (
            <div className="h-[450px] w-full">
              <iframe
                src={info.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location"
              />
            </div>
          )}
        </div>

      </div>
    </section>
  )
}