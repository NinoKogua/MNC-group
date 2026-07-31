import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['ka', 'en']
const defaultLocale = 'ka'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (hasLocale) return NextResponse.next()

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl, 308)
}

export const config = {
  matcher: ['/((?!_next|_static|favicon.ico|icon|admin|api|.*\\..*).*)'],
}
