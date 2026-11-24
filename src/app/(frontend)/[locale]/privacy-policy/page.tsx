import type { Metadata } from 'next'
import LegalPage from '@/app/(frontend)/components/common/LegalPage'
import { PRIVACY } from '@/utilities/legalContent'
import { buildAlternates } from '@/utilities/seo'

type Props = { params: Promise<{ locale: string }> }

export const revalidate = 86400

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const l = locale === 'ka' ? 'ka' : 'en'
  return { title: PRIVACY[l].title, alternates: buildAlternates(l, 'privacy-policy') }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  const doc = PRIVACY[locale === 'ka' ? 'ka' : 'en']
  return <LegalPage {...doc} />
}
