'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Loader, Search } from 'lucide-react'
import AppButton from '@/app/(frontend)/components/ui/AppButton'

type Locale = 'ka' | 'en'

const translations = {
  ka: {
    heading: 'იპოვე შენთვის სასურველი ბინა',
    subheading:
      'მიუთითეთ სასურველი კვადრატულობა და საძინებლების რაოდენობა. სისტემა მოგიძებნით ბინებს ± 5 კვ.მ-ის ცდომილებით საერთო ფართზე.',
    totalAreaLabel: 'მთლიანი ფართი (მ²)',
    totalAreaPlaceholder: 'მაგ: 108',
    bedroomLabel: 'საძინებლების რაოდენობა',
    bedroomPlaceholder: 'მაგ: 2',
    searching: 'მიმდინარეობს ძებნა...',
    searchButton: 'შესაბამისი ბინების ძებნა',
    searchError: 'ძებნისას დაფიქსირდა შეცდომა',
    resultsFound: (count: number) => `ნაპოვნია შესაბამისი აპარტამენტები (${count})`,
    noResults: 'მოცემული პარამეტრებით ბინები სამწუხაროდ ვერ მოიძებნა. სცადეთ სხვა კვადრატულობა.',
    noPlanImage: 'გეგმარება არ არის',
    apartment: 'ბინა',
    available: 'თავისუფალი',
    project: 'პროექტი:',
    totalAreaCard: 'საერთო ფართი',
    sqm: 'კვ.მ',
    floor: 'სართული',
    bedrooms: 'საძინებლები',
    price: 'ფასი',
    sqmShort: 'მ²',
    details: 'ბინის დეტალები →',
  },
  en: {
    heading: 'Find your ideal apartment',
    subheading:
      'Enter your preferred total area and number of bedrooms. We\u2019ll find apartments within \u00b1 5 m\u00b2 of the total area.',
    totalAreaLabel: 'Total area (m²)',
    totalAreaPlaceholder: 'e.g. 108',
    bedroomLabel: 'Number of bedrooms',
    bedroomPlaceholder: 'e.g. 2',
    searching: 'Searching...',
    searchButton: 'Search matching apartments',
    searchError: 'Something went wrong while searching',
    resultsFound: (count: number) => `Found ${count} matching apartments`,
    noResults: 'No apartments matched these parameters. Try a different area.',
    noPlanImage: 'No floor plan available',
    apartment: 'Apartment',
    available: 'Available',
    project: 'Project:',
    totalAreaCard: 'Total area',
    sqm: 'm²',
    floor: 'Floor',
    bedrooms: 'Bedrooms',
    price: 'Price',
    sqmShort: 'm²',
    details: 'View details →',
  },
} as const

export default function ApartmentFinder() {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const locale: Locale = segments[1] === 'en' ? 'en' : 'ka'
  const t = translations[locale]

  const [totalArea, setTotalArea] = useState<string>('')
  const [bedroomCount, setBedroomCount] = useState<string>('')

  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [results, setResults] = useState<any[] | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    try {
      const res = await fetch(
        `/api/search-apartments?totalArea=${totalArea}&bedroom=${bedroomCount}`,
      )
      if (!res.ok) throw new Error()

      const data = await res.json()
      setResults(data)
    } catch (error) {
      alert(t.searchError)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="p-8 md:p-10 bg-white shadow-sm border border-gray-100 rounded-xl mb-12"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 font-kirovi">
          {t.heading}
        </h2>
        <p className="text-gray-500 mb-8 font-medium text-sm">{t.subheading}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* მთლიანი ფართობის ინფუთი */}
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">
              {t.totalAreaLabel}
            </label>
            <input
              type="number"
              placeholder={t.totalAreaPlaceholder}
              value={totalArea}
              onChange={(e) => setTotalArea(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#1A7550] focus:bg-white transition-all"
            />
          </div>

          {/* საძინებლების რაოდენობის ინფუთი */}
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">
              {t.bedroomLabel}
            </label>
            <input
              type="number"
              min={0}
              step={1}
              placeholder={t.bedroomPlaceholder}
              value={bedroomCount}
              onChange={(e) => setBedroomCount(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#1A7550] focus:bg-white transition-all"
            />
          </div>
        </div>

        <AppButton
          type="submit"
          variant="primary"
          className="w-full flex items-center justify-center gap-2"
          disabled={isSearching}
        >
          {isSearching ? (
            <>
              <Loader size={20} className="animate-spin" />
              {t.searching}
            </>
          ) : (
            <>
              <Search size={20} />
              {t.searchButton}
            </>
          )}
        </AppButton>
      </form>

      {/* ძებნის შედეგები */}
      {results !== null && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="font-kirovi text-xl text-gray-800 mb-6">
            {t.resultsFound(results.length)}
          </h3>

          {results.length === 0 ? (
            <p className="text-gray-500 bg-gray-50 p-12 text-center rounded-lg border border-dashed">
              {t.noResults}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((apt) => (
                <div
                  key={apt.id}
                  className="group border border-gray-100 rounded-lg overflow-hidden bg-gray-50/50 flex flex-col hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] w-full bg-white border-b border-gray-100 p-4">
                    {apt.planImage && typeof apt.planImage === 'object' ? (
                      <Image
                        src={apt.planImage.url}
                        alt={apt.apartmentNumber}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs uppercase tracking-widest">
                        {t.noPlanImage}
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-kirovi text-xl text-gray-900">
                        {t.apartment} {apt.apartmentNumber}
                      </h3>
                      <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded bg-green-100 text-green-800">
                        {t.available}
                      </span>
                    </div>

                    {apt.project && typeof apt.project === 'object' && (
                      <p className="text-xs text-gray-400 mb-4 uppercase tracking-wider">
                        {t.project}{' '}
                        <span className="text-gray-700 font-medium">{apt.project.title}</span>
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-gray-600 border-t border-b border-gray-100 py-4 mb-4">
                      <div>
                        <span className="text-xs text-gray-400 block mb-0.5">
                          {t.totalAreaCard}
                        </span>
                        <strong className="text-gray-900">
                          {apt.area} {t.sqm}
                        </strong>
                      </div>
                      {apt.floor && (
                        <div>
                          <span className="text-xs text-gray-400 block mb-0.5">{t.floor}</span>
                          <strong className="text-gray-900">{apt.floor}</strong>
                        </div>
                      )}
                      {apt.bedrooms && (
                        <div>
                          <span className="text-xs text-gray-400 block mb-0.5">{t.bedrooms}</span>
                          <strong className="text-gray-900">{apt.bedrooms}</strong>
                        </div>
                      )}
                      {apt.price && (
                        <div>
                          <span className="text-xs text-gray-400 block mb-0.5">{t.price}</span>
                          <strong className="text-[#1a2e2a]">${apt.price.toLocaleString()}</strong>
                        </div>
                      )}
                    </div>

                    {apt.roomsDetails && apt.roomsDetails.length > 0 && (
                      <div className="bg-white border border-gray-100 rounded p-3 mb-4">
                        <div className="flex flex-col gap-1.5 text-xs">
                          {apt.roomsDetails.map((room: any, rIdx: number) => (
                            <div
                              key={rIdx}
                              className="flex justify-between border-b border-gray-50 pb-1 last:border-0 last:pb-0 text-gray-600"
                            >
                              <span>{room.roomName}</span>
                              <span className="font-medium text-gray-900">
                                {room.roomArea} {t.sqmShort}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Link
                      href={`/projects/${apt.project?.slug || ''}/apartments/${apt.id}`}
                      className="mt-auto block text-center text-xs uppercase tracking-widest font-bold text-gray-500 bg-white border border-gray-200 py-3 rounded hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all"
                    >
                      {t.details}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
