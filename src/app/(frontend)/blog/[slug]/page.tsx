import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
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
          {new Date(post.publishedAt).toLocaleDateString('ka-GE')}
        </p>
      )}

      {post.excerpt && (
        <p className="text-lg text-gray-600 mb-8 border-l-4 border-green-500 pl-4">
          {post.excerpt}
        </p>
      )}

      <div className="prose prose-lg max-w-none">
        {/* RichText renderer აქ დაემატება */}
        <p className="text-gray-500">კონტენტი მალე დაემატება...</p>
      </div>
    </main>
  )
}
