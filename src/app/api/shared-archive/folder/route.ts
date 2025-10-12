import { fetchSpaceFilesByFolderServer } from '@/entities/shared-archive/api/file.server'
import { requireAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'

// 폴더 내 파일 조회
export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const spaceId = searchParams.get('spaceId')
  try {
    const response = await requireAuth(
      async token =>
        await fetchSpaceFilesByFolderServer(
          { spaceId: Number(spaceId) },
          {
            token
          }
        )
    )
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: null,
      msg:
        error instanceof Error
          ? error.message
          : { error: '스페이스 파일 조회 중 오류 발생' }
    })
  }
}
