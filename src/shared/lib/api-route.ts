import { cookies } from 'next/headers'
import { ACCESS_TOKEN, REFRESH_TOKEN, SESSION_ID } from '../constants'
import { AuthHandler } from '../types/api'

// 엑세스 토큰 추출
export const getAccessToken = async () => {
  return (await cookies()).get(ACCESS_TOKEN)?.value
}
// 세션 ID 추출
export const getSessionId = async () => {
  return (await cookies()).get(SESSION_ID)?.value
}
// 리프레시 토큰 추출
export const getRefreshToken = async () => {
  return (await cookies()).get(REFRESH_TOKEN)?.value
}

export const clearToken = async () => {
  const cookieStore = await cookies()
  const domain = '.zoopzoop.kro.kr'
  const path = '/'

  cookieStore.delete({
    name: ACCESS_TOKEN,
    domain,
    path
  })
  cookieStore.delete({
    name: REFRESH_TOKEN,
    domain,
    path
  })
  cookieStore.delete({
    name: SESSION_ID,
    domain,
    path
  })
}

// 쿠키가 포함된 헤더
export const createCookieHeader = (
  accessToken: string,
  sessionId?: string
) => ({
  Cookie: `accessToken=${accessToken}; ${sessionId ? 'sessionId=' + sessionId : ''} `
})

// 쿠키가 필요한 통신인 경우
export const requireAuth = async <T>(handler: AuthHandler<T>) => {
  const token = await getAccessToken()
  // 토큰이 없는 경우
  if (!token) return { status: 401, data: null, msg: '토큰 없음, 인증 필요' }
  const response = await handler(token)

  if (response.status !== 401) {
    return response
  }

  const newAccessToken = await refreshAccessTokenOnce()

  if (newAccessToken) {
    return handler(newAccessToken)
  }

  return response
}

const refreshAccessTokenOnce = async () => {
  const sessionId = await getSessionId()
  if (!sessionId) {
    await clearToken()
    return null
  }
  const refreshUrl = `${process.env.API_URL}/api/v1/auth/refresh`
  try {
    const response = await fetch(refreshUrl, {
      headers: {
        Cookie: `sessionId=${sessionId}`
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${response.status}`)
    }
    const newAccessToken = await getAccessToken()

    if (!newAccessToken) {
      // eslint-disable-next-line no-console
      console.warn('Refresh succeeded but no access token was set.')
    }

    return newAccessToken
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Token refresh error:', error)
    await clearToken()
    return null
  }
}
