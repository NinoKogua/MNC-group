import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { buildAlternates, lexicalToPlainText, type Locale as SiteLocale } from '@/utilities/seo'
import { buildBlogPostingJsonLd, buildBreadcrumbJsonLd } from '@/utilities/jsonLd'
import { getBaseUrl } from '@/utilities/getBaseUrl'
import JsonLd from '@/app/(frontend)/components/common/JsonLd'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const currentLocale = (locale === 'ka' ? 'ka' : 'en') as SiteLocale

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    locale: currentLocale,
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
  })

  const post = docs[0]
  if (!post) {
    return { title: currentLocale === 'ka' ? 'სტატია ვერ მოიძებნა' : 'Article not found' }
  }

  const description = post.excerpt || lexicalToPlainText(post.content)
  const image = (post.coverImage as { url?: string } | undefined)?.url
  const alternates = buildAlternates(currentLocale, `blog/${slug}`)

  return {
    title: post.title,
    description,
    alternates,
    openGraph: {
      title: post.title,
      description,
      url: alternates.canonical,
      type: 'article',
      locale: currentLocale === 'ka' ? 'ka_GE' : 'en_US',
      publishedTime: post.publishedAt || undefined,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      title: post.title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

type LexicalNode = {
  type: string
  text?: string
  format?: number
  tag?: string
  listType?: string
  children?: LexicalNode[]
  value?: any // upload და relationship ობიექტებისთვის
  fields?: { url?: string; newTab?: boolean }
  url?: string
  relationTo?: string
}

type LexicalContent = {
  root: {
    children: LexicalNode[]
  }
}

// ედიტორიდან წამოსული კონტენტის სტილიზაცია
function renderNode(node: LexicalNode, i: number): React.ReactNode {
  switch (node.type) {
    case 'paragraph':
      return (
        <p key={i} className="text-lg text-gray-600 leading-relaxed mb-6 font-light">
          {node.children?.map((child, j) => renderNode(child, j))}
        </p>
      )
      
    case 'text': {
      let el: React.ReactNode = node.text
      if (node.format && node.format & 1)
        el = <strong key={i} className="font-bold text-[#161616]">{el}</strong>
      if (node.format && node.format & 2) 
        el = <em key={i}>{el}</em>
      if (node.format && node.format & 8)
        el = <u key={i} className="decoration-[#D1C09B] decoration-2 underline-offset-4">{el}</u>
      return <span key={i}>{el}</span>
    }

    // ლინკების დიზაინი
    case 'link':
    case 'autolink': {
      const href = node.fields?.url || node.url || '#'
      return (
        <Link
          key={i}
          href={href}
          className="text-blue-600 font-medium underline underline-offset-[6px] decoration-blue-600/30 hover:decoration-blue-600 transition-colors duration-300"
          {...(node.fields?.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {node.children?.map((child, j) => renderNode(child, j))}
        </Link>
      )
    }

    // ახალი ციტატის (Blockquote) დიზაინი
    case 'quote':
      return (
        <blockquote key={i} className="relative py-6 my-12 text-2xl md:text-3xl text-center text-gray-800 italic font-medium">
          {/* დიდი დეკორატიული ბრჭყალი */}
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-7xl text-[#D1C09B]/30 font-serif leading-none">
            &ldquo;
          </span>
          <div className="relative z-10">
            {node.children?.map((child, j) => renderNode(child, j))}
          </div>
        </blockquote>
      )

    // გამყოფი ხაზი
    case 'horizontalrule':
      return <hr key={i} className="my-12 border-t border-gray-200" />

    // დაკავშირებული პოსტის ბლოკი (როგორც ლურჯი ლინკი)
    case 'relationship':
      if (node.value && typeof node.value === 'object') {
        const relatedDoc = node.value
        return (
          <div key={i} className="my-8 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <Link 
              href={`./${relatedDoc.slug || ''}`} 
              className="text-blue-600 text-lg md:text-xl font-medium underline underline-offset-[6px] decoration-blue-600/30 hover:decoration-blue-600 transition-colors duration-300"
            >
              {relatedDoc.title || 'დაკავშირებული სტატია'}
            </Link>
          </div>
        )
      }
      return null

    // შეცვლილი ჰედერის (სათაურების) დიზაინი
    case 'heading': {
      const tags: Record<string, keyof React.JSX.IntrinsicElements> = {
        h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
      }
      const Tag = tags[node.tag || 'h2'] || 'h2'

      const headingStyles =
        Tag === 'h1'
          ? 'text-4xl md:text-5xl font-extrabold mt-14 mb-8 tracking-tight'
          : Tag === 'h2'
            ? 'text-2xl md:text-3xl font-bold mt-12 mb-6 tracking-tight border-b border-gray-200 pb-3'
            : 'text-xl md:text-2xl font-bold mt-10 mb-4 tracking-tight'

      return (
        <Tag key={i} className={`text-[#161616] ${headingStyles}`}>
          {node.children?.map((child, j) => renderNode(child, j))}
        </Tag>
      )
    }

    // ჩამონათვალის (List) დახვეწილი დიზაინი
    case 'list': {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <ListTag
          key={i}
          className={`mb-8 pl-6 space-y-3 text-lg text-gray-700 font-light list-outside ${
            node.listType === 'number' 
              ? 'list-decimal marker:text-gray-500 marker:font-medium' 
              : 'list-disc marker:text-[#006341]' // მწვანე წერტილები
          }`}
        >
          {node.children?.map((child, j) => renderNode(child, j))}
        </ListTag>
      )
    }

    case 'listitem':
      return (
        <li key={i} className="pl-2 leading-relaxed">
          {node.children?.map((child, j) => renderNode(child, j))}
        </li>
      )

    // ფოტოს ატვირთვა - Alt ტექსტის გარეშე
    case 'upload':
      if (!node.value?.url) return null
      return (
        <figure key={i} className="my-12">
          <div className="relative w-full aspect-video bg-[#F5F5F5] rounded-2xl overflow-hidden">
            <Image
              src={node.value.url}
              alt={node.value.alt || ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              unoptimized={process.env.NODE_ENV === 'development'}
            />
          </div>
        </figure>
      )

    default:
      return null
  }
}

function RichTextRenderer({ content }: { content: LexicalContent }) {
  if (!content?.root?.children) return null
  return <div className="w-full">{content.root.children.map((node, i) => renderNode(node, i))}</div>
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    locale: locale as 'en' | 'ka',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
  })

  const post = docs[0]
  if (!post) return notFound()

  const truncateWords = (str: string, limit: number) => {
    const words = str.split(' ')
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : str
  }
  const shortTitle = truncateWords(post.title, 5)

  const baseUrl = getBaseUrl()
  const blogPostingJsonLd = buildBlogPostingJsonLd(locale as SiteLocale, {
    ...post,
    coverImage:
      post.coverImage && typeof post.coverImage === 'object' ? post.coverImage : undefined,
  })
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: locale === 'ka' ? 'მთავარი' : 'Home', url: `${baseUrl}/${locale}` },
    { name: locale === 'ka' ? 'სიახლეები' : 'News', url: `${baseUrl}/${locale}/blog` },
    { name: post.title, url: `${baseUrl}/${locale}/blog/${slug}` },
  ])

  return (
    <main className="w-full min-h-screen bg-white pb-20">
      <JsonLd data={blogPostingJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {/* Breadcrumbs ნავიგაცია */}
      <div className="max-w-[1408px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="text-sm md:text-base text-gray-500 font-medium truncate">
          <Link href={`/${locale}/blog`} className="hover:text-[#006341] transition-colors">
            {locale === 'ka' ? 'სიახლეები' : 'News'}
          </Link>
          <span className="mx-3">/</span>
          <span className="text-[#000000]" title={post.title}>
            {shortTitle}
          </span>
        </div>
      </div>

      {/* Hero სექცია: ფოტო + Overlay ტექსტი */}
      {post.coverImage && typeof post.coverImage === 'object' ? (
        <div className="max-w-[1408px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden bg-[#D1C09B]/10 ">
            <Image
              src={post.coverImage.url!}
              alt={post.coverImage.alt || post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1400px"
              unoptimized={process.env.NODE_ENV === 'development'}
              className="object-cover"
            />

            {/* მუქი გრადიენტი ქვემოდან ტექსტის წასაკითხად */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/40 to-transparent"></div>

            {/* სათაური და თარიღი ფოტოზე */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 lg:p-14">
              {post.publishedAt && (
                <time className="text-sm md:text-base font-semibold tracking-widest text-[#FFFFFF]/80 uppercase mb-3 block">
                  {new Date(post.publishedAt).toLocaleDateString(
                    locale === 'ka' ? 'ka-GE' : 'en-US',
                    { day: 'numeric', month: 'long', year: 'numeric' },
                  )}
                </time>
              )}
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium text-[#FFFFFF] leading-[1.2] tracking-tight max-w-4xl">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        /* Fallback: თუ ფოტო არ დევს */
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          {post.publishedAt && (
            <time className="text-sm font-semibold tracking-widest text-green-500 uppercase mb-4 block">
              {new Date(post.publishedAt).toLocaleDateString(locale === 'ka' ? 'ka-GE' : 'en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })} 
            </time>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#000000] leading-[1.2] tracking-tight">
            {post.title}
          </h1>
        </div>
      )}

      {/* სტატიის ტექსტი (Excerpt + Content) */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-gray-600 mb-10 border-l-4 border-green-500 pl-5 leading-relaxed bg-[#F5F5F5]/50 py-3 rounded-r-lg">
            {post.excerpt}
          </p>
        )}

        {/* ედიტორის კონტენტი */}
        {post.content && <RichTextRenderer content={post.content as unknown as LexicalContent} />}
      </div>
    </main>
  )
}