import { httpClient } from '@/shared/lib'
import {
  FileGetResponse,
  FilePostResponse,
  SearchGetResponse,
  FileSearchParams,
  EditFileRequest
} from '../model/type'
import { APIResponse } from '@/shared/types'

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
  folderId = 0,
  page = 1,
  size = 8,
  sort,
  isActive = true,
  keyword
}: FileSearchParams) => {
  const params = new URLSearchParams()
  params.append('page', (page - 1).toString())
  params.append('size', size.toString())
  params.append('folderId', folderId.toString())
  params.append('isActive', isActive.toString())

  if (sort) params.append('sort', sort)
  if (keyword && keyword.trim() !== '') {
    params.append('keyword', keyword)
  }

  const response = await httpClient.get<SearchGetResponse>(
    `/api/archive/file/list?${params.toString()}`
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

//파일 단건 삭제
export const deleteOneArchiveFileClient = async (
  dataSourceId: number
): Promise<APIResponse<null>> => {
  const response = await httpClient.delete<APIResponse<null>>(
    `/api/archive/file?dataSourceId=${dataSourceId}`,
    {}
  )
  if (response.status !== 200) {
    throw new Error(response.msg)
  }

  return response
}

//파일 다건 삭제
export const deleteManyArchiveFileClient = async (
  dataSourceId: number[]
): Promise<APIResponse<null>> => {
  const response = await httpClient.delete<APIResponse<null>>(
    `/api/archive/file/list`,
    { dataSourceId: dataSourceId }
  )
  if (response.status !== 200) {
    throw new Error(response.msg)
  }
  return response
}

// 파일 수정
export const editArchiveFileClient = async (
  fileData: EditFileRequest
): Promise<FilePostResponse> => {
  const response = await httpClient.post<FilePostResponse>(
    `/api/archive/file`,
    fileData
  )
  if (response.status !== 200) {
    throw new Error(response.msg)
  }
  return response
}
