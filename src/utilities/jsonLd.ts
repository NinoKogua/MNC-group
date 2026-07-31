import { getBaseUrl } from './getBaseUrl'
import type { Locale } from './seo'

type ContactDetails = {
  phone?: string | null
  email?: string | null
  address?: string | null
}

type SocialLink = {
  platform?: string | null
  url?: string | null
}

/** Sitewide Organization schema - rendered once in the root locale layout. */
export function buildOrganizationJsonLd(
  locale: Locale,
  contact: ContactDetails | undefined,
  socialLinks: SocialLink[] | undefined,
) {
  const baseUrl = getBaseUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'MNC Group',
    url: `${baseUrl}/${locale}`,
    logo: `${baseUrl}/Logo.png`,
    ...(contact?.phone || contact?.email
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            telephone: contact?.phone || undefined,
            email: contact?.email || undefined,
            areaServed: 'GE',
          },
        }
      : {}),
    ...(contact?.address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: contact.address,
            addressCountry: 'GE',
          },
        }
      : {}),
    sameAs: (socialLinks || []).map((s) => s.url).filter((url): url is string => Boolean(url)),
  }
}

/** Restaurant / LocalBusiness schema for the restaurant page. */
export function buildRestaurantJsonLd(
  locale: Locale,
  name: string,
  description: string | undefined,
  contact: ContactDetails | undefined,
) {
  const baseUrl = getBaseUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${baseUrl}/${locale}/restaurant/#restaurant`,
    name,
    description,
    url: `${baseUrl}/${locale}/restaurant`,
    image: `${baseUrl}/Logo.png`,
    telephone: contact?.phone || undefined,
    ...(contact?.address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: contact.address,
            addressCountry: 'GE',
          },
        }
      : {}),
    servesCuisine: 'Georgian',
    priceRange: '$$',
  }
}

/** RealEstateListing schema for an individual project detail page. */
export function buildRealEstateListingJsonLd(
  locale: Locale,
  project: {
    title: string
    slug?: string | null
    location?: string | null
    price?: number | null
    coverImage?: { url?: string | null } | null
  },
) {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/${locale}/projects/${project.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: project.title,
    url,
    ...(project.coverImage?.url ? { image: project.coverImage.url } : {}),
    ...(project.location
      ? {
          address: {
            '@type': 'PostalAddress',
            addressLocality: project.location,
            addressCountry: 'GE',
          },
        }
      : {}),
    ...(project.price
      ? {
          offers: {
            '@type': 'Offer',
            price: project.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url,
          },
        }
      : {}),
  }
}

/** BlogPosting schema for a blog post detail page. */
export function buildBlogPostingJsonLd(
  locale: Locale,
  post: {
    title: string
    slug?: string | null
    excerpt?: string | null
    publishedAt?: string | null
    updatedAt?: string | null
    coverImage?: { url?: string | null } | null
  },
) {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/${locale}/blog/${post.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || undefined,
    url,
    mainEntityOfPage: url,
    ...(post.coverImage?.url ? { image: post.coverImage.url } : {}),
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || post.publishedAt || undefined,
    author: { '@type': 'Organization', name: 'MNC Group' },
    publisher: {
      '@type': 'Organization',
      name: 'MNC Group',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/Logo.png` },
    },
  }
}

/** Generic BreadcrumbList schema. Items are given in order, root-first. */
export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/** RealEstateListing schema for an individual apartment/unit page, wrapping an Apartment `about` entity. */
export function buildApartmentListingJsonLd(
  locale: Locale,
  params: {
    projectSlug: string
    apartmentId: number | string
    projectTitle: string
    apartmentNumber: string
    location?: string | null
    area: number
    bedrooms?: number | null
    price?: number | null
    status?: string | null
    image?: string | null
  },
) {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/${locale}/projects/${params.projectSlug}/apartments/${params.apartmentId}`
  const name = `${params.apartmentNumber} - ${params.projectTitle}`

  const availability =
    params.status === 'sold'
      ? 'https://schema.org/SoldOut'
      : params.status === 'booked'
        ? 'https://schema.org/PreOrder'
        : 'https://schema.org/InStock'

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name,
    url,
    ...(params.image ? { image: params.image } : {}),
    ...(params.location
      ? {
          address: {
            '@type': 'PostalAddress',
            addressLocality: params.location,
            addressCountry: 'GE',
          },
        }
      : {}),
    about: {
      '@type': 'Apartment',
      name,
      floorSize: { '@type': 'QuantitativeValue', value: params.area, unitCode: 'MTK' },
      ...(params.bedrooms ? { numberOfRooms: params.bedrooms } : {}),
    },
    ...(params.price
      ? {
          offers: {
            '@type': 'Offer',
            price: params.price,
            priceCurrency: 'USD',
            availability,
            url,
          },
        }
      : {}),
  }
}

/** AboutPage schema, linked back to the sitewide Organization entity. */
export function buildAboutPageJsonLd(locale: Locale, name: string, description?: string) {
  const baseUrl = getBaseUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: `${baseUrl}/${locale}/about-us`,
    name,
    description,
    mainEntity: { '@id': `${baseUrl}/#organization` },
  }
}

/** ContactPage schema, linked back to the sitewide Organization entity. */
export function buildContactPageJsonLd(locale: Locale, name: string, description?: string) {
  const baseUrl = getBaseUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: `${baseUrl}/${locale}/contact-us`,
    name,
    description,
    mainEntity: { '@id': `${baseUrl}/#organization` },
  }
}
