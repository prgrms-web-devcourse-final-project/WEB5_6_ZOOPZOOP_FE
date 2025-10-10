import { httpClient } from '@/shared/lib'
import { APIResponse, NextFetchOptions } from '@/shared/types'

import {
  FolderPatchResponse,
  FolderPostResponse,
  FolderResponse
} from '../model/type'

// 폴더 조회
export const fetchArchiveFolderServer = async (options: NextFetchOptions) => {
  return await httpClient.get<FolderResponse>(`/api/v1/archive/folder`, options)
}

// 폴더 생성
export const postArchiveFolderServer = async (
  payload: { newName: string },
  options: NextFetchOptions
): Promise<FolderPostResponse> => {
  return await httpClient.post<FolderPostResponse>(
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
  return await httpClient.delete<APIResponse<null>>(
    `/api/v1/archive/folder/${folderId}`,
    {},
    options
  )
}

// 폴더 이름 변경
export const patchArchiveFolderServer = async (
  folderId: number,
  payload: { folderName: string },
  options: NextFetchOptions
) => {
  return await httpClient.patch<FolderPatchResponse>(
    `/api/v1/archive/folder/${folderId}`,
    payload,
    options
  )
}
