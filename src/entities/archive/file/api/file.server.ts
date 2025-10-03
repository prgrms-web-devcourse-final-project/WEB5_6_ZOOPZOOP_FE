import { NextFetchOptions } from '@/shared/types'
import {
  FileGetResponse,
  FilePostResponse,
  SearchGetResponse,
  FileSearchParams
} from '../model/type'
import { httpClient } from '@/shared/lib'

// 아카이브 페이지 내 파일 조회
export const fetchArchiveFilesByPageServer = async (
  { folderId, page, size }: FileSearchParams,
  options?: NextFetchOptions
): Promise<SearchGetResponse> => {
  return await httpClient.get<SearchGetResponse>(
    `/api/v1/archive?page=${page}&size=${size}&folderId=${folderId}`,
    options
  )
}

// 아카이브 휴지통 파일 조회
export const fetchArchiveTrashFilesServer = async (
  { isActive, folderId, page, size }: FileSearchParams,
  options?: NextFetchOptions
): Promise<SearchGetResponse> => {
  return await httpClient.get<SearchGetResponse>(
    `/api/v1/archive?page=${page}&size=${size}&folderId=${folderId}&isActive=${isActive}`,
    options
  )
}

// 폴더 내 파일 조회
export const fetchArchiveFilesByFolderServer = async (
  folderId: number | null,
  options: NextFetchOptions
) => {
  return await httpClient.get<FileGetResponse>(
    `/api/v1/archive/folder/${folderId}/files`,
    options
  )
}

// 파일 업로드 (등록)
export const postArchiveFileServer = async (
  payload: {
    folderId: number | null
    sourceUrl: string
  },
  options: NextFetchOptions
): Promise<FilePostResponse> => {
  return httpClient.post<FilePostResponse>(`/api/v1/archive`, payload, options)
}

//파일 단건 삭제 (영구 삭제)
export const deleteOneArchiveFileServer = async (
  dataSourceId: number,
  options: NextFetchOptions
) => {
  return httpClient.delete<FilePostResponse>(
    `/api/v1/archive/${dataSourceId}`,
    options
  )
}

//파일 다건 삭제 (영구 삭제)
export const deleteManyArchiveFileServer = async (
  payload: {
    dataSourceId: number[]
  },
  options: NextFetchOptions
) => {
  return httpClient.delete<FilePostResponse>(
    `/api/v1/archive/delete`,
    payload,
    options
  )
}

// 파일 수정
export const editArchiveFileServer = async (
  payload: {
    dataSourceId: number[]
  },
  options: NextFetchOptions
) => {
  return httpClient.put<FilePostResponse>(
    `/api/v1/archive/move`,
    payload,
    options
  )
}
