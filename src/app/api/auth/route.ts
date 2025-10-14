import { clearToken, getSessionId, requireAuth } from '@/shared/lib/api-route'
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
    await clearToken()
    return NextResponse.json(response)
  } catch (error) {
    await clearToken()
    return NextResponse.json({
      status: 500,
      data: null,
      msg: error instanceof Error ? error.message : '요청 처리 중 오류 발생'
    })
  }
}

// 계정 삭제
export const DELETE = async () => {
  try {
    const sessionId = await getSessionId()
    const response = await requireAuth(
      async token =>
        await deleteAccountServer({
          token,
          headers: { cookie: `sessionId=${sessionId!}` }
        })
    )
    await clearToken()
    return NextResponse.json(response)
  } catch (error) {
    await clearToken()
    return NextResponse.json({
      status: 500,
      data: null,
      msg: error instanceof Error ? error.message : '요청 처리 중 오류 발생'
    })
  }
}
