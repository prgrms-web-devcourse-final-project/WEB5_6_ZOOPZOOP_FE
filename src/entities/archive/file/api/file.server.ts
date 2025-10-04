import { NextFetchOptions } from '@/shared/types'
import { FileGetResponse, FilePostResponse } from '../model/type'
import { httpClient } from '@/shared/lib'
import { createCookieHeader, getAccessToken } from '@/shared/lib/api-route'
import {
  SearchGetResponse,
  SearchQuery
} from '@/features/archive/search-file/model/type'

// 아카이브 페이지 내 파일 조회
export const fetchArchiveFilesByPageServer = async ({
  folderId,
  page,
  size
}: SearchQuery): Promise<SearchGetResponse> => {
  const token = await getAccessToken()
  const response = await httpClient.get<SearchGetResponse>(
    `/api/v1/archive?page=${page}&size=${size}&folderId=${folderId}`,
    {
      headers: createCookieHeader(token!),
      next: { revalidate: 30 }
    }
  )

  return response
}

// 아카이브 휴지통 파일 조회
export const fetchArchiveTrashFilesServer = async ({
  isActive,
  folderId,
  page,
  size
}: SearchQuery): Promise<SearchGetResponse> => {
  const token = await getAccessToken()
  const response = await httpClient.get<SearchGetResponse>(
    `/api/v1/archive?page=${page}&size=${size}&folderId=${folderId}&isActive=${isActive}`,
    {
      headers: createCookieHeader(token!),
      next: { revalidate: 30 }
    }
  )
  return response
}

// 폴더 내 파일 조회
export const fetchArchiveFilesByFolderServer = async (
  folderId: number | null
) => {
  const token = await getAccessToken()

  const response = await httpClient.get<FileGetResponse>(
    `/api/v1/archive/folder/${folderId}/files`,
    {
      headers: createCookieHeader(token!),
      next: { revalidate: 30 }
    }
  )

  return response
}

// 파일 등록
export const postArchiveFileServer = async (
  payload: {
    folderId: number | null
    sourceUrl: string
  },
  options: NextFetchOptions
): Promise<FilePostResponse> => {
  return httpClient.post<FilePostResponse>(`/api/v1/archive`, payload, options)
}

//파일 단건 삭제 - 영구인가..?
export const deleteOneArchiveFileServer = async (
  dataSourceId: number,
  options: NextFetchOptions
) => {
  return httpClient.delete<FilePostResponse>(
    `/api/v1/archive/${dataSourceId}`,
    options
  )
}

//파일 다건 삭제
export const deleteManyArchiveFileServer = async (
  dataSourceId: number,
  options: NextFetchOptions
) => {
  return httpClient.delete<FilePostResponse>(`/api/v1/archive/delete`, options)
}

// 파일 이동 -update
