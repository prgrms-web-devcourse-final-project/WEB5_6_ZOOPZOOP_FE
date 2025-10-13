import { APIResponse } from '@/shared/types'
import {
  TrashSpaceFileRequest,
  SearchSpaceFileGetResponse,
  SpaceFileByFolder,
  SpaceFileByFolderGetResponse,
  SpaceFileByFolderRequest,
  SpaceFileByPageRequest,
  EditSpaceFileWithoutImgRequest,
  EditResponse,
  EditSpaceFileWithImgRequest
} from '../model/type'
import { httpClient } from '@/shared/lib'

// 페이지 안에 있는 파일 조회
export const fetchSpaceFilesClient = async ({
  spaceId,
  page = 1,
  size = 8,
  sort,
  isActive = true,
  keyword
}: SpaceFileByPageRequest) => {
  const params = new URLSearchParams()
  params.append('page', (page - 1).toString())
  params.append('size', size.toString())
  params.append('isActive', isActive.toString())
  if (spaceId) params.append('spaceId', spaceId.toString())
  if (sort) params.append('sort', sort)
  if (keyword && keyword.trim() !== '') {
    params.append('keyword', keyword)
  }

  const response = await httpClient.get<SearchSpaceFileGetResponse>(
    `/api/shared-archive/file?${params.toString()}`
  )

  if (response.status !== 200) {
    throw new Error(response.msg)
  }

  return response
}

// 폴더 내 파일 조회
export const fetchSpaceFilesByFolderClient = async ({
  spaceId
}: SpaceFileByFolderRequest): Promise<SpaceFileByFolder> => {
  const response = await httpClient.get<SpaceFileByFolderGetResponse>(
    `/api/shared-archive/folder?spaceId=${spaceId}`
  )
  if (response.status !== 200 || !response.data) {
    throw new Error(response.msg || '파일 데이터가 없습니다.')
  }

  return response.data
}

// 파일 다건 삭제(영구삭제)
export const deleteManySpaceFileClient = async ({
  spaceId,
  dataSourceId
}: TrashSpaceFileRequest) => {
  return await httpClient.delete<APIResponse<null>>(
    `/api/shared-archive/file`,
    { spaceId, dataSourceId }
  )
}

// 파일 수정  - 이미지 불포함
export const editSpaceFileWithoutImgClient = async (
  fileData: EditSpaceFileWithoutImgRequest
): Promise<EditResponse> => {
  const response = await httpClient.patch<EditResponse>(
    `/api/shared-archive/file`,
    fileData
  )
  if (response.status !== 200) {
    throw new Error(response.msg)
  }
  return response
}

// 파일 수정 - 이미지 포함
export const editSpaceFileWithImgClient = async (
  fileData: EditSpaceFileWithImgRequest
): Promise<EditResponse> => {
  const { payload, image, dataSourceId, spaceId } = fileData
  const formData = new FormData()
  formData.append(
    'payload',
    new Blob([JSON.stringify(payload)], { type: 'application/json' })
  )

  if (image) {
    formData.append('image', image)
  }

  const response = await httpClient.patch<EditResponse>(
    `/api/shared-archive/edit?dataSourceId=${dataSourceId}&spaceId=${spaceId}`,
    formData
  )

  if (response.status !== 200) {
    throw new Error(response.msg)
  }
  return response
}
