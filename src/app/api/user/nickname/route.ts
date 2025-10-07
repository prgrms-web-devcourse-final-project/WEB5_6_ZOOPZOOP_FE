import { NextResponse } from 'next/server'
import { updateNicknameServer } from '@/entities/user'
import { requireAuth } from '@/shared/lib/api-route'
import { fetchUserInfoByNameServer } from '@/entities/user/api/user.server'

// 닉네임 수정
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

// 닉네임으로 유저 정보 조회
export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')

    if (!name) {
      return NextResponse.json({
        status: 500,
        data: null,
        msg: '검색할 닉네임을 다시 입력해주세요.'
      })
    }
    const encodedName = encodeURIComponent(name)
    const response = await requireAuth(
      async token => await fetchUserInfoByNameServer(encodedName, { token })
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
