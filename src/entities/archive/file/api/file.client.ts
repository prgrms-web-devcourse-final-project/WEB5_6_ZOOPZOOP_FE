import { httpClient } from '@/shared/lib'
import { FileGetResponse, FilePostResponse } from '../model/type'
import {
  SearchGetResponse,
  SearchQuery
} from '@/features/archive/search-file/model/type'

// 폴더 안의 파일 조회
export const fetchArchiveFilesByFolderClient = async (
  folderId: number | null
) => {
  const response = await httpClient.get<FileGetResponse>(
    `/api/archive/file?folderId=${folderId}`
  )

  return response
}

// 페이지 안 파일 조회
export const fetchArchiveFilesByPageClient = async ({
  folderId,
  page,
  size
}: SearchQuery) => {
  const response = await httpClient.get<SearchGetResponse>(
    `/api/archive/file/page?page=${page}&size=${size}&folderId=${folderId}`
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
