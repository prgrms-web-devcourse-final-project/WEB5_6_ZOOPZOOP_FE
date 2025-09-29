import { APIResponse } from '@/shared/types'

export interface User {
  name: string
  profileUrl: string
  createAt: Date
  provider: string
}

// 사용자 정보 response
export type UserResponse = APIResponse<User>

export interface Nickname {
  name: string
}

// 사용자 닉네임 변경
export type UpdateNicknameResponse = APIResponse<Nickname>
