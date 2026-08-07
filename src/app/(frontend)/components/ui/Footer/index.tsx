import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import Instagram from '@/app/assets/icons/Instagram'
import Facebook from '@/app/assets/icons/Facebook'
import LogoENWhite from '@/app/assets/icons/LogoENWhite'
import LogoKAWhite from '@/app/assets/icons/LogoKAWhite'

interface FooterProps {
  locale: 'ka' | 'en'
}

const locales = ['ka', 'en']

// ფუტერის ლინკები CMS-ში ინახება ლოკალის გარეშე (მაგ: "/projects"),
// ამიტომ მიმდინარე ენის პრეფიქსს აქ ვამატებთ
function localizeHref(href: string, locale: string) {
  if (!href) return href
  if (/^(https?:)?\/\//.test(href) || /^(mailto:|tel:|#)/.test(href)) return href

  const path = href.startsWith('/') ? href : `/${href}`
  const segments = path.split('/')

  if (locales.includes(segments[1])) {
    segments[1] = locale
    return segments.join('/')
  }

  return `/${locale}${path === '/' ? '' : path}`
}

export default async function Footer({ locale }: FooterProps) {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'footer',
    locale,
    limit: 1,
  })

  const footer = docs[0]

  if (!footer) return null

  return (
    <footer className="bg-green-primary py-12 md:py-16 text-white text-center md:text-left">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-10 md:mb-16">
          <div className="lg:col-span-1 flex items-center md:items-start justify-center gap-6">
            {locale === 'ka' ? <LogoKAWhite /> : <LogoENWhite />}
            {footer.brandName && (
              <h2 className="text-4xl tracking-wider font-kirovi">{footer.brandName}</h2>
            )}
          </div>

          {footer.sections?.map((section, index) => (
            <div key={index} className="lg:col-span-1 flex flex-col gap-4">
              <h3 className="text-lg font-bold uppercase mb-2 font-kirovi">{section.title}</h3>
              <ul className="space-y-2">
                {section.links?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={localizeHref(link.href, locale)}
                      scroll={true}
                      className="text-base text-gray-300 hover:text-white transition-colors font-medium font-mtavruli"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 order-2 md:order-1">
            {footer.socialLinks?.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
              >
                {social.platform === 'instagram' ? <Instagram /> : <Facebook />}
              </a>
            ))}
          </div>

          {footer.copyrightText && (
            <div className="text-center md:text-left text-sm text-gray-200 order-1 md:order-2">
              <p className="font-mtavruli">{footer.copyrightText}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-200 order-3">
            {footer.phone && <span className="font-semibold">{footer.phone}</span>}
            {footer.phone && footer.addressText && <span className="hidden sm:inline">|</span>}
            {footer.addressText && <span>{footer.addressText}</span>}
          </div>
        </div>
      </div>
    </footer>
  )
}
