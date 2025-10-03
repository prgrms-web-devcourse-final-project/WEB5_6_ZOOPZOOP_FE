import {
  deleteSpaceServer,
  fetchSpaceServer
} from '@/entities/space/api/space.server'
import { requireAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

// 스페이스 단건 조회
export const GET = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params

    const response = await requireAuth(
      async token => await fetchSpaceServer(id, { token })
    )

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: null,
      msg: error instanceof Error ? error.message : '요청 처리 중 오류 발생'
    })
  }
}

// 스페이스 삭제
export const DELETE = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params

    const response = await requireAuth(
      async token => await deleteSpaceServer(id, { token })
    )

    revalidateTag('space')
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: null,
      msg: error instanceof Error ? error.message : '요청 처리 중 오류 발생'
    })
  }
}
