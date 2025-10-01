import { createCookieHeader, getAccessToken } from '@/shared/lib/api-route'
import { FolderResponse } from '../model/type'
import { httpClient } from '@/shared/lib'
import { NextFetchOptions } from '@/shared/types'

// 폴더 조회
export const fetchArchiveFolderServer = async () => {
  const token = await getAccessToken()
  const response = await httpClient.get<FolderResponse>(
    `/api/v1/archive/folder`,
    {
      headers: createCookieHeader(token!),
      next: { revalidate: 30 }
    }
  )
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

// 폴더 삭제

// 폴더 수정
