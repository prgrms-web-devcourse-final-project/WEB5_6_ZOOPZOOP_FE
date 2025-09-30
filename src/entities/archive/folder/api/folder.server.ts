import { createCookieHeader, getAccessToken } from '@/shared/lib/api-route'
import { FolderResponse } from '../model/type'
import { httpClient } from '@/shared/lib'
import { NextFetchOptions } from '@/shared/types'

// 아카이브 폴더 이름 조회
export const getArchiveFolderServer = async (
  options: NextFetchOptions
): Promise<FolderResponse> => {
  return httpClient.get<FolderResponse>(`/api/v1/archive/folder`, {
    ...options,
    next: { revalidate: 30 }
  })
}

// export const fetchArchiveFolderServer = withAuth(async (token, _request) => {
//   const response = await getArchiveFolderServer({
//     headers: createCookieHeader(token)
//   })
//   console.log('특이하다 특히애', response)
//   return response
// })

export const fetchArchiveFolderServer = async () => {
  const token = await getAccessToken()
  const response = await getArchiveFolderServer({
    headers: createCookieHeader(token!)
  })

  return response
}

// 폴더 생성
export const postArchiveFolderServer = async (
  payload: { newName: string },
  options: NextFetchOptions
): Promise<FolderResponse> => {
  return httpClient.post<FolderResponse>(
    `/api/v1/archive/folder`,
    payload,
    options
  )
}
