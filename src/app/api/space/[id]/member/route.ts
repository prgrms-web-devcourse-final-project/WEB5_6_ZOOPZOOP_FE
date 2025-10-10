import {
  expelMemberServer,
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
    const numericId = Number(id)

    const payload = await request.json()

    const response = await requireAuth(
      async token =>
        await updateMemberAuthorityServer(
          { spaceId: numericId, ...payload },
          { token }
        )
    )

    // 스페이스 맴버 캐싱 무효화
    revalidateTag(`space-members`)
    // revalidateTag(`space-members-${numericId.toString()}`)

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
    const numericId = Number(id)

    const response = await requireAuth(
      async token =>
        await fetchSpaceMembersServer(numericId, {
          token,
          next: {
            revalidate: 60,
            // tags: [`space-members-${numericId.toString()}`]
            tags: [`space-members`]
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

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const numericId = Number(id)
    const payload = await request.json()

    const response = await requireAuth(
      async token =>
        await expelMemberServer({ spaceId: numericId, ...payload }, { token })
    )

    // revalidateTag(`space-members-${numericId}`)
    // revalidateTag(`space-pending-members-${numericId}`)
    revalidateTag(`space-members`)
    revalidateTag(`space-pending-members`)
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: null,
      msg: error instanceof Error ? error.message : '요청 처리 중 오류 발생'
    })
  }
}
