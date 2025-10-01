import { Liveblocks } from '@liveblocks/node'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

const liveblocks = new Liveblocks({
  secret: process.env.NEXT_LIVEBLOCKS_SECRET_KEY as string
})

export async function POST(request: NextRequest) {
  try {
    const { room } = await request.json()

    const cookieStore = cookies()

    const user = {
      id: `user-${Math.random().toString(36).substr(2, 9)}`,
      name: '디모',
      avatar:
        'https://static.wikia.nocookie.net/pokemon/images/8/8e/%EB%94%B0%EB%9D%BC%ED%81%90_%EA%B3%B5%EC%8B%9D_%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png/revision/latest/scale-to-width-down/1200?cb=20170804054502&path-prefix=ko'
    }

    const session = liveblocks.prepareSession(user.id, {
      userInfo: {
        name: user.name,
        avatar: user.avatar
      }
    })

    if (room) {
      session.allow(room, session.FULL_ACCESS)
    }

    const { status, body } = await session.authorize()
    return new Response(body, { status })
  } catch {
    return new Response('Internal Server Error', { status: 500 })
  }
}
