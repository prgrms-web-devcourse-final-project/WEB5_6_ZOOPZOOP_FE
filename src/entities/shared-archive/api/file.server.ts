import { APIResponse, NextFetchOptions } from '@/shared/types'

import { httpClient } from '@/shared/lib'
import {
  FilePostResponse,
  EditFileWithoutImgRequest
} from '@/entities/archive/file'
import {
  TrashSpaceFileRequest,
  SearchSpaceFileGetResponse,
  SpaceFileByFolderGetResponse,
  SpaceFileByFolderRequest,
  SpaceFileByPageRequest
} from '../model/type'

// 페이지 내 파일 조회
export const fetchSpaceFilesByPageServer = async (
  {
    spaceId,
    page = 1,
    size = 12,
    isActive = true,
    sort,
    keyword
  }: SpaceFileByPageRequest,
  options?: NextFetchOptions
): Promise<SearchSpaceFileGetResponse> => {
  const params = new URLSearchParams()
  params.append('page', (page - 1).toString())
  params.append('size', size.toString())

  if (sort) params.append('sort', sort)
  if (isActive !== undefined) params.append('isActive', isActive.toString())
  if (keyword && keyword.trim() !== '') {
    params.append('keyword', keyword)
  }

  const response = await httpClient.get<SearchSpaceFileGetResponse>(
    `/api/v1/space/${spaceId}/archive/datasources?${params.toString()}`,
    options
  )

  return response
}

//폴더 내 파일 조회
export const fetchSpaceFilesByFolderServer = async (
  { spaceId, folderId = 0 }: SpaceFileByFolderRequest,
  options?: NextFetchOptions
): Promise<SpaceFileByFolderGetResponse> => {
  const response = await httpClient.get<SpaceFileByFolderGetResponse>(
    `/api/v1/space/${spaceId}/archive/folder/${folderId}/files`,
    options
  )

  return response
}

// 파일 업로드 (등록)
export const postSpaceFileServer = async (
  payload: {
    folderId: number | null
    sourceUrl: string
  },
  options: NextFetchOptions
): Promise<FilePostResponse> => {
  return await httpClient.post<FilePostResponse>(
    `/api/v1/space`,
    { folderId: payload.folderId, sourceUrl: payload.sourceUrl },
    options
  )
}

//파일 단건 삭제 (영구 삭제)
// export const deleteOneSpaceFileServer = async (
//   dataSourceId: number,
//   options: NextFetchOptions
// ) => {
//   return await httpClient.delete<FilePostResponse>(
//     `/api/v1/space/${dataSourceId}`,
//     {},
//     options
//   )
// }

//파일 다건 삭제 (영구 삭제)
export const deleteManySpaceFileServer = async (
  { spaceId, dataSourceId }: TrashSpaceFileRequest,
  options: NextFetchOptions
) => {
  return await httpClient.delete<APIResponse<null>>(
    `/api/v1/space/${spaceId}/archive/datasources/delete`,
    { dataSourceId: dataSourceId },
    options
  )
}

// 파일 수정
export const editSpaceFileServer = async (
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
  return await httpClient.put<FilePostResponse>(
    `/api/v1/space/${dataSourceId}`,
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
