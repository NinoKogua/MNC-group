import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MNC Group',
    short_name: 'MNC Group',
    description: 'ფიჭვების პროექტი მაღალმთიანი ტიპის ეკომეგობრული სივრცეების შექმნას ისახავს მიზნად.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#006341',
    icons: [
      {
        src: '/Logo.png',
        sizes: '1080x1080',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
