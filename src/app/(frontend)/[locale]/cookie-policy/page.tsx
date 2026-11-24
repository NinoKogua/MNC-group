import type { Metadata } from 'next'
import LegalPage from '@/app/(frontend)/components/common/LegalPage'
import { COOKIES } from '@/utilities/legalContent'
import { buildAlternates } from '@/utilities/seo'

type Props = { params: Promise<{ locale: string }> }

export const revalidate = 86400

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const l = locale === 'ka' ? 'ka' : 'en'
  return { title: COOKIES[l].title, alternates: buildAlternates(l, 'cookie-policy') }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  const doc = COOKIES[locale === 'ka' ? 'ka' : 'en']
  return <LegalPage {...doc} />
}
