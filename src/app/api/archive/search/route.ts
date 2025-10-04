import { sortArchiveFilesServer } from '@/features/archive/search-file/api/search.server'
import { NextRequest, NextResponse } from 'next/server'

// 자료 검색
const DEFAULT_PAGE = '1'
const DEFAULT_SIZE = '10'
const DEFAULT_SORT = '이름,asc'

export async function GET(req: NextRequest) {
  // 쿼리스트링 추출
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page') ?? DEFAULT_PAGE
  const size = searchParams.get('size') ?? DEFAULT_SIZE
  const sort = searchParams.get('sort') ?? DEFAULT_SORT

  // 서버 API 호출
  const data = await sortArchiveFilesServer({
    page: Number(page),
    size: Number(size),
    sort
  })

  return NextResponse.json(data)
}
