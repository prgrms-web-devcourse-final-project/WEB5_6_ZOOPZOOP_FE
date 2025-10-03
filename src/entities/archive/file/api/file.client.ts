import { httpClient } from '@/shared/lib'
import {
  FileGetResponse,
  FilePostResponse,
  SearchGetResponse,
  FileSearchParams
} from '../model/type'

// 폴더 안의 파일 조회
export const fetchArchiveFilesByFolderClient = async (
  folderId: number | null
) => {
  const response = await httpClient.get<FileGetResponse>(
    `/api/archive/file?folderId=${folderId}`
  )
  if (response.status !== 200) {
    throw new Error(response.msg)
  }
  return response.data
}

// 페이지 안에 있는 파일 조회
export const fetchArchiveFilesByPageClient = async ({
  folderId,
  page,
  size
}: FileSearchParams) => {
  const response = await httpClient.get<SearchGetResponse>(
    `/api/archive/file/list?page=${page}&size=${size}&folderId=${folderId}`
  )
  if (response.status !== 200) {
    throw new Error(response.msg)
  }
  return response
}

// 파일 업로드
export const postArchiveFileClient = async (
  folderId: number | null,
  sourceUrl: string
): Promise<FilePostResponse> => {
  const response = await httpClient.post<FilePostResponse>(
    `/api/archive/file`,
    {
      folderId: folderId,
      sourceUrl: sourceUrl
    }
  )
  if (response.status !== 200) {
    throw new Error(response.msg)
  }
  return response
}
