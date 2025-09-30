// 폴더 생성

import { httpClient } from '@/shared/lib'
import { FolderResponse } from '../model/type'

export const postArchiveFolderClient = async (
  payload: string
): Promise<FolderResponse> => {
  const response = httpClient.post<FolderResponse>(`/api/archive/folder`, {
    folderName: payload
  })

  return response
}
