'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Home, ArrowRight } from 'lucide-react'

export default function NotFound() {
  const params = useParams<{ locale?: string }>()
  const locale = params?.locale === 'en' ? 'en' : 'ka'

  const title = locale === 'ka' ? 'გვერდი ვერ მოიძებნა' : 'Page not found'
  const description =
    locale === 'ka'
      ? 'სამწუხაროდ, ამ მისამართზე გვერდი აღარ არსებობს ან გადატანილია.'
      : "The page you're looking for doesn't exist or has been moved."
  const homeLabel = locale === 'ka' ? 'მთავარ გვერდზე დაბრუნება' : 'Back to homepage'
  const projectsLabel = locale === 'ka' ? 'პროექტების ნახვა' : 'View projects'

  return (
    <div className="w-full bg-[#F8F6F1] min-h-[70vh] flex items-center">
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <span className="font-kirovi text-8xl md:text-9xl text-green-primary leading-none">
          404
        </span>

        <h1 className="font-kirovi text-3xl md:text-4xl text-[#1a2e2a] mt-6 mb-4">{title}</h1>

        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 bg-green-primary hover:bg-green-primary/80 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-green-900/10"
          >
            <Home size={18} />
            {homeLabel}
          </Link>

          <Link
            href={`/${locale}/projects`}
            className="group flex items-center gap-2 border-2 border-green-primary text-green-primary font-bold px-8 py-3 rounded-xl hover:bg-green-primary hover:text-white transition-all"
          >
            {projectsLabel}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
