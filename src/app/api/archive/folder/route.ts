import {
  deleteArchiveFolderServer,
  fetchArchiveFolderServer,
  patchArchiveFolderServer,
  postArchiveFolderServer
} from '@/entities/archive/folder/api/folder.server'
import { createCookieHeader, withAuth } from '@/shared/lib/api-route'

//폴더 조회
export const GET = withAuth(async () => {
  return await fetchArchiveFolderServer()
})

// 폴더 생성
export const POST = withAuth(async (token, request) => {
  const payload = await request?.json()

  return await postArchiveFolderServer(payload, {
    headers: createCookieHeader(token)
  })
})

// 폴더 이름 변경
export const PATCH = withAuth(async (token, request) => {
  const url = new URL(request!.url)
  const folderIdParam = url.searchParams.get('folderId')
  const folderId = folderIdParam ? parseInt(folderIdParam, 10) : null

  if (!folderId) throw new Error('folderId is required')

  const payload = await request!.json()
  const response = await patchArchiveFolderServer(
    folderId,
    { folderName: payload.folderName },
    { headers: createCookieHeader(token) }
  )

  return response
})

// 폴더 삭제
export const DELETE = withAuth(async (token, request) => {
  const { folderId } = await request!.json()
  return await deleteArchiveFolderServer(folderId, {
    headers: createCookieHeader(token)
  })
})
