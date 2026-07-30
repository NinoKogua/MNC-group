'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { ChevronDown, ChevronUp, ChevronLeft, Calendar as CalendarIcon } from 'lucide-react'
import logo from '../../../../assets/images/restaurant_imgs/rest_logo.svg'
import heroImg from '../../../../assets/images/restaurant_imgs/restaurant_page-0008.jpg'
import paperTexture from '../../../../assets/images/restaurant_imgs/Paper-Texture.jpg'

type Props = {
  locale: 'en' | 'ka'
}

const WEEKDAYS_EN = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const WEEKDAYS_KA = ['ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ', 'კვ']

function toISODate(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function getCalendarDays(viewDate: Date): (Date | null)[] {
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const leadingBlanks = (firstDay.getDay() + 6) % 7 // Monday-first offset

  const days: (Date | null)[] = Array(leadingBlanks).fill(null)
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d))
  }
  while (days.length % 7 !== 0) days.push(null)

  return days
}

export default function RestaurantBookingClient({ locale }: Props) {
  const searchParams = useSearchParams()
  const [showSuccess, setShowSuccess] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  const [isDateOpen, setIsDateOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const dateDropdownRef = useRef<HTMLDivElement>(null)

  const timeSlots = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const weekDays = locale === 'ka' ? WEEKDAYS_KA : WEEKDAYS_EN
  const calendarDays = getCalendarDays(viewDate)
  const isPrevMonthDisabled =
    viewDate.getFullYear() === today.getFullYear() && viewDate.getMonth() === today.getMonth()

  const monthLabel = viewDate.toLocaleDateString(locale === 'ka' ? 'ka-GE' : 'en-US', {
    month: 'long',
    year: 'numeric',
  })

  const formattedSelectedDate = selectedDate
    ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString(locale === 'ka' ? 'ka-GE' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  const openDatePicker = () => {
    if (selectedDate) {
      const d = new Date(`${selectedDate}T00:00:00`)
      setViewDate(new Date(d.getFullYear(), d.getMonth(), 1))
    }
    setIsDateOpen((prev) => !prev)
  }

  const isFormValid =
    name.trim() !== '' &&
    phone.trim() !== '' &&
    guests.trim() !== '' &&
    selectedDate !== '' &&
    selectedTime !== ''

  const inputClass = (value: string) =>
    `bg-transparent border-2 rounded-lg px-3 pt-[8px] pb-[4px] outline-none transition-colors text-black-primary placeholder:text-brown-primary/50 text-sm w-full ${
      value.trim() !== ''
        ? 'border-green-primary'
        : 'border-brown-primary/40 focus:border-green-primary'
    }`

  // ✅ show success banner if redirected with ?success=true, and scroll it into view
  // (a full page reload resets scroll to top, which is above this section)
  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setShowSuccess(true)
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [searchParams])

  // 🖱️ close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(e.target as Node)) {
        setIsTimeOpen(false)
      }
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(e.target as Node)) {
        setIsDateOpen(false)
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
    <section ref={sectionRef} className="w-full py-16 px-4 md:px-12 relative bg-[#f5f0e8]">
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
                <div className="w-16 h-16 rounded-full bg-green-primary flex items-center justify-center">
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
                  className="mt-2 text-sm text-green-primary underline hover:text-green-primary/70"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                  className={inputClass(email)}
                />

                {/* GUESTS + DATE + TIME */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      placeholder={locale === 'ka' ? 'სტუმრები' : 'Guests'}
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
                      className={`${inputClass(guests)} pr-10 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                    />

                    {/* ბრაუზერის სტანდარტული ისრების ნაცვლად - ჩვენი ჩევრონები */}
                    <div className="absolute inset-y-[2px] right-[2px] flex flex-col w-8 divide-y divide-brown-primary/20 overflow-hidden rounded-r-[5px]">
                      <button
                        type="button"
                        tabIndex={-1}
                        aria-label={locale === 'ka' ? 'სტუმრების მატება' : 'Increase guests'}
                        onClick={() => setGuests(String((Number(guests) || 0) + 1))}
                        className="flex flex-1 items-center justify-center text-brown-primary hover:text-white hover:bg-green-primary transition-colors"
                      >
                        <ChevronUp size={13} />
                      </button>
                      <button
                        type="button"
                        tabIndex={-1}
                        aria-label={locale === 'ka' ? 'სტუმრების კლება' : 'Decrease guests'}
                        onClick={() => setGuests(String(Math.max(1, (Number(guests) || 0) - 1)))}
                        className="flex flex-1 items-center justify-center text-brown-primary hover:text-white hover:bg-green-primary transition-colors"
                      >
                        <ChevronDown size={13} />
                      </button>
                    </div>
                  </div>

                  {/* DATE (CUSTOM CALENDAR DROPDOWN) */}
                  <div className="relative" ref={dateDropdownRef}>
                    <button
                      type="button"
                      onClick={openDatePicker}
                      className={`w-full flex items-center justify-between gap-1 border-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                        selectedDate
                          ? 'border-green-primary text-black-primary'
                          : 'border-brown-primary/40 text-brown-primary/70 hover:border-green-primary'
                      }`}
                    >
                      <span className="truncate">
                        {selectedDate ? formattedSelectedDate : locale === 'ka' ? 'თარიღი' : 'Date'}
                      </span>
                      <CalendarIcon size={16} className="ml-1 shrink-0" />
                    </button>

                    {isDateOpen && (
                      <div className="absolute z-20 mt-1 w-[calc(100vw-4rem)] max-w-72 sm:w-72 bg-[#f5f0e8] border-2 border-green-primary rounded-lg shadow-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <button
                            type="button"
                            disabled={isPrevMonthDisabled}
                            onClick={() =>
                              setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
                            }
                            className="flex items-center justify-center w-7 h-7 rounded-full text-brown-primary hover:bg-green-primary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brown-primary disabled:cursor-not-allowed transition-colors"
                          >
                            <ChevronLeft size={16} />
                          </button>

                          <span className="text-sm font-semibold text-black-primary capitalize">
                            {monthLabel}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
                            }
                            className="flex items-center justify-center w-7 h-7 rounded-full text-brown-primary hover:bg-green-primary hover:text-white transition-colors"
                          >
                            <ChevronDown size={16} className="-rotate-90" />
                          </button>
                        </div>

                        <div className="grid grid-cols-7 gap-y-1 mb-1">
                          {weekDays.map((d) => (
                            <span
                              key={d}
                              className="text-[11px] text-center text-brown-primary/70 font-semibold"
                            >
                              {d}
                            </span>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-y-1">
                          {calendarDays.map((day, i) => {
                            if (!day) return <span key={`blank-${i}`} />

                            const isPast = day < today
                            const isSelected = selectedDate === toISODate(day)
                            const isToday = isSameDay(day, today)

                            return (
                              <button
                                key={toISODate(day)}
                                type="button"
                                disabled={isPast}
                                onClick={() => {
                                  setSelectedDate(toISODate(day))
                                  setIsDateOpen(false)
                                }}
                                className={`h-8 w-8 mx-auto flex items-center justify-center rounded-full text-sm transition-colors ${
                                  isPast
                                    ? 'text-brown-primary/80 cursor-not-allowed'
                                    : isSelected
                                      ? 'bg-green-primary text-white font-semibold'
                                      : isToday
                                        ? 'border-2 border-green-primary text-green-primary font-semibold'
                                        : 'text-black-primary hover:bg-green-primary/15'
                                }`}
                              >
                                {day.getDate()}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* TIME SELECT (CUSTOM DROPDOWN) */}
                  <div className="relative" ref={timeDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsTimeOpen((prev) => !prev)}
                      className={`w-full flex items-center justify-between border-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                        selectedTime
                          ? 'border-green-primary text-black-primary'
                          : 'border-brown-primary/40 text-brown-primary/70 hover:border-green-primary'
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
                        className="absolute z-20 mt-1 w-full bg-[#f5f0e8] border-2 border-green-primary rounded-lg shadow-xl max-h-56 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-green-primary [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-green-primary/70"
                        style={{ scrollbarWidth: 'thin', scrollbarColor: '#006341 transparent' }}
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
                                  ? 'text-brown-primary/30 cursor-not-allowed line-through'
                                  : isSelected
                                    ? 'bg-green-primary text-white font-semibold'
                                    : 'text-black-primary hover:bg-green-primary/15'
                              }`}
                            >
                              <span>{t}</span>
                              {isBooked && (
                                <svg
                                  className="w-4 h-4 text-brown-primary/40"
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
                  className="bg-transparent border-2 border-brown-primary/40 focus:border-green-primary rounded-lg px-3 py-2 w-full text-sm text-black-primary placeholder:text-brown-primary/50 outline-none transition-colors"
                />

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className="w-full bg-green-primary hover:bg-green-primary/85 text-white py-2.5 rounded-xl font-semibold transition-colors disabled:bg-brown-primary/30 disabled:cursor-not-allowed"
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
