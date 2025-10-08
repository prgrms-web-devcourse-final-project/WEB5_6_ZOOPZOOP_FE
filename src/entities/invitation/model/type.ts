import { APIResponse, ListPayload } from '@/shared/types'

export interface Invitation {
  id: number // 초대 아이디
  name: string // 초대 스페이스 이름
  thumbnailUrl: string // 초대 스페이스 썸네일
}

// 알림 리스트 { space : T[] } 형탸
export type InvitationList = ListPayload<'spaces', Invitation>

// 알림 리스트 response
export type InvitationsResponse = APIResponse<InvitationList>

export interface InviteResult {
  id: number
  name: string
}

export type AcceptInviteResponse = APIResponse<InviteResult>
