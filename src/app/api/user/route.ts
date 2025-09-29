import { createCookieHeader, withAuth } from '@/shared/lib/api-route'
import { fetchUserServer } from '@/entities/user'

// 사용자 정보 조회
export const GET = withAuth(
  async token =>
    await fetchUserServer({
      headers: createCookieHeader(token)
    })
)
