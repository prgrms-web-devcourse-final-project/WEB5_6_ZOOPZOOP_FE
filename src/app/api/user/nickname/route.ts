import { NextResponse } from 'next/server'
import { updateNicknameServer } from '@/entities/user'
import { requireAuth } from '@/shared/lib/api-route'

export const PUT = async (request: Request) => {
  try {
    const payload = await request.json()
    const response = await requireAuth(
      async token => await updateNicknameServer(payload, { token })
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
