import { NextResponse } from 'next/server'
import { google } from 'googleapis'

function getCalendarClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })

  return google.calendar({
    version: 'v3',
    auth,
  })
}

export async function GET() {
  try {
    const calendar = getCalendarClient()

    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 50,
    })

    const reservations =
      response.data.items?.map((event) => ({
        id: event.id,
        title: 'Reserved',
        start: event.start?.dateTime || event.start?.date,
        end: event.end?.dateTime || event.end?.date,
      })) || []

    return NextResponse.json(reservations)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const locale = String(formData.get('locale') || 'ka')
    const name = String(formData.get('name') || '')
    const phone = String(formData.get('phone') || '')
    const email = String(formData.get('email') || '')
    const guests = String(formData.get('guests') || '')
    const date = String(formData.get('date') || '')
    const time = String(formData.get('time') || '')
    const note = String(formData.get('note') || '')

    if (!name || !phone || !guests || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const startDate = new Date(`${date}T${time}:00+04:00`)
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000)

    const calendar = getCalendarClient()

    await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: {
        summary: `Restaurant Reservation - ${name}`,
        description: `
Name: ${name}
Phone: ${phone}
Email: ${email || '-'}
Guests: ${guests}
Note: ${note || '-'}
        `,
        start: {
          dateTime: startDate.toISOString(),
          timeZone: 'Asia/Tbilisi',
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone: 'Asia/Tbilisi',
        },
      },
    })

    return NextResponse.redirect(new URL(`/${locale}/restaurant?success=true`, req.url))
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create reservation' }, { status: 500 })
  }
}
