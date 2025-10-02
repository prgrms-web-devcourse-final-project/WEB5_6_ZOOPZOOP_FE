import { sortArchiveFilesServer } from '@/features/archive/search-file/api/search.server'
import { NextRequest, NextResponse } from 'next/server'

// 자료 검색
export async function GET(req: NextRequest) {
  // 쿼리스트링 추출
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page') ?? '1'
  const size = searchParams.get('size') ?? '10'
  const sort = searchParams.get('sort') ?? '이름,asc'

  // 서버 API 호출
  const data = await sortArchiveFilesServer({
    page: Number(page),
    size: Number(size),
    sort
  })

  return NextResponse.json(data)
}
