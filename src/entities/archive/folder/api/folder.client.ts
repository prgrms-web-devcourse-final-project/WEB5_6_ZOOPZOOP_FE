'use client'

import { httpClient } from '@/shared/lib'
import { FolderPatchResponse, FolderResponse } from '../model/type'

// 폴더 조회
export const fetchArchiveFolderClient = async (): Promise<FolderResponse> => {
  const response = await httpClient.get<FolderResponse>(`/api/archive/folder`)
  if (response.status !== 200) {
    throw new Error(response.msg)
  }

  return response
}

// 폴더 생성
export const postArchiveFolderClient = async (
  folderName: string
): Promise<FolderResponse> => {
  const response = await httpClient.post<FolderResponse>(
    `/api/archive/folder`,
    {
      folderName
    }
  )
  if (response.status !== 200) {
    throw new Error(response.msg)
  }
  return response
}

//폴더 이름 변경
export const patchArchiveFolderClient = async (
  folderId: number,
  folderName: string
) => {
  const response = await httpClient.patch<FolderPatchResponse>(
    `/api/archive/folder?folderId=${folderId}`,
    {
      folderName
    }
  )
  if (response.status !== 200) {
    throw new Error(response.msg)
  }
  return response
}

//폴더 삭제
export const deleteArchiveFolderClient = async (folderId: number) => {
  const response = await httpClient.delete<FolderResponse>(
    `/api/archive/folder`,
    {
      body: JSON.stringify({ folderId })
    }
  )
  if (response.status !== 200) {
    throw new Error(response.msg)
  }
  return response
}
