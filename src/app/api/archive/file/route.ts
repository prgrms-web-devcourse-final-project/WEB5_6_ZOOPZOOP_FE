import {
  fetchArchiveFilesByFolderServer,
  postArchiveFileServer
} from '@/entities/archive/file/api/file.server'
import { createCookieHeader, withAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'

//폴더 내 파일 조회
export const GET = async (request: Request) => {
  const url = new URL(request.url)
  const folderIdParam = url.searchParams.get('folderId')
  const folderId = folderIdParam ? parseInt(folderIdParam, 10) : null
  const response = await fetchArchiveFilesByFolderServer(folderId)
  return NextResponse.json(response)
}

// 파일 업로드
export const POST = withAuth(async (token, request) => {
  const payload = await request.json()

  return await postArchiveFileServer(payload, {
    headers: createCookieHeader(token)
  })
})

// 파일 삭제 -> 단건 다건 삭제 이슈로 -> request에 따라서 조건

// 파일 임시 삭제 == 휴지통으로 이동,
// 파일 복구 => 휴지통에서 아카이브로 이동
