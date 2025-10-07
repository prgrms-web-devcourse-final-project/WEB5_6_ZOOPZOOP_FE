import {
  fetchSpaceListServer,
  postSpaceServer
} from '@/entities/space/api/space.server'
import { requireAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

// 스페이스 등록
export const POST = async (request: Request) => {
  try {
    const payload = await request.json()

    const response = await requireAuth(
      async token =>
        await postSpaceServer(payload, {
          token,
          next: { tags: ['space'] }
        })
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

  const page = searchParams.get('page')
  const size = searchParams.get('size')
  const sort = searchParams.getAll('sort')
  const includeMembers = searchParams.get('includeMembers')

  try {
    const response = await requireAuth(async token => {
      return await fetchSpaceListServer(
        {
          page: Number(page),
          size: Number(size),
          sort,
          includeMembers: Boolean(includeMembers)
        },
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
