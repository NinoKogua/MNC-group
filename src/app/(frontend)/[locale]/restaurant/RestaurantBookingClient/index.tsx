'use client'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from 'react'
import './calendar.css'

type Reservation = {
  id: string
  title: string
  start: string
  end?: string
}

type Props = {
  locale: 'en' | 'ka'
  reservations: Reservation[]
}

export default function RestaurantBookingClient({ locale, reservations }: Props) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const calendarEvents = reservations.map((reservation) => ({
    id: reservation.id,
    title: locale === 'ka' ? 'დაჯავშნილია' : 'Reserved',
    start: reservation.start,
    end: reservation.end,
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  }))

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="bg-white rounded-3xl p-8 shadow border border-gray-100">
        <p className="text-green-primary font-bold uppercase mb-2">
          {locale === 'ka' ? 'ჯავშნის ფორმა' : 'Reservation Form'}
        </p>

        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
          {locale === 'ka' ? 'დაჯავშნე დრო' : 'Book a Time'}
        </h2>

        <form action="/api/reservations" method="POST" className="space-y-4">
          <input type="hidden" name="locale" value={locale} />

          <input
            name="name"
            type="text"
            required
            placeholder={locale === 'ka' ? 'სახელი და გვარი' : 'Full name'}
            className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:border-green-600"
          />

          <input
            name="phone"
            type="tel"
            required
            placeholder={locale === 'ka' ? 'ტელეფონი' : 'Phone'}
            className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:border-green-600"
          />

          <input
            name="email"
            type="email"
            placeholder={locale === 'ka' ? 'ელ-ფოსტა' : 'Email'}
            className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:border-green-600"
          />

          <input
            name="guests"
            type="number"
            min="1"
            required
            placeholder={locale === 'ka' ? 'სტუმრების რაოდენობა' : 'Number of guests'}
            className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:border-green-600"
          />

          <input
            name="date"
            type="date"
            required
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:border-green-600"
          />

          <input
            name="time"
            type="time"
            required
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:border-green-600"
          />

          <textarea
            name="note"
            rows={5}
            placeholder={locale === 'ka' ? 'დამატებითი კომენტარი' : 'Additional note'}
            className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:border-green-600"
          />

          <button className="w-full bg-green-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-green-900 transition-all">
            {locale === 'ka' ? 'დაჯავშნა' : 'Book Now'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
        <p className="text-green-primary font-bold uppercase mb-2">
          {locale === 'ka' ? 'კალენდარი' : 'Calendar'}
        </p>

        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
          {locale === 'ka' ? 'აირჩიე თავისუფალი დრო' : 'Choose Available Time'}
        </h2>

        <div className="restaurant-calendar">
          <FullCalendar
            plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            selectable
            selectMirror
            allDaySlot={false}
            slotMinTime="12:00:00"
            slotMaxTime="23:00:00"
            slotDuration="01:00:00"
            height="650px"
            events={calendarEvents}
            selectOverlap={false}
            eventOverlap={false}
            select={(info: { startStr: string }) => {
              const date = info.startStr.split('T')[0]
              const time = info.startStr.split('T')[1]?.slice(0, 5)

              setSelectedDate(date)
              setSelectedTime(time || '')
            }}
            eventClick={() => {
              alert(locale === 'ka' ? 'ეს დრო უკვე დაჯავშნილია' : 'This time is already reserved')
            }}
          />
        </div>
      </div>
    </section>
  )
}
