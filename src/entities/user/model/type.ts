import { APIResponse } from '@/shared/types'

// 유저
export interface User {
  id: number
  name: string
  profileUrl: string
  createAt: string
  provider: string
}

// 사용자 정보 response
export type UserResponse = APIResponse<User>

// 닉네임
export interface Nickname {
  name: string
}

// 사용자 닉네임 변경
export type UpdateNicknameResponse = APIResponse<Nickname>

// 프로필 url
export interface Profile {
  profileUrl: string
}
// 업로드 프로필 이미지
export type UpdateProfileImageResponse = APIResponse<Profile>

// 유저 검색
export type SearchUser = Omit<User, 'createAt' | 'provider' | 'profileUrl'> & {
  profileImageUrl: string
}
export type SearchUserResponse = APIResponse<SearchUser[]>
