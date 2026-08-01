'use client'

import dynamic from 'next/dynamic'

const AboutTeam = dynamic(() => import('./AboutTeam'), {
  ssr: false,
})

type Props = {
  badge?: string
  title?: string
  members?: {
    name: string
    role?: string
    image?: string
    facebookUrl?: string
    instagramUrl?: string
    whatsappUrl?: string
  }[]
}

export default function ClientAboutTeam(props: Props) {
  return <AboutTeam {...props} />
}
