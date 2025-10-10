import { APIResponse, Authority } from '@/shared/types'

export interface Member {
  id: number
  name: string
  profileUrl: string
  authority: Authority
}

export interface SpaceMember {
  spaceName: string
  members: Member[]
}

export interface SpacePendingMember {
  spaceName: string
  invitedUsers: Member[]
}

export interface AuthorityChange {
  spaceId: number
  spaceName: string
  member: Member
}

// 스페이스 초대 response
export type SpaceMemberResponse = APIResponse<SpaceMember>
// 스페이스 초대 요청 중인 user list response
export type SpacePendingMemberResponse = APIResponse<SpacePendingMember>

// 스페이스 맴버 권한 부여
export type SpaceAuthorityChangeResponse = APIResponse<AuthorityChange>
export type SpaceAuthorityChangeRequest = {
  spaceId: number
  newAuthority: Authority
  memberId: number
}

// 맴버 추가
export interface AddMember {
  memberNames: string[]
}

export interface AddMemberRequest {
  memberNames: string[]
  spaceId: number
}

export type AddMemberResponse = APIResponse<AddMember>

// 추방
export interface ExpelledMember {
  spaceId: number
  spaceName: string
  expelledMemberInfo: Member
}

export interface ExpelMemberRequest {
  spaceId: number
  memberId: number
}

export type ExpelMemberResponse = APIResponse<ExpelledMember>
