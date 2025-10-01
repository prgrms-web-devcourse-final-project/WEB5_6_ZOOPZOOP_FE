import {
  fetchArchiveFolderServer,
  postArchiveFolderServer
} from '@/entities/archive/folder/api/folder.server'
import { createCookieHeader, withAuth } from '@/shared/lib/api-route'

export const POST = withAuth(async (token, request) => {
  const payload = await request.json()
  return await postArchiveFolderServer(payload, {
    headers: createCookieHeader(token)
  })
})

export const GET = withAuth(async () => {
  return await fetchArchiveFolderServer()
})
