import { APIResponse, NextFetchOptions } from '@/shared/types'
import {
  FileGetResponse,
  FilePostResponse,
  SearchGetResponse,
  FileSearchParams,
  EditFileWithoutImgRequest
} from '../model/type'
import { httpClient } from '@/shared/lib'

// 아카이브 페이지 내 파일 조회
export const fetchArchiveFilesByPageServer = async (
  {
    folderId = 0,
    page = 1,
    size = 8,
    isActive = true,
    sort,
    keyword
  }: FileSearchParams,
  options?: NextFetchOptions
): Promise<SearchGetResponse> => {
  const params = new URLSearchParams()
  params.append('page', (page - 1).toString())
  params.append('size', size.toString())

  if (folderId) params.append('folderId', folderId.toString())
  if (sort) params.append('sort', sort)
  if (isActive !== undefined) params.append('isActive', isActive.toString())
  if (keyword && keyword.trim() !== '') {
    params.append('keyword', keyword)
  }

  const response = await httpClient.get<SearchGetResponse>(
    `/api/v1/archive?${params.toString()}`,
    options
  )

  return response
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
  return await httpClient.post<FilePostResponse>(
    `/api/v1/archive`,
    { folderId: payload.folderId, sourceUrl: payload.sourceUrl },
    options
  )
}

//파일 단건 삭제 (영구 삭제)
export const deleteOneArchiveFileServer = async (
  dataSourceId: number,
  options: NextFetchOptions
) => {
  return await httpClient.delete<FilePostResponse>(
    `/api/v1/archive/${dataSourceId}`,
    {},
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
  return await httpClient.delete<APIResponse<null>>(
    `/api/v1/archive/delete`,
    { dataSourceId: payload.dataSourceId },
    options
  )
}

// 파일 수정 - 이미지 불포함
export const editArchiveFileServer = async (
  fileData: EditFileWithoutImgRequest,
  options: NextFetchOptions
) => {
  const {
    title,
    summary,
    sourceUrl,
    imageUrl,
    source,
    tags,
    category,
    dataSourceId
  } = fileData
  return await httpClient.patch<FilePostResponse>(
    `/api/v1/archive/${dataSourceId}`,
    {
      title,
      summary,
      sourceUrl,
      imageUrl,
      source,
      tags,
      category
    },
    options
  )
}

// 파일 수정 - 이미지 포함
export const editArchiveFileWithImgServer = async (
  dataSourceId: number,
  formData: FormData,
  options: NextFetchOptions
) => {
  return await httpClient.patch<FilePostResponse>(
    `/api/v1/archive/${dataSourceId}`,
    formData,
    options
  )
}
