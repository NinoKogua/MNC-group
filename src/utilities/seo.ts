import type { Metadata } from 'next'
import { getBaseUrl } from './getBaseUrl'

export type Locale = 'en' | 'ka'

type OgImages = NonNullable<NonNullable<Metadata['openGraph']>['images']>

/** Recommended OG:image size for Facebook/LinkedIn/Twitter link previews. */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const

/** Square variant, used by some clients (WhatsApp, Slack) as a fallback preview size. */
export const OG_IMAGE_SIZE_SQUARE = { width: 1200, height: 1200 } as const

/** Builds an openGraph.images array with explicit dimensions so crawlers don't have to fetch the image to size it. */
export function buildOgImages(url?: string, alt?: string): OgImages | undefined {
  if (!url) return undefined
  return [
    { url, width: OG_IMAGE_SIZE.width, height: OG_IMAGE_SIZE.height, alt },
    { url, width: OG_IMAGE_SIZE_SQUARE.width, height: OG_IMAGE_SIZE_SQUARE.height, alt },
  ]
}

/** Base keywords shared across all pages, extended per-page with more specific terms. */
export const SITE_KEYWORDS: Record<Locale, string[]> = {
  en: ['MNC Group', 'real estate Georgia', 'new buildings Georgia', 'Pines project'],
  ka: ['MNC Group', 'უძრავი ქონება საქართველოში', 'ახალაშენებული კორპუსი', 'ფიჭვების პროექტი'],
}

/** Merges page-specific keywords with the site-wide defaults, de-duplicated. */
export function buildKeywords(locale: Locale, pageKeywords: string[] = []): string[] {
  return Array.from(new Set([...pageKeywords, ...SITE_KEYWORDS[locale]]))
}

type Alternates = {
  canonical: string
  languages: Record<string, string>
}

/** Builds canonical + hreflang alternate URLs for a given locale/path pair. */
export function buildAlternates(locale: Locale, path: string = ''): Alternates {
  const baseUrl = getBaseUrl()
  const cleanPath = path.replace(/^\/+|\/+$/g, '')
  const suffix = cleanPath ? `/${cleanPath}` : ''

  return {
    canonical: `${baseUrl}/${locale}${suffix}`,
    languages: {
      en: `${baseUrl}/en${suffix}`,
      ka: `${baseUrl}/ka${suffix}`,
      'x-default': `${baseUrl}/ka${suffix}`,
    },
  }
}

type LexicalNode = {
  type?: string
  text?: string
  children?: LexicalNode[]
}

type LexicalContent = {
  root?: {
    children?: LexicalNode[]
  }
}

/** Flattens Lexical richText JSON into plain text, for use as a fallback meta description. */
export function lexicalToPlainText(content: unknown, maxLength = 160): string {
  const walk = (node: LexicalNode | undefined): string => {
    if (!node) return ''
    const own = node.type === 'text' ? (node.text ?? '') : ''
    const children = node.children?.map(walk).join(' ') ?? ''
    return [own, children].filter(Boolean).join(' ')
  }

  const root = (content as LexicalContent)?.root
  const text = root?.children?.map(walk).join(' ').replace(/\s+/g, ' ').trim() ?? ''

  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}...`
}
