import { restoreArchiveFileServer } from '@/features/archive/restore-file/api/restoreFile.server'
import { createCookieHeader, requireAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'

// 파일 복구
export const PATCH = async (request: Request) => {
  const payload = await request.json()

  try {
    const response = await requireAuth(
      async token =>
        await restoreArchiveFileServer(payload, {
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
          : { error: '파일 이동 중 오류 발생' }
    })
  }
}
