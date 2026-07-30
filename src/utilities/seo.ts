import { getBaseUrl } from './getBaseUrl'

export type Locale = 'en' | 'ka'

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
