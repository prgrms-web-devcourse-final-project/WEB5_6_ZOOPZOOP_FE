import { NextResponse, NextRequest } from 'next/server'
import { PATH } from './shared/constants'

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value
  const { pathname } = request.nextUrl

  const publicPaths = [PATH.AUTH.LOGIN, PATH.ROOT]
  const isPublicPath = publicPaths.some(path => path === pathname)

  if (accessToken && isPublicPath) {
    return NextResponse.redirect(new URL(PATH.NEWS.ROOT, request.url))
  }

  if (!accessToken && !isPublicPath) {
    return NextResponse.redirect(new URL(PATH.AUTH.LOGIN, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
