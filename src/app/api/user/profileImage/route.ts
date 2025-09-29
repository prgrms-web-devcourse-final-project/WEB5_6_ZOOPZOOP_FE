import { updateProfileImageServer } from '@/entities/user'
import { createCookieHeader, withAuth } from '@/shared/lib/api-route'

export const PUT = withAuth(async (token, request) => {
  const formData = await request.formData()
  const file = formData.get('file') as File

  const backendFormData = new FormData()
  backendFormData.append('file', file)

  return await updateProfileImageServer(backendFormData, {
    headers: {
      ...createCookieHeader(token),
      'Content-Type': 'multipart/form-data'
    }
  })
})
