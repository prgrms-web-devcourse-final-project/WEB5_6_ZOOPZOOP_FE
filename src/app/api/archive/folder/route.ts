import {
  deleteArchiveFolderServer,
  fetchArchiveFolderServer,
  patchArchiveFolderServer,
  postArchiveFolderServer
} from '@/entities/archive/folder/api/folder.server'
import { createCookieHeader, requireAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'

//폴더 조회
export const GET = async () => {
  try {
    const response = await requireAuth(
      async token =>
        await fetchArchiveFolderServer({
          headers: createCookieHeader(token)
        })
    )
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: '폴더 조회 중 오류 발생' },
      { status: 500 }
    )
  }
}

// 폴더 생성
export const POST = async (request: Request) => {
  const payload = await request.json()
  try {
    const response = await requireAuth(
      async token =>
        await postArchiveFolderServer(payload, {
          headers: createCookieHeader(token)
        })
    )
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: '폴더 생성 중 오류 발생' },
      { status: 500 }
    )
  }
}

// 폴더 이름 변경
export const PATCH = async (request: Request) => {
  const { searchParams } = new URL(request!.url)
  const folderId = Number(searchParams.get('folderId'))

  if (isNaN(folderId)) {
    return NextResponse.json(
      { error: '유효하지 않은 폴더 ID' },
      { status: 400 }
    )
  }
  try {
    const payload = await request.json()
    const response = await requireAuth(
      async token =>
        await patchArchiveFolderServer(
          folderId,
          { folderName: payload.folderName },
          { headers: createCookieHeader(token) }
        )
    )
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: '폴더 이름 변경 중 오류 발생' },
      { status: 500 }
    )
  }
}

// 폴더 삭제
export const DELETE = async (request: Request) => {
  try {
    const payload = await request.json()
    const response = await requireAuth(
      async token =>
        await deleteArchiveFolderServer(payload, {
          headers: createCookieHeader(token)
        })
    )
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: '폴더 삭제 중 오류 발생' },
      { status: 500 }
    )
  }
}
