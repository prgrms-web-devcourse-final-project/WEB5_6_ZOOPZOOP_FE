import {
  fetchArchiveFilesServer,
  postArchiveFileServer
} from '@/entities/archive/file/api/file.server'
import { createCookieHeader, withAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  const url = new URL(request.url)
  const folderIdParam = url.searchParams.get('folderId')
  const folderId = folderIdParam ? parseInt(folderIdParam, 10) : null
  const response = await fetchArchiveFilesServer(folderId)
  return NextResponse.json(response)
}

export const POST = withAuth(async (token, request) => {
  const payload = await request.json()

  return await postArchiveFileServer(payload, {
    headers: createCookieHeader(token)
  })
})
