import { httpClient } from '@/shared/lib'
import {
  CreateSpaceResponse,
  FetchSpaceListParams,
  SpacePagination,
  SpacePaginationAPIResponse
} from '../model/type'

// 스페이스 조회
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

  if (response.status !== 200) {
    throw new Error(response.msg)
  }
  return response.data
}

// 스페이스 생성
export const postSpaceClient = async (
  payload: string
): Promise<{
  name: string
} | null> => {
  const response = await httpClient.post<CreateSpaceResponse>(
    '/api/space',
    payload
  )
  if (response.status !== 201) {
    throw new Error(response.msg)
  }

  return response.data
}
