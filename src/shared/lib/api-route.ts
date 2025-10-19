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
  const isProduction = process.env.NODE_ENV === 'production'

  const cookieOptions = isProduction
    ? { domain: '.zoopzoop.kro.kr', path: '/' }
    : { path: '/' }

  cookieStore.delete({ name: ACCESS_TOKEN, ...cookieOptions })
  cookieStore.delete({ name: REFRESH_TOKEN, ...cookieOptions })
  cookieStore.delete({ name: SESSION_ID, ...cookieOptions })
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

  // 에러 코드 중에서도 401(인증 실패) 일 경우
  if (response.status !== 401) return response

  const newAccessToken = await refreshAccessToken()

  return newAccessToken ? handler(newAccessToken) : response
}

// 클로저를 사용하기 위한 iife 패턴
const refreshAccessToken = (() => {
  // 플래그
  let inProgress: Promise<string | null> | null = null

  return async () => {
    //  진행 중이면 대기
    // 동일한 promise 이기 때문에 중복 요청은 동일하게 기다림
    if (inProgress) return inProgress
    // 새 작업을 Promise에 저장
    // finally는 마이크로 태스트 큐에서 실행 됨
    // return 이 반환된 다음 실행
    inProgress = executeRefresh().finally(() => {
      inProgress = null
    })

    return inProgress
  }
})()

const executeRefresh = async () => {
  const sessionId = await getSessionId()
  // 세션아이디가 없는 경우
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
      // eslint-disable-next-line no-console
      console.warn(`Failed to refresh token: ${response.status}`)
      return null
    }
    const newAccessToken = await getAccessToken()

    if (!newAccessToken) {
      // eslint-disable-next-line no-console
      console.warn('Refresh succeeded but no access token was set.')
      return null
    }

    return newAccessToken
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Token refresh error:', error)
    await clearToken()
    return null
  }
}
