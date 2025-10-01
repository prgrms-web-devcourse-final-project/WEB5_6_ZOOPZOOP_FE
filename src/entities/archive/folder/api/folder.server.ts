import { createCookieHeader, getAccessToken } from '@/shared/lib/api-route'

import { httpClient } from '@/shared/lib'
import { APIResponse, NextFetchOptions } from '@/shared/types'

import { FolderPatchResponse, FolderResponse } from '../model/type'

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
export const deleteArchiveFolderServer = async (
  folderId: number,
  options: NextFetchOptions
) => {
  return httpClient.delete<APIResponse<null>>(
    `/api/v1/archive/folder/${folderId}`,
    options
  )
}

// 폴더 이름 변경
export const patchArchiveFolderServer = async (
  folderId: number,
  payload: { folderName: string },
  options: NextFetchOptions
) => {
  return httpClient.patch<FolderPatchResponse>(
    `/api/v1/archive/folder/${folderId}`,
    payload,
    options
  )
}
