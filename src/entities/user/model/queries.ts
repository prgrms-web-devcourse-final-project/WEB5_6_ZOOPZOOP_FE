import {
  useMutation,
  UseMutationOptions,
  useQuery
} from '@tanstack/react-query'
import {
  fetchUserInfoByNameClient,
  updateNicknameClient,
  updateProfileImageClient
} from '../api/user.client'
import { Nickname, Profile } from './type'

// 유저 프로필 이미지 업데이트
export const useUpdateProfileImageMutation = (
  options: Omit<UseMutationOptions<Profile, Error, File>, 'mutationFn'>
) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (file: File) => updateProfileImageClient(file),
    ...options
  })

  return {
    updateProfileImage: mutate,
    isUploading: isPending
  }
}

// 유저 닉네임 업데이트
export const useUpdateNicknameMutation = (
  options: Omit<UseMutationOptions<Nickname, Error, string>, 'mutationFn'>
) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (nickname: string) => updateNicknameClient(nickname),
    ...options
  })

  return {
    updateNickname: mutate,
    isUpdating: isPending
  }
}

// 유저 정보 조회 by nickname
export const useFetchUserInfoByNicknameQuery = (name: string) => {
  return useQuery({
    queryKey: ['user', name],
    queryFn: () => fetchUserInfoByNameClient(name),
    enabled: !!name
  })
}
