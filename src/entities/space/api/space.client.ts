import { httpClient } from '@/shared/lib'
import {
  CreateSpaceResponse,
  DeleteSpaceResponse,
  EditSpaceNameResponse,
  FetchSpaceListParams,
  LeaveSpaceResponse,
  Space,
  SpacePagination,
  SpacePaginationAPIResponse,
  SpaceResponse
} from '../model/type'

// 스페이스 조회
export const fetchSpaceListClient = async ({
  page = 1,
  size = 16,
  sort = [],
  state,
  includeMembers = true
}: FetchSpaceListParams): Promise<SpacePagination | null> => {
  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('size', size.toString())
  params.append('includeMembers', includeMembers.toString())

  if (state) {
    params.append('state', state)
  }

  sort.forEach(s => {
    params.append('sort', s)
  })

  const response = await httpClient.get<SpacePaginationAPIResponse>(
    `/api/space?${params.toString()}`
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

// 스페이스 삭제
export const deleteSpaceClient = async (spaceId: number): Promise<void> => {
  const response = await httpClient.delete<DeleteSpaceResponse>(
    `/api/space/${spaceId}`
  )

  if (response.status !== 200) {
    throw new Error(response.msg)
  }
}

// 스페이스 단건 조회
export const fetchSpaceClient = async (
  spaceId: number
): Promise<Space | null> => {
  const response = await httpClient.get<SpaceResponse>(`/api/space/${spaceId}`)

  if (response.status !== 200) {
    throw new Error(response.msg)
  }

  return response.data
}

export const updateSpaceNameClient = async (
  spaceId: number,
  payload: string
): Promise<{ name: string }> => {
  const response = await httpClient.put<EditSpaceNameResponse>(
    `/api/space/${spaceId}`,
    { name: payload }
  )
  const { data: name, status, msg } = response

  if (status !== 200 || !name) {
    throw new Error(msg)
  }

  return name
}

/**
 * 스페이스 나가기
 */
export const leaveSpaceClient = async (spaceId: number): Promise<void> => {
  const { msg, status } = await httpClient.delete<LeaveSpaceResponse>(
    `/api/space`,
    { spaceId }
  )

  if (status !== 200) {
    throw new Error(msg)
  }
}
