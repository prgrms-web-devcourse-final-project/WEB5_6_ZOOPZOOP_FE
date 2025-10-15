import { PATH } from '@/shared/constants'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const isDevelopment = process.env.NODE_ENV === 'development'

  const response = NextResponse.redirect(new URL(PATH.ARCHIVE.ROOT, url))

  if (isDevelopment) {
    const accessToken = url.searchParams.get('accessToken')
    const sessionId = url.searchParams.get('sessionId')

    // accessToken이 있으면 쿠키에 저장
    if (accessToken) {
      response.cookies.set('accessToken', accessToken, {
        httpOnly: true,
        secure: false, // 개발 환경에서는 HTTP 허용
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 // 1시간
      })
    }

    // sessionId가 있으면 쿠키에 저장
    if (sessionId) {
      response.cookies.set('sessionId', sessionId, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30 // 30일
      })
    }
  }

  return response
}
