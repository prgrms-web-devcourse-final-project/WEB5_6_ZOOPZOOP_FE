import { httpClient } from '@/shared/lib'
import { DeleteAccountResponse, NextFetchOptions } from '@/shared/types'
import {
  UpdateNicknameResponse,
  UpdateProfileImageResponse,
  UserResponse
} from '../model/type'

// 사용자 데이터
export const fetchUserServer = async (
  options: NextFetchOptions
): Promise<UserResponse> => {
  return httpClient.get<UserResponse>('/api/v1/member/me', options)
}

// 업데이트 닉네임
export const updateNicknameServer = async (
  payload: { newName: string },
  options: NextFetchOptions
): Promise<UpdateNicknameResponse> => {
  return httpClient.put<UpdateNicknameResponse>(
    '/api/v1/member/edit/name',
    payload,
    options
  )
}

// 계정 삭제
export const deleteAccountServer = async (
  options: NextFetchOptions
): Promise<DeleteAccountResponse> => {
  return httpClient.delete<DeleteAccountResponse>('/api/v1/member', options)
}

// 프로필 이미지 저장
export const updateProfileImageServer = async (
  formData: FormData,
  options: NextFetchOptions
) => {
  return httpClient.put<UpdateProfileImageResponse>(
    '/api/v1/member/edit/image',
    formData,
    options
  )
}
