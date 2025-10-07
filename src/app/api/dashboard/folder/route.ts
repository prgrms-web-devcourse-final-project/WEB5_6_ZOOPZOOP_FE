import { fetchDashboardFolderServer } from '@/entities/dashboard'
import { requireAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  const payload = await request.json()

  try {
    const response = await requireAuth(
      async token => await fetchDashboardFolderServer(payload, { token })
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
