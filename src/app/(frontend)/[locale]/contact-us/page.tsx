import ContactHero from './ContactHero'
import ContactSection from './ContactPageContainer'

type Locale = 'en' | 'ka'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params

  const currentLocale: Locale = locale === 'ka' ? 'ka' : 'en'

  return (
    <main className="w-full bg-[#F8F6F1] min-h-screen">
      <ContactHero locale={currentLocale} />
      <ContactSection locale={currentLocale} />
    </main>
  )
}
