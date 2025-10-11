import { softDeleteSpaceFileServer } from '@/features/shared-archive/move-to-trash/api/soft-delete.server'
import { createCookieHeader, requireAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'

// 스페이스 자료 임시 삭제 -> 휴지통으로 이동
export const PATCH = async (request: Request) => {
  const payload = await request.json()

  try {
    const response = await requireAuth(
      async token =>
        await softDeleteSpaceFileServer(payload, {
          headers: createCookieHeader(token)
        })
    )

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: null,
      msg:
        error instanceof Error
          ? error.message
          : { error: '스페이스 파일 휴지통으로 이동 중 오류 발생' }
    })
  }
}
