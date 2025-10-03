import { httpClient } from '@/shared/lib'
import { NextFetchOptions } from '@/shared/types'
import {
  CreateSpaceResponse,
  FetchSpaceListParams,
  SpacePaginationAPIResponse
} from '../model/type'

// 스페이스 목록 조회
export const fetchSpaceListServer = async (
  { page = 0, size = 15, sort = [] }: FetchSpaceListParams,
  options?: NextFetchOptions
): Promise<SpacePaginationAPIResponse> => {
  const params = new URLSearchParams()
  params.append('page', (page - 1).toString())
  params.append('size', size.toString())

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
