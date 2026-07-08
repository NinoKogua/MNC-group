import type { Metadata } from 'next'
import '@/app/(frontend)/globals.css'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Pines',
  description: 'ფიჭვების პროექტი მაღალმთიანი ტიპის ეკომეგობრული სივრცეების შექმნას ისახავს მიზნად.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
}

const locales = ['ka', 'en'] as const

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: 'ka' | 'en' }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!locales.includes(locale)) return notFound()

  return (
    <html lang={locale}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}
