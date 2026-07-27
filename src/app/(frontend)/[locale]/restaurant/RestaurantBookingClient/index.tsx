'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { ChevronDown, ChevronUp } from 'lucide-react'
import logo from '../../../../assets/images/restaurant_imgs/rest_logo.svg'
import heroImg from '../../../../assets/images/restaurant_imgs/restaurant_page-0008.jpg'
import paperTexture from '../../../../assets/images/restaurant_imgs/Paper-Texture.jpg'

type Props = {
  locale: 'en' | 'ka'
}

export default function RestaurantBookingClient({ locale }: Props) {
  const searchParams = useSearchParams()
  const [showSuccess, setShowSuccess] = useState(false)

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [guests, setGuests] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [bookedSlots, setBookedSlots] = useState<string[]>([])

  const [isTimeOpen, setIsTimeOpen] = useState(false)
  const timeDropdownRef = useRef<HTMLDivElement>(null)

  const timeSlots = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

  const isFormValid =
    name.trim() !== '' &&
    phone.trim() !== '' &&
    guests.trim() !== '' &&
    selectedDate !== '' &&
    selectedTime !== ''

  const inputClass = (value: string) =>
    `bg-transparent border rounded-lg px-3 pt-[8px] pb-[4px] outline-none transition-colors text-gray-800 placeholder:text-gray-300 text-sm w-full ${
      value.trim() !== '' ? 'border-green-700' : 'border-gray-300 focus:border-green-800'
    }`

  // ✅ show success banner if redirected with ?success=true
  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setShowSuccess(true)
    }
  }, [searchParams])

  // 🖱️ close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(e.target as Node)) {
        setIsTimeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 📅 fetch booked slots
  useEffect(() => {
    if (!selectedDate) return

    const fetchBooked = async () => {
      try {
        const res = await fetch('/api/reservations')
        if (!res.ok) return
        const contentType = res.headers.get('content-type')
        if (!contentType?.includes('application/json')) return
        const data = await res.json()

        const filtered = data
          .filter((r: any) => r.start?.startsWith(selectedDate))
          .map((r: any) => r.start?.slice(11, 16)) // HH:mm

        setBookedSlots(filtered)
      } catch (err) {
        console.error('Failed to fetch booked slots:', err)
      }
    }

    fetchBooked()
  }, [selectedDate])

  // 🚀 submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData()
    formData.append('locale', locale)
    formData.append('name', name)
    formData.append('phone', phone)
    formData.append('email', email)
    formData.append('guests', guests)
    formData.append('date', selectedDate)
    formData.append('time', selectedTime)

    const res = await fetch('/api/reservations', {
      method: 'POST',
      body: formData,
    })

    let data: any = {}
    try {
      data = await res.json()
    } catch {
      setLoading(false)
      setError(
        locale === 'ka'
          ? 'დაფიქსირდა შეცდომა, სცადეთ თავიდან'
          : 'Something went wrong, please try again',
      )
      return
    }

    setLoading(false)

    if (!res.ok) {
      setError(
        locale === 'ka'
          ? 'ეს დრო უკვე დაჯავშნილია'
          : data.error || 'This time slot is already booked',
      )
      return
    }

    window.location.href = `/${locale}/restaurant?success=true`
  }

  return (
    <section className="w-full py-16 px-4 md:px-12 relative bg-[#f5f0e8]">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('${paperTexture.src}')`,
          backgroundSize: 'cover',
          opacity: 0.15,
        }}
      />

      <div className="relative z-10">
        {/* LOGO */}
        <div className="flex justify-center mb-8">
          <div className="border border-black px-8 py-3">
            <Image src={logo} alt="logo" className="h-14 w-auto" />
          </div>
        </div>

        {/* GRID */}
        {/* overflow-hidden-ის ნაცვლად კუთხეები ცალკეულ ბლოკებზეა, რომ დროფდაუნი არ ჩაიჭრას */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 border border-green-primary lg:h-[580px] rounded-xl">
          {/* IMAGE */}
          <div className="relative h-[280px] lg:h-full overflow-hidden rounded-t-xl lg:rounded-t-none lg:rounded-l-xl">
            <Image
              src={heroImg}
              alt="restaurant"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* RIGHT SIDE: FORM OR SUCCESS MESSAGE */}
          <div className="p-8 md:p-12 flex flex-col justify-center relative">
            <div
              className="absolute inset-0 pointer-events-none rounded-b-xl lg:rounded-b-none lg:rounded-r-xl"
              style={{
                backgroundImage: `url('${paperTexture.src}')`,
                opacity: 0.15,
              }}
            />

            {showSuccess ? (
              // ✅ SUCCESS STATE
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-700 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h2 className="text-3xl font-kirovi">
                  {locale === 'ka' ? 'ჯავშანი დადასტურდა!' : 'Booking Confirmed!'}
                </h2>

                <p className="text-gray-600 text-sm max-w-xs">
                  {locale === 'ka'
                    ? 'მადლობთ! თქვენი მაგიდის ჯავშანი წარმატებით მიღებულია. მალე დაგიკავშირდებით.'
                    : "Thank you! Your table reservation has been received. We'll be in touch shortly."}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setShowSuccess(false)
                    window.history.replaceState(null, '', `/${locale}/restaurant`)
                  }}
                  className="mt-2 text-sm text-green-700 underline hover:text-green-800"
                >
                  {locale === 'ka' ? 'ახალი ჯავშანი' : 'Make another booking'}
                </button>
              </div>
            ) : (
              // 📝 FORM STATE
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <h2 className="text-4xl font-kirovi">
                  {locale === 'ka' ? 'მაგიდის ჯავშანი' : 'Book a Table'}
                </h2>

                {/* ERROR */}
                {error && <p className="text-red-600 text-sm">{error}</p>}

                {/* NAME + PHONE */}
                <div className="grid grid-cols-2 gap-5">
                  <input
                    placeholder={locale === 'ka' ? 'სახელი' : 'Name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass(name)}
                  />
                  <input
                    placeholder={locale === 'ka' ? 'ტელეფონი' : 'Phone'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass(phone)}
                  />
                </div>

                {/* EMAIL */}
                <input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-lg px-3 py-2 w-full"
                />

                {/* GUESTS + DATE + TIME */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      placeholder="Guests"
                      value={guests}
                      onChange={(e) => {
                        const val = e.target.value
                        if (val === '' || Number(val) >= 1) {
                          setGuests(val)
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === '-' || e.key === 'e' || e.key === '+') {
                          e.preventDefault()
                        }
                      }}
                      className={`${inputClass(guests)} pr-9 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                    />

                    {/* ბრაუზერის სტანდარტული ისრების ნაცვლად — ჩვენი ჩევრონები */}
                    <div className="absolute inset-y-0.5 right-0.5 flex flex-col justify-center">
                      <button
                        type="button"
                        tabIndex={-1}
                        aria-label={locale === 'ka' ? 'სტუმრების მატება' : 'Increase guests'}
                        onClick={() => setGuests(String(Math.max(1, (Number(guests) || 0) + 1)))}
                        className="flex items-center justify-center px-1.5 text-gray-400 hover:text-green-700 transition-colors"
                      >
                        <ChevronUp size={14} />
                      </button>
                      <button
                        type="button"
                        tabIndex={-1}
                        aria-label={locale === 'ka' ? 'სტუმრების კლება' : 'Decrease guests'}
                        onClick={() => setGuests(String(Math.max(1, (Number(guests) || 1) - 1)))}
                        className="flex items-center justify-center px-1.5 text-gray-400 hover:text-green-700 transition-colors"
                      >
                        <ChevronDown size={14} />
                      </button>
                    </div>
                  </div>

                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                  />

                  {/* TIME SELECT (CUSTOM DROPDOWN) */}
                  <div className="relative" ref={timeDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsTimeOpen((prev) => !prev)}
                      className={`w-full flex items-center justify-between border rounded-lg px-3 py-2 text-sm transition-colors ${
                        selectedTime
                          ? 'border-green-700 text-gray-800'
                          : 'border-gray-300 text-gray-400 hover:border-green-800'
                      }`}
                    >
                      <span>{selectedTime || (locale === 'ka' ? 'დრო' : 'Time')}</span>
                      <ChevronDown
                        size={16}
                        className={`ml-1 shrink-0 transition-transform ${
                          isTimeOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isTimeOpen && (
                      <div
                        className="absolute z-20 mt-1 w-full bg-[#f5f0e8] border border-green-primary rounded-lg shadow-lg max-h-56 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-green-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-green-800"
                        style={{ scrollbarWidth: 'thin', scrollbarColor: '#15803d transparent' }}
                      >
                        {timeSlots.map((t) => {
                          const isBooked = bookedSlots.includes(t)
                          const isSelected = selectedTime === t
                          return (
                            <button
                              key={t}
                              type="button"
                              disabled={isBooked}
                              onClick={() => {
                                setSelectedTime(t)
                                setIsTimeOpen(false)
                              }}
                              className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center justify-between ${
                                isBooked
                                  ? 'text-gray-300 cursor-not-allowed line-through'
                                  : isSelected
                                    ? 'bg-green-700 text-white'
                                    : 'text-gray-700 hover:bg-green-100'
                              }`}
                            >
                              <span>{t}</span>
                              {isBooked && (
                                <svg
                                  className="w-4 h-4 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* NOTE */}
                <textarea
                  placeholder={locale === 'ka' ? 'კომენტარი' : 'Note'}
                  className="border rounded-lg px-3 py-2 w-full"
                />

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className="w-full bg-[#1a2e2a] text-white py-2 rounded-xl disabled:bg-gray-400"
                >
                  {loading ? '...' : locale === 'ka' ? 'დაჯავშნა' : 'Book Now'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
