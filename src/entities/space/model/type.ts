import { Member } from '@/entities/member'
import { APIResponse, Authority, Pagination } from '@/shared/types'

// 스페이스 인포
export interface Space {
  spaceId: number
  spaceName: string
  thumbnailUrl: string
  userAuthority: string
  sharingArchiveId: number
  dashboardId: number
}

// 스페이스 카드 타입
export interface SpaceCard {
  id: number
  name: string
  thumbnailUrl: string
  authority: Authority
  createDate: string
  members: Member[]
}

// 페이지 네이션 파라미터
export interface FetchSpaceListParams {
  page?: number
  size?: number
  sort?: string[]
}

// 스페이스 인포 반환 타입
export type SpaceResponse = APIResponse<Space>

// 스페이스 페이지네이션 타입
export type SpacePagination = Pagination<'spaces', SpaceCard>

// 스페이스 페이지 API 네이션
export type SpacePaginationAPIResponse = APIResponse<SpacePagination>

export type CreateSpaceResponse = APIResponse<{ name: string }>

// 스페이스 삭제 반환
export type DeleteSpaceResponse = APIResponse<void>

// 스페이스 이름 변경 반환
export type EditSpaceNameResponse = APIResponse<{ name: string }>
