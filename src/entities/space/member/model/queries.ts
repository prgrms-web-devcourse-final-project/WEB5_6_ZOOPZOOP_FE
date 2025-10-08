import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { updateMemberAuthorityClient } from '../api'
import {
  AddMemberRequest,
  AuthorityChange,
  SpaceAuthorityChangeRequest
} from './type'
import { addSpaceMemberClient } from '../api/member.client'

// 스페이스 유저 권한 업데이트
export const useUpdateAuthorityMutation = (
  options: Omit<
    UseMutationOptions<
      AuthorityChange | null,
      Error,
      SpaceAuthorityChangeRequest
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['update', 'authority'],
    mutationFn: payload => updateMemberAuthorityClient(payload),
    ...options
  })

  return {
    mutateUpdateAuthority: mutate,
    isUpdating: isPending
  }
}

// 스페이스 유저 초대
export const useAddMembersMutation = (
  options: Omit<
    UseMutationOptions<void, Error, AddMemberRequest>,
    'mutationFn' | 'mutationKey'
  >
) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['add-member'],
    mutationFn: payload => addSpaceMemberClient(payload),
    ...options
  })

  return {
    mutateAddMembers: mutate,
    isAdding: isPending
  }
}
