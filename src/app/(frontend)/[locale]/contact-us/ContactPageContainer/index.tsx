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

  console.log('CURRENT LOCALE:', currentLocale)
  console.log('CONTACT INFO:', info)

  if (!info) {
    return null
  }

  return (
    <section className="bg-[#F8F6F1] pb-20 mt-20">
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="text-center mb-12 font-kirovi">
          {info.tagline && (
            <p className="text-green-primary font-bold uppercase text-[20px] tracking-normal mb-2">
              {info.tagline}
            </p>
          )}

          {info.title && (
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">{info.title}</h2>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <ContactForm info={info} />

          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-[32px] overflow-hidden shadow-xl flex-grow border border-gray-50">
              <div className="bg-[#1A1A1A] p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-green-primary" />
                  <span className="font-bold">{locale === 'ka' ? 'მისამართი' : 'Address'}</span>
                </div>

                {info.address && (
                  <span className="text-sm font-medium opacity-80 font-mtavruli">
                    {info.address}
                  </span>
                )}
              </div>

              {info.mapEmbed && (
                <div className="h-[590px] w-full">
                  <iframe
                    src={info.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 font-kirovi">
              {info.phone && (
                <ContactInfoCard
                  icon={Phone}
                  label={locale === 'ka' ? 'ტელეფონი' : 'Phone'}
                  value={info.phone}
                />
              )}

              {info.email && (
                <ContactInfoCard
                  icon={Mail}
                  label={locale === 'ka' ? 'ელ-ფოსტა' : 'Email'}
                  value={info.email}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
