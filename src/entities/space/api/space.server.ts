import { httpClient } from '@/shared/lib'
import { NextFetchOptions } from '@/shared/types'
import { FetchSpaceListParams, SpacePaginationAPIResponse } from '../model/type'

// 스페이스 목록 조회
export const fetchSpaceListServer = async (
  { page = 0, size = 8, sort = [] }: FetchSpaceListParams,
  options?: NextFetchOptions
) => {
  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('size', size.toString())

  sort.forEach(s => {
    params.append('sort', s)
  })

  return await httpClient.get<SpacePaginationAPIResponse>(
    `/api/v1/space?${params.toString()}`,
    options
  )
}
