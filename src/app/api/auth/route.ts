import {
  clearToken,
  createCookieHeader,
  getSessionId,
  requireAuth,
  withAuth
} from '@/shared/lib/api-route'
import { logoutUserServer } from '@/features/auth/logout/api/auth.server'
import { deleteAccountServer } from '@/entities/user'
import { NextResponse } from 'next/server'

// 로그아웃
export const GET = async () => {
  try {
    const sessionId = await getSessionId()
    const response = await requireAuth(
      async token =>
        await logoutUserServer({
          token,
          headers: { cookie: `sessionId=${sessionId!}` }
        })
    )
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: null,
      msg: error instanceof Error ? error.message : '요청 처리 중 오류 발생'
    })
  } finally {
    // 토큰 삭제
    await clearToken()
  }
}

// 계정 삭제
export const DELETE = withAuth(async token => {
  const sessionId = await getSessionId()
  const response = deleteAccountServer({
    headers: createCookieHeader(token, sessionId!)
  })
  await clearToken()
  return response
})
