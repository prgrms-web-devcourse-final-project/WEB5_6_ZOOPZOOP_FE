'use client'

import { httpClient } from '@/shared/lib'
import { FolderResponse } from '../model/type'

// 폴더 조회
export const fetchArchiveFolderClient = async (): Promise<FolderResponse> => {
  const response = await httpClient.get<FolderResponse>(`/api/archive/folder`)
  return response
}

// 폴더 생성
export const postArchiveFolderClient = async (
  payload: string
): Promise<FolderResponse> => {
  const response = httpClient.post<FolderResponse>(`/api/archive/folder`, {
    folderName: payload
  })

  return response
}

//폴더 이름 변경
export const patchArchiveFolderClient = async (
  folderId: number,
  folderName: string
) => {
  const response = await httpClient.patch(
    `/api/archive/folder?folderId=${folderId}`,
    {
      folderName
    }
  )
  return response
}

//폴더 삭제
export const deleteArchiveFolderClient = async (folderId: number) => {
  return await httpClient.delete<FolderResponse>(`/api/archive/folder`, {
    body: JSON.stringify({ folderId })
  })
}
