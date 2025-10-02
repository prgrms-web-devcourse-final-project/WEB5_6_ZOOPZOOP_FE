import { fetchSpaceFolderServer } from '@/entities/dashboard'
import { createCookieHeader, withAuth } from '@/shared/lib/api-route'

export const GET = withAuth(async (token, request) => {
  const spaceId = request.headers.get('x-space-id')

  if (!spaceId) {
    throw new Error('spaceId가 필요합니다')
  }

  return await fetchSpaceFolderServer(
    { spaceId: parseInt(spaceId) },
    {
      headers: createCookieHeader(token)
    }
  )
})
