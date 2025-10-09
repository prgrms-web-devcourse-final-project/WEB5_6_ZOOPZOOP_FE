import {
  fetchSpaceMembersServer,
  updateMemberAuthorityServer
} from '@/entities/space/member/api/member.server'
import { requireAuth } from '@/shared/lib/api-route'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

// 스페이스 유저 권한 업데이트
export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const payload = await request.json()

    const response = await requireAuth(
      async token =>
        await updateMemberAuthorityServer(
          { spaceId: id, ...payload },
          { token }
        )
    )

    revalidateTag('space-member')
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: null,
      msg: error instanceof Error ? error.message : '요청 처리 중 오류 발생'
    })
  }
}

// 스페이스 맴버 조회
export const GET = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params

    const response = await requireAuth(
      async token =>
        await fetchSpaceMembersServer(id, {
          token,
          next: { revalidate: 60, tags: ['space-member'] }
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
