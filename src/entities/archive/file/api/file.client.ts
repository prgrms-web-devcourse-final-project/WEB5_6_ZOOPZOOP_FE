import { httpClient } from '@/shared/lib'
import { FileGetResponse, FilePostResponse } from '../model/type'

// 파일 조회
export const fetchArchiveFilesClient = async (folderId: number | null) => {
  const response = await httpClient.get<FileGetResponse>(
    `/api/archive/file?folderId=${folderId}`
  )

  return response
}

// 파일 업로드
export const postArchiveFileClient = async (
  folderId: number | null,
  sourceUrl: string
): Promise<FilePostResponse> => {
  const response = httpClient.post<FilePostResponse>(`/api/archive/file`, {
    folderId: folderId,
    sourceUrl: sourceUrl
  })

  return response
}
