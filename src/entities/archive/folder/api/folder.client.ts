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
