import { cancelInvitationsServer } from '@/entities/invitation/api/invitation.server'
import { requireAuth } from '@/shared/lib/api-route'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async (
  _: Request,
  { params }: { params: Promise<{ inviteId: string }> }
) => {
  try {
    const { inviteId } = await params

    const response = await requireAuth(
      async token => await cancelInvitationsServer(inviteId, { token })
    )

    revalidateTag('space-members')
    revalidateTag('space-pending-members')

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: null,
      msg: error instanceof Error ? error.message : '요청 처리 중 오류 발생'
    })
  }
}
