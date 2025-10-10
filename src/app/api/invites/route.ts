import { fetchInvitationsServer } from '@/entities/invitation/api/invitation.server'
import { requireAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'

// 알림 리스트 페치 핸들러
export const GET = async () => {
  try {
    const response = await requireAuth(
      async token => await fetchInvitationsServer({ token })
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
