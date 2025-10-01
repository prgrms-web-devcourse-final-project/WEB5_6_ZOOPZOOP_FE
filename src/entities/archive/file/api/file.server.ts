import { NextFetchOptions } from '@/shared/types'
import { FileGetResponse, FilePostResponse } from '../model/type'
import { httpClient } from '@/shared/lib'
import { createCookieHeader, getAccessToken } from '@/shared/lib/api-route'

// 파일 조회
export const fetchArchiveFilesServer = async (folderId: number | null) => {
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
