import { httpClient } from '@/shared/lib'
import { NextFetchOptions } from '@/shared/types'
import {
  CreateSpaceResponse,
  DeleteSpaceResponse,
  FetchSpaceListParams,
  SpaceResponse,
  SpacePaginationAPIResponse,
  EditSpaceNameResponse
} from '../model/type'

// 스페이스 목록 조회
export const fetchSpaceListServer = async (
  {
    page = 1,
    size = 15,
    sort = [],
    includeMembers = true
  }: FetchSpaceListParams,
  options?: NextFetchOptions
): Promise<SpacePaginationAPIResponse> => {
  const params = new URLSearchParams()
  // 백엔드는 0 base 인덱스이기 때문에  - 1을 해준다.
  params.append('page', (page - 1).toString())
  params.append('size', size.toString())
  params.append('includeMembers', includeMembers.toString())

  sort.forEach(s => {
    params.append('sort', s)
  })

  return await httpClient.get<SpacePaginationAPIResponse>(
    `/api/v1/space?${params.toString()}`,
    options
  )
}

// 스페이스 생성
export const postSpaceServer = async (
  payload: string,
  options?: NextFetchOptions
): Promise<CreateSpaceResponse> => {
  return await httpClient.post<CreateSpaceResponse>(
    '/api/v1/space',
    { name: payload },
    options
  )
}

// 스페이스 삭제
export const deleteSpaceServer = async (
  spaceId: string,
  options?: NextFetchOptions
): Promise<DeleteSpaceResponse> => {
  return await httpClient.delete<DeleteSpaceResponse>(
    `/api/v1/space/${spaceId}`,
    options
  )
}

// 스페이스 단건 조회
export const fetchSpaceServer = async (
  spaceId: string,
  options?: NextFetchOptions
): Promise<SpaceResponse> => {
  return await httpClient.get<SpaceResponse>(
    `/api/v1/space/${spaceId}`,
    options
  )
}

// 스페이스 이름 수정
export const editSpaceNameServer = async (
  payload: { name: string; spaceId: string },
  options?: NextFetchOptions
) => {
  const { spaceId, ...restPayload } = payload
  return await httpClient.put<EditSpaceNameResponse>(
    `/api/v1/space/${spaceId}`,
    restPayload,
    options
  )
}
