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

export type SpaceMemberResponse = APIResponse<SpaceMember>
