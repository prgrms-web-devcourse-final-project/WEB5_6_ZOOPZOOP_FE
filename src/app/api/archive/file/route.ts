import {
  fetchArchiveFilesByFolderServer,
  postArchiveFileServer
} from '@/entities/archive/file/api/file.server'
import { createCookieHeader, withAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'

//폴더 내 파일 조회
export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url)
    const folderIdParam = url.searchParams.get('folderId')
    const folderId = folderIdParam ? parseInt(folderIdParam, 10) : null

    if (folderIdParam && isNaN(folderId!)) {
      return NextResponse.json(
        { error: '유효하지 않은 폴더 ID입니다' },
        { status: 400 }
      )
    }

    const response = await fetchArchiveFilesByFolderServer(folderId)
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: '파일을 불러오는 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
// 파일 업로드
export const POST = withAuth(async (token, request) => {
  const payload = await request?.json()

  return await postArchiveFileServer(payload, {
    headers: createCookieHeader(token)
  })
})

// TODO: 단건/다건 삭제 구현 필요
// TODO: 휴지통 이동 기능 구현 => 파일 임시 삭제 == 휴지통으로 이동,
// TODO: 파일 복구 기능 구현 => 휴지통에서 아카이브로 이동
