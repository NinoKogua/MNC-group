import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params

  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    locale: locale as 'en' | 'ka',
    where: {
      status: { equals: 'published' },
    },
    sort: '-publishedAt',
  })

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-4xl font-bold mb-12">{locale === 'ka' ? 'ბლოგი' : 'Blog'}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link href={`/${locale}/blog/${post.slug}`} key={post.id}>
            <div className="group rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
              {post.coverImage && typeof post.coverImage === 'object' && (
                <div className="relative w-full h-48">
                  <Image
                    src={post.coverImage.url!}
                    alt={post.coverImage.alt || post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-green-primary transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-gray-500 text-sm line-clamp-3">{post.excerpt}</p>
                )}
                {post.publishedAt && (
                  <p className="text-xs text-gray-400 mt-4">
                    {new Date(post.publishedAt).toLocaleDateString(
                      locale === 'ka' ? 'ka-GE' : 'en-US',
                    )}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-gray-400 text-center mt-20">
          {locale === 'ka' ? 'პოსტები არ მოიძებნა' : 'No posts found'}
        </p>
      )}
    </main>
  )
}
