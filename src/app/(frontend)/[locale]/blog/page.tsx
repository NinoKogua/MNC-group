import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import cover from '@/app/assets/images/for_news.jpg'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogPage({ params, searchParams }: Props) {
  // Next.js 15-ის სტანდარტით params და searchParams არის Promises
  const { locale } = await params
  const resolvedSearchParams = await searchParams

  // ვიღებთ სორტირების პარამეტრს URL-დან. თუ არ არის, default-ად იქნება '-publishedAt' (უახლესი)
  const isAscending = resolvedSearchParams?.sort === 'asc'
  const sortQuery = isAscending ? 'publishedAt' : '-publishedAt'

  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    locale: locale as 'en' | 'ka',
    where: {
      status: { equals: 'published' },
    },
    sort: sortQuery, // ვაწვდით დინამიურ სორტირებას
  })

  return (
    <main className="w-full min-h-screen bg-[#FFFFFF]">
      
      {/* Hero სექცია თანამედროვე არქიტექტურული ხაზებით - შემცირებული სიმაღლით */}
      <section className="relative w-full h-[40vh] min-h-[350px] max-h-[500px] flex flex-col justify-end overflow-hidden mb-16">
        
        {/* ფონის სურათი */}
        <Image
          src={cover}
          alt="Construction News Header"
          fill
          priority
          className="object-cover"
        />
        
        {/* გრადიენტული ფილტრი - ოდნავ უფრო გამუქებული მთლიანად */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/50 to-[#000000]/30"></div>

        {/* არქიტექტურული ბადე (თხელი თეთრი/ღია ხაზები) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="max-w-[1408px] mx-auto h-full px-4 sm:px-6 lg:px-8">
            <div className="w-full h-full border-x border-[#FFFFFF]/15 flex">
              {/* შიდა დამხმარე ვერტიკალური ხაზები */}
              <div className="w-1/3 h-full border-r border-[#FFFFFF]/10 hidden md:block"></div>
              <div className="w-1/3 h-full border-r border-[#FFFFFF]/10 hidden md:block"></div>
            </div>
          </div>
          {/* ჰორიზონტალური დამხმარე ხაზი ტექსტის თავზე */}
          <div className="absolute bottom-[35%] w-full border-b border-[#FFFFFF]/15"></div>
        </div>

        {/* კონტენტი - მარცხნივ გასწორებული */}
        <div className="relative z-10 w-full max-w-[1408px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[#D1C09B] text-sm md:text-base font-semibold tracking-widest uppercase block">
                {locale === 'ka' ? 'აღმოაჩინე სიახლეები' : 'Discover the latest'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#FFFFFF] tracking-tight">
              {locale === 'ka' ? 'სიახლეები & ბლოგი' : 'News & Blog'}
            </h1>
          </div>
        </div>
      </section>

      <section className="max-w-[1408px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* სორტირების კონტროლერი */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 pb-4 border-b border-[#D1C09B]/40">
          <div className="mb-4 sm:mb-0">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              {posts.length} {locale === 'ka' ? 'სტატია' : 'Articles'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[#000000]">
              {locale === 'ka' ? 'სორტირება:' : 'Sort by:'}
            </span>
            <div className="flex bg-[#F5F5F5] p-1 rounded-xl">
              <Link
                href={`/${locale}/blog?sort=desc`}
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
                href={`/${locale}/blog?sort=asc`}
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
        </div>

        {/* პოსტების სია */}
        <div className="flex flex-col gap-2">
          {posts.map((post) => (
            <Link href={`/${locale}/blog/${post.slug}`} key={post.id} className="group block">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-4 sm:p-6 md:p-8 -mx-4 sm:-mx-6 md:-mx-8 border-b border-[#D1C09B]/20 group-hover:border-transparent transition-all duration-300 hover:bg-[#F5F5F5] rounded-2xl md:rounded-3xl">
                {post.coverImage && typeof post.coverImage === 'object' && (
                  <div className="relative w-full md:w-[45%] lg:w-[40%] aspect-[16/9] overflow-hidden bg-[#D1C09B]/10 shrink-0 rounded-xl md:rounded-2xl">
                    <Image
                      src={post.coverImage.url!}
                      alt={post.coverImage.alt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized={process.env.NODE_ENV === 'development'}
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                )}

                <div className="flex flex-col justify-center w-full md:w-[55%] lg:w-[60%] py-2">
                  <h2 className="text-2xl md:text-3xl font-kirovi font-medium text-[#000000] leading-snug mb-3 group-hover:text-[#006341] transition-colors duration-300">
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
                    <p className="text-gray-600 text-base leading-relaxed line-clamp-2 md:line-clamp-3 mb-6">
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