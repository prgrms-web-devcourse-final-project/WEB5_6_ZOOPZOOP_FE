import { updateProfileImageServer } from '@/entities/user'
import { createCookieHeader, withAuth } from '@/shared/lib/api-route'

export const PUT = withAuth(async (token, request) => {
  const formData = await request.formData()
  const file = formData.get('file') as File
  // File을 Buffer 또는 Blob으로 변환
  const fileBuffer = await file.arrayBuffer()
  const blob = new Blob([fileBuffer], { type: file.type })

  const backendFormData = new FormData()
  // Blob과 함께 파일명도 전달
  backendFormData.append('file', blob, file.name)

  return await updateProfileImageServer(backendFormData, {
    headers: {
      ...createCookieHeader(token)
    }
  })
})
