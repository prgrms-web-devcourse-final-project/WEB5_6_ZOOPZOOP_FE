import { fetchArchiveFilesByPageServer } from '@/entities/archive/file/api/file.server'
import { NextResponse } from 'next/server'

//페이지 내 파일 조회
export const GET = async (request: Request) => {
  const url = new URL(request.url)
  const folderIdParam = url.searchParams.get('folderId')
  const pageParam = url.searchParams.get('page')
  const sizeParam = url.searchParams.get('size')

  const response = await fetchArchiveFilesByPageServer({
    folderId: Number(folderIdParam),
    page: Number(pageParam),
    size: Number(sizeParam)
  })
  return NextResponse.json(response)
}
