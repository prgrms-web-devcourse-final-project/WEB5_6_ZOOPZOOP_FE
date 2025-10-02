import { httpClient } from '@/shared/lib'
import {
  FetchSpaceListParams,
  SpacePagination,
  SpacePaginationAPIResponse
} from '../model/type'

export const fetchSpaceListClient = async ({
  page = 0,
  size = 8,
  sort = []
}: FetchSpaceListParams): Promise<SpacePagination | null> => {
  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('size', size.toString())

  sort.forEach(s => {
    params.append('sort', s)
  })

  const response = await httpClient.get<SpacePaginationAPIResponse>(
    `/api/spaces?${params.toString()}`
  )
  if (response.status !== '200') {
    throw new Error(response.msg)
  }
  return response.data
}
