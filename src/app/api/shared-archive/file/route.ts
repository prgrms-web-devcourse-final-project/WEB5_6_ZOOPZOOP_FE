import { fetchSpaceFilesByPageServer } from '@/entities/shared-archive/api/file.server'
import { postCopyFileToSpaceServer } from '@/features/archive/copy-to-space/api/copyToSpace.server'
import { requireAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'

// 자료 조회 (페이지)
export const GET = async (request: Request) => {
  try {
    const payload = await request.json()
    const response = await requireAuth(
      async token =>
        await fetchSpaceFilesByPageServer(payload, {
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
          : { error: '스페이스 파일 조회 중 오류 발생' }
    })
  }
}

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
          : { error: '스페이스로 파일 복사 중 오류 발생' }
    })
  }
}

// 자료 삭제
// export const PATCH = async (request: Request) => {
//   try {
//     const { searchParams } = new URL(request.url)
//     const dataSourceId = Number(searchParams.get('dataSourceId'))
//     if (isNaN(dataSourceId)) {
//       return NextResponse.json(
//         { error: '유효하지 않은 폴더 ID입니다' },
//         { status: 400 }
//       )
//     }
//     const response = await requireAuth(
//       async token =>
//         await deleteOneArchiveFileServer(dataSourceId, {
//           token
//         })
//     )
//     return NextResponse.json(response)
//   } catch (error) {
//     return NextResponse.json({
//       status: 500,
//       data: null,
//       msg:
//         error instanceof Error
//           ? error.message
//           : { error: '단건 파일 삭제 중 오류 발생' }
//     })
//   }
// }
