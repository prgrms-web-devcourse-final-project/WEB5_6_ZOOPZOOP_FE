import { APIResponse } from '@/shared/types'

export interface AddMember {
  memberNames: string[]
}

export interface AddMemberRequest {
  memberNames: string[]
  spaceId: number
}

export type AddMemberResponse = APIResponse<AddMember>
