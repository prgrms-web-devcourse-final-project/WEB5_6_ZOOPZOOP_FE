import {
  clearToken,
  createCookieHeader,
  getSessionId,
  withAuth
} from '@/shared/lib/api-route'
import { logoutUserServer } from '@/features/auth/api/auth.server'
import { deleteAccountServer } from '@/entities/user'

// 로그아웃
export const GET = withAuth(async token => {
  const sessionId = await getSessionId()
  const response = logoutUserServer({
    headers: createCookieHeader(token, sessionId!)
  })
  await clearToken()
  return response
})

// 계정 삭제
export const DELETE = withAuth(async token => {
  const sessionId = await getSessionId()
  const response = deleteAccountServer({
    headers: createCookieHeader(token, sessionId!)
  })
  await clearToken()
  return response
})
