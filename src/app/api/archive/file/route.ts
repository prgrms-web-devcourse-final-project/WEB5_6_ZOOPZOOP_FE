import {
  deleteOneArchiveFileServer,
  fetchArchiveFilesByFolderServer,
  postArchiveFileServer
} from '@/entities/archive/file/api/file.server'
import { moveOneArchiveFileServer } from '@/features/archive/move-file/api/moveFile.server'
import { requireAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'

//폴더 내 파일 조회
export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url)
    const folderId = Number(searchParams.get('folderId'))
    if (isNaN(folderId)) {
      return NextResponse.json(
        { error: '유효하지 않은 폴더 ID입니다' },
        { status: 400 }
      )
    }
    const response = await requireAuth(
      async token =>
        await fetchArchiveFilesByFolderServer(folderId, {
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
          : { error: '파일 조회 중 오류 발생' }
    })
  }
}

// 파일 업로드
export const POST = async (request: Request) => {
  const payload = await request.json()
  try {
    const response = await requireAuth(
      async token =>
        await postArchiveFileServer(payload, {
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

// 단건 파일 이동
export const PATCH = async (request: Request) => {
  const payload = await request.json()

  try {
    const response = await requireAuth(
      async token =>
        await moveOneArchiveFileServer(payload, {
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
          : { error: '파일 이동 중 오류 발생' }
    })
  }
}

//파일 단건 삭제 (영구 삭제)
export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url)
    const dataSourceId = Number(searchParams.get('dataSourceId'))
    if (isNaN(dataSourceId)) {
      return NextResponse.json(
        { error: '유효하지 않은 폴더 ID입니다' },
        { status: 400 }
      )
    }
    const response = await requireAuth(
      async token =>
        await deleteOneArchiveFileServer(dataSourceId, {
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
          : { error: '단건 파일 삭제 중 오류 발생' }
    })
  }
}
