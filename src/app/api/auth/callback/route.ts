import { PATH } from '@/shared/constants'
import { getAccessToken } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // const accessToken = getAccessToken()
  // const url = new URL(request.url)

  // if (!accessToken) {
  //   return NextResponse.redirect(new URL(PATH.AUTH.LOGIN, url))
  // }

  // return NextResponse.redirect(new URL(PATH.NEWS.ROOT, url))

  const url = new URL(request.url)

  const accessToken = url.searchParams.get('accessToken')
  const refreshToken = url.searchParams.get('refreshToken')
  const sessionId = url.searchParams.get('sessionId')

  if (!accessToken) {
    return NextResponse.redirect(new URL(PATH.AUTH.LOGIN, url))
  }

  const response = NextResponse.redirect(new URL(PATH.NEWS.ROOT, url))

  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 // 1시간
  })

  if (refreshToken) {
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30 // 30일
    })
  }

  if (sessionId) {
    response.cookies.set('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30 // 30일
    })
  }

  return response
}
