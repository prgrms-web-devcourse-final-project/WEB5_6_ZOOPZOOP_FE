import { PATH } from '@/shared/constants'
import { getAccessToken } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const isDevelopment = process.env.NODE_ENV === 'development'

  // 개발 환경: 쿼리 파라미터로 토큰 받아서 쿠키에 저장
  if (isDevelopment) {
    const accessToken = url.searchParams.get('accessToken')
    const refreshToken = url.searchParams.get('refreshToken')
    const sessionId = url.searchParams.get('sessionId')

    // accessToken이 없으면 로그인 페이지로
    if (!accessToken) {
      return NextResponse.redirect(new URL(PATH.AUTH.LOGIN, url))
    }

    // 리다이렉트 응답 생성
    const response = NextResponse.redirect(new URL(PATH.NEWS.ROOT, url))

    // accessToken 쿠키 설정
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 // 1시간
    })

    // refreshToken이 있으면 쿠키 설정
    if (refreshToken) {
      response.cookies.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30 // 30일
      })
    }

    // sessionId가 있으면 쿠키 설정
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

  // 프로덕션 환경: 기존 쿠키에서 토큰 확인
  const accessToken = getAccessToken()

  // eslint-disable-next-line no-console
  console.log('accessToken', accessToken)

  // accessToken이 없으면 로그인 페이지로
  if (!accessToken) {
    return NextResponse.redirect(new URL(PATH.AUTH.LOGIN, url))
  }

  // 뉴스 페이지로 리다이렉트
  return NextResponse.redirect(new URL(PATH.NEWS.ROOT, url))
}
