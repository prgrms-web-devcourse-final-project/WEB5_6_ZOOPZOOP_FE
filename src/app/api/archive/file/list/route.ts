import {
  deleteManyArchiveFileServer,
  fetchArchiveFilesByPageServer
} from '@/entities/archive/file/api/file.server'
import { moveManyArchiveFilesServer } from '@/features/archive/move-file/api/moveFile.server'
import { createCookieHeader, requireAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'

//페이지 내 파일 조회
export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const folderId = searchParams.get('folderId')
  const page = searchParams.get('page')
  const size = searchParams.get('size')
  try {
    const response = await fetchArchiveFilesByPageServer({
      folderId: Number(folderId),
      page: Number(page),
      size: Number(size)
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: null,
      msg:
        error instanceof Error
          ? error.message
          : { error: '페이지 내 파일 불러오는 중 오류 발생' }
    })
  }
}

// 다건 파일 이동
export const PUT = async (request: Request) => {
  const payload = await request.json()
  try {
    const response = await requireAuth(
      async token =>
        await moveManyArchiveFilesServer(payload, {
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
          : { error: '다건 파일 이동 중 오류 발생' }
    })
  }
}

//파일 다건 삭제 (영구 삭제)
export const DELETE = async (request: Request) => {
  const payload = await request.json()
  try {
    const response = await requireAuth(
      async token =>
        await deleteManyArchiveFileServer(payload, {
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
          : { error: '다건 파일 삭제 중 오류 발생' }
    })
  }
}
