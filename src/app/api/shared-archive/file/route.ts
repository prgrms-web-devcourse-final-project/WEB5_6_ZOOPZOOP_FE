import { postCopyFileToSpaceServer } from '@/features/archive/copy-to-space/api/copyToSpace.server'
import { requireAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'

//자료 다건 불러오기 (개인 아카이브 -> 공유 아카이브)
export const POST = async (request: Request) => {
  const payload = await request.json()
  try {
    const response = await requireAuth(
      async token =>
        await postCopyFileToSpaceServer(payload, {
          token
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
          : { error: '파일 업로드 중 오류 발생' }
    })
  }
}
