import { APIResponse, Authority, Pagination } from '@/shared/types'

// 스페이스 맴버 타입
export interface SpaceMember {
  id: number
  name: string
  profileUrl: string
  authority: Authority
}

// 스페이스 타입
export interface Space {
  id: number
  name: string
  thumbnailUrl: string
  authority: Authority
  createDate: string
  members: SpaceMember[]
}

// 페이지 네이션 파라미터
export interface FetchSpaceListParams {
  page?: number
  size?: number
  sort?: string[]
}

// 스페이스 페이지네이션 타입
export type SpacePagination = Pagination<'spaces', Space>

// 스페이스 페이지 API 네이션
export type SpacePaginationAPIResponse = APIResponse<SpacePagination>

export type CreateSpaceResponse = APIResponse<{ name: string }>
