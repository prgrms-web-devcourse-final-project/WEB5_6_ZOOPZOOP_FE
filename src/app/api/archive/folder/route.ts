import {
  deleteArchiveFolderServer,
  fetchArchiveFolderServer,
  patchArchiveFolderServer,
  postArchiveFolderServer
} from '@/entities/archive/folder/api/folder.server'
import { createCookieHeader, withAuth } from '@/shared/lib/api-route'

export const GET = withAuth(async () => {
  return await fetchArchiveFolderServer()
})

export const POST = withAuth(async (token, request) => {
  const payload = await request.json()

  return await postArchiveFolderServer(payload, {
    headers: createCookieHeader(token)
  })
})

export const PATCH = withAuth(async (token: string, request: Request) => {
  const url = new URL(request.url)
  const folderIdParam = url.searchParams.get('folderId')
  const folderId = folderIdParam ? parseInt(folderIdParam, 10) : null

  if (!folderId) throw new Error('folderId is required')

  const payload = await request.json()
  const response = await patchArchiveFolderServer(
    folderId,
    { folderName: payload.folderName },
    { headers: createCookieHeader(token) }
  )

  return response
})

export const DELETE = withAuth(async (token, request) => {
  const { folderId } = await request.json()
  return await deleteArchiveFolderServer(folderId, {
    headers: createCookieHeader(token)
  })
})
