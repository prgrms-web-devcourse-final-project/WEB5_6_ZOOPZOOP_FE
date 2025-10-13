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
  cookieStore.delete(ACCESS_TOKEN)
  cookieStore.delete(REFRESH_TOKEN)
  cookieStore.delete(SESSION_ID)
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
  if (!token) return { status: 401, data: null, msg: '토큰 없음, 인증 필요' }
  const response = await handler(token)
  // 엑세스 토큰이 유효하다면 바로 요청 값을 리턴
  if (response.status !== 401) {
    // eslint-disable-next-line no-console
    console.log('404 토큰 다시 해야하는거 ')
    return response
  }

  return response
}

// const refreshAccessTokenOnce = async () => {
//   const refreshUrl = `${process.env.API_URL}/api/v1/auth/refresh`
//   const sessionId = await getSessionId()

//   const response = fetch(refreshUrl, { method: 'POST', credentials: 'include' })

//   if(!response.ok) {
//     reutnr {

//     }
//   }
// }
