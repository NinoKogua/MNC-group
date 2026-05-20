import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

type LexicalNode = {
  type: string
  text?: string
  format?: number
  tag?: string
  listType?: string
  children?: LexicalNode[]
  value?: { url?: string; alt?: string }
}

type LexicalContent = {
  root: {
    children: LexicalNode[]
  }
}

function renderNode(node: LexicalNode, i: number): React.ReactNode {
  switch (node.type) {
    case 'paragraph':
      return (
        <p key={i} className="mb-4">
          {node.children?.map((child, j) => renderNode(child, j))}
        </p>
      )
    case 'text': {
      let el: React.ReactNode = node.text
      if (node.format && node.format & 1) el = <strong key={i}>{el}</strong>
      if (node.format && node.format & 2) el = <em key={i}>{el}</em>
      if (node.format && node.format & 8) el = <u key={i}>{el}</u>
      return <span key={i}>{el}</span>
    }
    case 'heading': {
      const tags: Record<string, keyof React.JSX.IntrinsicElements> = {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
      }
      const Tag = tags[node.tag || 'h2'] || 'h2'
      return (
        <Tag key={i} className="font-bold mt-6 mb-2">
          {node.children?.map((child, j) => renderNode(child, j))}
        </Tag>
      )
    }
    case 'list': {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <ListTag
          key={i}
          className={`mb-4 pl-6 ${node.listType === 'number' ? 'list-decimal' : 'list-disc'}`}
        >
          {node.children?.map((child, j) => renderNode(child, j))}
        </ListTag>
      )
    }
    case 'listitem':
      return (
        <li key={i} className="mb-1">
          {node.children?.map((child, j) => renderNode(child, j))}
        </li>
      )
    case 'upload':
      if (!node.value?.url) return null
      return (
        <div key={i} className="relative w-full h-72 my-6 rounded-xl overflow-hidden">
          <Image src={node.value.url} alt={node.value.alt || ''} fill className="object-cover" />
        </div>
      )
    default:
      return null
  }
}

function RichTextRenderer({ content }: { content: LexicalContent }) {
  if (!content?.root?.children) return null
  return (
    <div className="prose prose-lg max-w-none">
      {content.root.children.map((node, i) => renderNode(node, i))}
    </div>
  )
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

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <Link
        href={`/${locale}/blog`}
        className="text-sm text-gray-400 hover:text-green-600 mb-8 inline-block"
      >
        ← {locale === 'ka' ? 'უკან' : 'Back'}
      </Link>

      {post.coverImage && typeof post.coverImage === 'object' && (
        <div className="relative w-full h-72 mb-10 rounded-2xl overflow-hidden">
          <Image
            src={post.coverImage.url!}
            alt={post.coverImage.alt || post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      {post.publishedAt && (
        <p className="text-sm text-gray-400 mb-10">
          {new Date(post.publishedAt).toLocaleDateString(locale === 'ka' ? 'ka-GE' : 'en-US')}
        </p>
      )}

      {post.excerpt && (
        <p className="text-lg text-gray-600 mb-8 border-l-4 border-green-500 pl-4">
          {post.excerpt}
        </p>
      )}

      {post.content && <RichTextRenderer content={post.content as unknown as LexicalContent} />}
    </main>
  )
}
