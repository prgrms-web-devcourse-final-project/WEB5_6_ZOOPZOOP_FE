import { Liveblocks } from '@liveblocks/node'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { fetchUserServer } from '@/entities/user'

const liveblocks = new Liveblocks({
  secret: process.env.NEXT_LIVEBLOCKS_SECRET_KEY as string
})

export async function POST(request: NextRequest) {
  try {
    const { room } = await request.json()
    const cookieStore = await cookies()

    const accessToken = cookieStore.get('accessToken')?.value

    if (!accessToken) {
      return new Response('Unauthorized', { status: 401 })
    }

    let user
    try {
      const userResponse = await fetchUserServer({ token: accessToken })
      if (userResponse.status === 200 && userResponse.data) {
        user = {
          id: `user-${userResponse.data.name}`,
          name: userResponse.data.name,
          avatar: userResponse.data.profileUrl
        }
      } else {
        throw new Error('사용자 정보 조회 실패')
      }
    } catch {
      return new Response('Failed to fetch user info', { status: 403 })
    }

    const session = liveblocks.prepareSession(user.id, {
      userInfo: {
        name: user.name,
        avatar: user.avatar
      }
    })

    // 특정 방에 대한 권한 부여
    if (room) {
      session.allow(room, session.FULL_ACCESS)
    }

    const { status, body } = await session.authorize()
    return new Response(body, { status })
  } catch {
    return new Response('Internal Server Error', { status: 500 })
  }
}
