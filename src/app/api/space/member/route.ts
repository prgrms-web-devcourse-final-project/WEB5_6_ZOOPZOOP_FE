import { updateMemberAuthorityServer } from '@/entities/member/api/member.server'
import { addSpaceMemberServer } from '@/features/space/member/add/api/member.server'
import { requireAuth } from '@/shared/lib/api-route'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

// 스페이스 맴버 초대 등록
export const POST = async (request: Request) => {
  try {
    const payload = await request.json()
    const response = await requireAuth(
      async token =>
        await addSpaceMemberServer(payload, {
          token
        })
    )

    revalidateTag('space-member-pending')
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

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: null,
      msg: error instanceof Error ? error.message : '요청 처리 중 오류 발생'
    })
  }
}
