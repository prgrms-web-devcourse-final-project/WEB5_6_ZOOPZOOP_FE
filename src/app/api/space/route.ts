import {
  fetchSpaceListServer,
  postSpaceServer
} from '@/entities/space/api/space.server'
import { requireAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

// 스페이스 등록
export const POST = async (request: Request) => {
  const payload = await request.json()

  try {
    const response = await requireAuth(
      async token => await postSpaceServer(payload, { token })
    )

    // 서버 케시 삭제
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

// 스페이스 조회
export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)

  const page = searchParams.get('page') || '0'
  const size = searchParams.get('size') || '9'
  const sort = searchParams.getAll('sort')
  const includeMembers = searchParams.get('includeMembers')

  try {
    const response = await requireAuth(async token => {
      const params = new URLSearchParams()
      params.append('page', page)
      params.append('size', size)
      sort.forEach(s => params.append('sort', s))
      if (includeMembers) params.append('includeMembers', includeMembers)

      return await fetchSpaceListServer(
        { page: Number(page), size: Number(size), sort },
        { token }
      )
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: null,
      msg: error instanceof Error ? error.message : '요청 처리 중 오류'
    })
  }
}
