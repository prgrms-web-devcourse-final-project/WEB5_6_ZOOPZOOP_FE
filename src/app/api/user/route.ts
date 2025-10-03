import { requireAuth } from '@/shared/lib/api-route'
import { fetchUserServer } from '@/entities/user'
import { NextResponse } from 'next/server'

// 사용자 정보 조회
export const GET = async () => {
  try {
    const response = await requireAuth(async token => {
      return await fetchUserServer({ token })
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: null,
      msg: error instanceof Error ? error.message : '요청 처리 중 오류 발생'
    })
  }
}
