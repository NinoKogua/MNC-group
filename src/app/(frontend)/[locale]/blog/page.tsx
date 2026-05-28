import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import cover from '@/app/assets/images/for_news.jpg'

// ვამატებთ ხატულებს List და Grid ხედვისთვის
const GridIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
)

const ListIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
)

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params
  const resolvedSearchParams = await searchParams

  const isAscending = resolvedSearchParams?.sort === 'asc'
  const sortQuery = isAscending ? 'publishedAt' : '-publishedAt'

  // ვიღებთ view პარამეტრს URL-დან, დეფოლტად იყოს list
  const currentView = resolvedSearchParams?.view === 'grid' ? 'grid' : 'list'

  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    locale: locale as 'en' | 'ka',
    where: {
      status: { equals: 'published' },
    },
    sort: sortQuery,
  })

  const { docs: blogPageDocs } = await payload.find({
    collection: 'blog-page',
    locale: locale as 'en' | 'ka',
    fallbackLocale: false,
    limit: 1,
  })

  const blogPage = blogPageDocs[0]
  // დამხმარე ფუნქცია, რომელიც ინარჩუნებს სხვა პარამეტრებს URL-ში
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams()
    if (resolvedSearchParams?.sort) params.set('sort', resolvedSearchParams.sort as string)
    if (resolvedSearchParams?.view) params.set('view', resolvedSearchParams.view as string)
    params.set(name, value)
    return `?${params.toString()}`
  }

  return (
    <main className="w-full min-h-screen bg-[#FFFFFF]">
      <section className="relative w-full h-[40vh] min-h-[350px] max-h-[500px] flex flex-col justify-end overflow-hidden mb-16">
        <Image src={cover} alt="Construction News Header" fill priority className="object-cover" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/50 to-[#000000]/30"></div>

        {/* არქიტექტურული ბადე (თხელი თეთრი/ღია ხაზები) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="max-w-[1408px] mx-auto h-full px-4 sm:px-6 lg:px-8">
            <div className="w-full h-full border-x border-[#FFFFFF]/15 flex">
              <div className="w-1/3 h-full border-r border-[#FFFFFF]/10 hidden md:block"></div>
              <div className="w-1/3 h-full border-r border-[#FFFFFF]/10 hidden md:block"></div>
            </div>
          </div>
          <div className="absolute bottom-[35%] w-full border-b border-[#FFFFFF]/15"></div>
        </div>

        <span className="text-[#D1C09B] text-sm md:text-base font-semibold tracking-widest uppercase block">
          {blogPage?.heroBadge}
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#FFFFFF] tracking-tight">
          {blogPage?.heroTitle}
        </h1>
      </section>

      <section className="max-w-[1408px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* სორტირებისა და ხედვის კონტროლერი */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 pb-4 border-b border-[#D1C09B]/40">
          <div className="mb-4 sm:mb-0">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              {posts.length} {locale === 'ka' ? 'სტატია' : 'Articles'}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Sort Switcher */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#000000] hidden sm:block">
                {locale === 'ka' ? 'სორტირება:' : 'Sort by:'}
              </span>
              <div className="flex bg-[#F5F5F5] p-1 rounded-xl">
                <Link
                  href={`/${locale}/blog${createQueryString('sort', 'desc')}`}
                  scroll={false}
                  className={`px-4 pt-[8px] pb-[4px] text-sm font-medium rounded-xl transition-all duration-300 ${
                    !isAscending
                      ? 'bg-[#006341] text-[#FFFFFF] shadow-sm'
                      : 'text-gray-600 hover:text-[#000000]'
                  }`}
                >
                  {locale === 'ka' ? 'უახლესი' : 'Newest'}
                </Link>
                <Link
                  href={`/${locale}/blog${createQueryString('sort', 'asc')}`}
                  scroll={false}
                  className={`px-4 pt-[8px] pb-[4px] text-sm font-medium rounded-xl transition-all duration-300 ${
                    isAscending
                      ? 'bg-[#006341] text-[#FFFFFF] shadow-sm'
                      : 'text-gray-600 hover:text-[#000000]'
                  }`}
                >
                  {locale === 'ka' ? 'უძველესი' : 'Oldest'}
                </Link>
              </div>
            </div>

            {/* View Switcher */}
            <div className="flex bg-[#F5F5F5] p-1 rounded-xl">
              <Link
                href={`/${locale}/blog${createQueryString('view', 'list')}`}
                scroll={false}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  currentView === 'list'
                    ? 'bg-[#006341] text-[#FFFFFF] shadow-sm'
                    : 'text-gray-400 hover:text-[#000000]'
                }`}
                aria-label="List View"
              >
                <ListIcon />
              </Link>
              <Link
                href={`/${locale}/blog${createQueryString('view', 'grid')}`}
                scroll={false}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  currentView === 'grid'
                    ? 'bg-[#006341] text-[#FFFFFF] shadow-sm'
                    : 'text-gray-400 hover:text-[#000000]'
                }`}
                aria-label="Grid View"
              >
                <GridIcon />
              </Link>
            </div>
          </div>
        </div>

        {/* პოსტების სია - დინამიური კლასებით List ან Grid ხედვის მიხედვით */}
        <div
          className={
            currentView === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-2'
          }
        >
          {posts.map((post) => (
            <Link
              href={`/${locale}/blog/${post.slug}`}
              key={post.id}
              className="group block h-full"
            >
              <div
                className={`
                flex transition-all duration-300 hover:bg-[#F5F5F5] h-full
                ${
                  currentView === 'grid'
                    ? 'flex-col p-4 sm:p-5 rounded-2xl md:rounded-3xl border border-[#D1C09B]/20 group-hover:border-[#006341]/30'
                    : 'flex-col md:flex-row gap-6 md:gap-10 p-4 sm:p-6 md:p-8 -mx-4 sm:-mx-6 md:-mx-8 border-b border-[#D1C09B]/20 group-hover:border-transparent rounded-2xl md:rounded-3xl'
                }
              `}
              >
                {post.coverImage && typeof post.coverImage === 'object' && (
                  <div
                    className={`
                    relative overflow-hidden bg-[#D1C09B]/10 shrink-0 rounded-xl md:rounded-2xl
                    ${
                      currentView === 'grid'
                        ? 'w-full aspect-[4/3] mb-5'
                        : 'w-full md:w-[45%] lg:w-[40%] aspect-[16/9]'
                    }
                  `}
                  >
                    <Image
                      src={post.coverImage.url!}
                      alt={post.coverImage.alt || post.title}
                      fill
                      sizes={
                        currentView === 'grid'
                          ? '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                          : '(max-width: 768px) 100vw, 50vw'
                      }
                      unoptimized={process.env.NODE_ENV === 'development'}
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                )}

                <div
                  className={`flex flex-col flex-grow ${currentView === 'grid' ? '' : 'justify-center w-full md:w-[55%] lg:w-[60%] py-2'}`}
                >
                  <h2
                    className={`font-kirovi font-medium text-[#000000] leading-snug mb-3 group-hover:text-[#006341] transition-colors duration-300 ${currentView === 'grid' ? 'text-xl' : 'text-2xl md:text-3xl'}`}
                  >
                    {post.title}
                  </h2>

                  {post.publishedAt && (
                    <time className="text-sm text-[#6B4F2A] mb-4 block">
                      {new Date(post.publishedAt).toLocaleDateString(
                        locale === 'ka' ? 'ka-GE' : 'en-GB',
                        { day: 'numeric', month: 'long', year: 'numeric' },
                      )}
                    </time>
                  )}

                  {post.excerpt && (
                    <p
                      className={`text-gray-600 text-base leading-relaxed mb-6 ${currentView === 'grid' ? 'line-clamp-2' : 'line-clamp-2 md:line-clamp-3'}`}
                    >
                      {post.excerpt}
                    </p>
                  )}

                  <div className="mt-auto">
                    <span className="inline-flex items-center justify-center px-6 pt-[12px] pb-[8px] text-sm font-medium bg-[#E8E8E8] group-hover:bg-[#006341] text-[#000000] group-hover:text-[#FFFFFF] rounded-xl transition-all duration-300">
                      {locale === 'ka' ? 'სრულად ნახვა' : 'Read Article'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="py-20 text-center mt-8">
            <p className="text-[#6B4F2A] text-lg font-medium">
              {locale === 'ka' ? 'სიახლეები ჯერ არ დამატებულა' : 'No news articles found'}
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
