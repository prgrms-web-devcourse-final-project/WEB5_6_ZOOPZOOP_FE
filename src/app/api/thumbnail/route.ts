import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const src = searchParams.get('src')
  if (!src) return NextResponse.json({ error: 'src 필요함' }, { status: 400 })

  try {
    const res = await fetch(src)
    if (!res.ok)
      return NextResponse.json(
        { error: '이미지 가져오기 실패' },
        { status: 502 }
      )
    const buf = await res.arrayBuffer()
    return new Response(buf, {
      headers: {
        'Content-Type': res.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch {
    return NextResponse.json({ error: '이미지 가져오기 실패' }, { status: 500 })
  }
}
