import { updateNicknameServer } from '@/entities/user'
import { createCookieHeader, withAuth } from '@/shared/lib/api-route'

export const PUT = withAuth(async (token, request) => {
  const payload = await request.json()
  return await updateNicknameServer(payload, {
    headers: createCookieHeader(token)
  })
})
