import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  try {
    // eslint-disable-next-line no-console
    console.log('등록되나?')
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: null,
      msg: error instanceof Error ? error.message : '요청 처리 중 오류 발생'
    })
  }
}
