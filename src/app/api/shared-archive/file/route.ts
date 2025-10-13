import {
  deleteManySpaceFileServer,
  editSpaceFileWithoutImgServer,
  fetchSpaceFilesByPageServer
} from '@/entities/shared-archive/api/file.server'
import { postCopyFileToSpaceServer } from '@/features/shared-archive/import-file/api/copyToSpace.server'
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
export const DELETE = async (request: Request) => {
  try {
    const payload = await request.json()
    const response = await requireAuth(
      async token =>
        await deleteManySpaceFileServer(payload, {
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
          : { error: '스페이스 다건 파일 삭제 중 오류 발생' }
    })
  }
}

// 파일 수정 - 이미지 불포함
export const PATCH = async (request: Request) => {
  const payload = await request.json()

  try {
    const response = await requireAuth(
      async token =>
        await editSpaceFileWithoutImgServer(payload, {
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
          : { error: '파일 수정 중 오류 발생' }
    })
  }
}
