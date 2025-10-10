import {
  addSpaceMemberServer,
  fetchSpacePendingMembersServer
} from '@/entities/space/member/api/member.server'
import { requireAuth } from '@/shared/lib/api-route'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

// 스페이스 맴버 초대 등록
export const POST = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const payload = await request.json()
    const { id } = await params
    const response = await requireAuth(
      async token =>
        await addSpaceMemberServer(
          { spaceId: id, ...payload },
          {
            token
          }
        )
    )

    revalidateTag('space-pending-members')
    revalidateTag(payload.spaceId)

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: null,
      msg: error instanceof Error ? error.message : '요청 처리 중 오류 발생'
    })
  }
}

// 스페이스 초대 중인(pending) 맴버 조회
export const GET = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const numericId = Number(id)

    const response = await requireAuth(
      async token =>
        await fetchSpacePendingMembersServer(numericId, {
          token,
          next: {
            revalidate: 60,
            tags: ['space-pending-members', numericId.toString()]
          }
        })
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
