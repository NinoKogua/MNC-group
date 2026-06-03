'use client'

import { useState } from 'react'
import Image from 'next/image'
import logo from '../../../../assets/images/restaurant_imgs/rest_logo.svg'
import heroImg from '../../../../assets/images/restaurant_imgs/restaurant_page-0008.jpg'
import paperTexture from '../../../../assets/images/restaurant_imgs/Paper-Texture.jpg'

type Props = {
  locale: 'en' | 'ka'
}

export default function RestaurantBookingClient({ locale }: Props) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [guests, setGuests] = useState('')

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

  return (
    <section className="w-full py-16 px-4 md:px-12 relative" style={{ background: '#f5f0e8' }}>
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('${paperTexture.src}')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15,
        }}
      />

      <div className="relative z-10">
        {/* ლოგო */}
        <div className="flex justify-center mb-8">
          <div className="border border-black px-8 py-3">
            <Image
              src={logo}
              alt="logo"
              className="h-14 w-auto"
              style={{ filter: 'brightness(0)' }}
            />
          </div>
        </div>

        {/* grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 border border-green-primary lg:h-[580px] overflow-hidden rounded-xl">
          {/* ფოტო */}
          <div className="relative h-[280px] lg:h-full">
            <Image src={heroImg} alt="restaurant" fill className="object-cover" />
          </div>

          {/* ფორმა */}
          <div className="p-8 md:p-12 flex flex-col justify-center relative">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url('${paperTexture.src}')`,
                backgroundSize: 'cover',
                opacity: 0.15,
              }}
            />

            <div className="relative z-10">
              <h2
                className="font-kirovi text-4xl md:text-5xl mb-3 leading-tight"
                style={{ color: '#1a2e2a' }}
              >
                {locale === 'ka' ? 'მაგიდის ჯავშანი' : 'Book a Table'}
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {locale === 'ka'
                  ? 'დაჯავშნეთ მაგიდა და ჩვენ დაგიკავშირდებით დასადასტურებლად.'
                  : 'Reserve your table and we will get in touch to confirm.'}
              </p>

              <form action="/api/reservations" method="POST" className="space-y-5">
                <input type="hidden" name="locale" value={locale} />

                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-gray-400">
                      {locale === 'ka' ? 'სახელი' : 'Full Name'}
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass(name)}
                      placeholder={locale === 'ka' ? 'გიორგი მაისურაძე' : 'John Smith'}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-gray-400">
                      {locale === 'ka' ? 'ტელეფონი' : 'Phone'}
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClass(phone)}
                      placeholder="+995 555 00 00 00"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase tracking-widest text-gray-400">
                    {locale === 'ka' ? 'ელ-ფოსტა' : 'Email'}
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="bg-transparent border border-gray-300 rounded-lg px-3 pt-[8px] pb-[4px] outline-none focus:border-green-800 transition-colors text-gray-800 placeholder:text-gray-300 text-base w-full"
                    placeholder="example@mail.com"
                  />
                </div>

                <div className="grid grid-cols-3 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-gray-400">
                      {locale === 'ka' ? 'სტუმრები' : 'Guests'}
                    </label>
                    <input
                      name="guests"
                      type="number"
                      min="1"
                      required
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className={inputClass(guests)}
                      placeholder="2"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-gray-400">
                      {locale === 'ka' ? 'თარიღი' : 'Date'}
                    </label>
                    <input
                      name="date"
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className={`bg-transparent border rounded-lg px-3 pt-[8px] pb-[4px] outline-none transition-colors text-gray-800 text-base w-full ${
                        selectedDate !== ''
                          ? 'border-green-700'
                          : 'border-gray-300 focus:border-green-800'
                      }`}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-gray-400">
                      {locale === 'ka' ? 'დრო' : 'Time'}
                    </label>
                    <input
                      name="time"
                      type="time"
                      required
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className={`bg-transparent border rounded-lg px-3 pt-[8px] pb-[4px] outline-none transition-colors text-gray-800 text-base w-full ${
                        selectedTime !== ''
                          ? 'border-green-700'
                          : 'border-gray-300 focus:border-green-800'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase tracking-widest text-gray-400">
                    {locale === 'ka' ? 'კომენტარი' : 'Note'}
                  </label>
                  <textarea
                    name="note"
                    rows={2}
                    className="bg-transparent border border-gray-300 rounded-lg px-3 pt-[8px] pb-[4px] outline-none focus:border-green-800 transition-colors text-gray-800 resize-none placeholder:text-gray-300 text-base w-full"
                    placeholder={
                      locale === 'ka' ? 'სპეციალური სურვილები...' : 'Special requests...'
                    }
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full rounded-xl uppercase tracking-widest text-base font-kirovi pt-[8px] pb-[8px] flex items-center justify-center transition-colors duration-300 text-white"
                    style={{
                      background: isFormValid ? '#1a2e2a' : '#d1d5db',
                      cursor: isFormValid ? 'pointer' : 'not-allowed',
                    }}
                  >
                    {locale === 'ka' ? 'დაჯავშნა' : 'Book Now'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
