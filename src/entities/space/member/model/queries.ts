import {
  useMutation,
  UseMutationOptions,
  useSuspenseQuery
} from '@tanstack/react-query'
import { updateMemberAuthorityClient } from '../api'
import {
  AddMemberRequest,
  AuthorityChange,
  ExpelledMember,
  ExpelMemberRequest,
  SpaceAuthorityChangeRequest
} from './type'
import {
  addSpaceMemberClient,
  expelMemberClient,
  fetchSpaceMembersClient,
  fetchSpacePendingMembersClient
} from '../api/member.client'
import { memberQueryKeys } from './constant'

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
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: ['update', 'authority'],
    mutationFn: payload => updateMemberAuthorityClient(payload),
    ...options
  })

  return {
    mutateUpdateAuthority: mutate,
    isUpdating: isPending,
    isSuccess,
    isError
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

// 스페이스 유저 정보 list
export const useMembersQuery = (spaceId: string) => {
  return useSuspenseQuery({
    queryKey: memberQueryKeys.list(spaceId),
    queryFn: () => fetchSpaceMembersClient(spaceId)
  })
}
// 스페이스 유저 정보 list
export const usePendingMembersQuery = (spaceId: string) => {
  return useSuspenseQuery({
    queryKey: memberQueryKeys.pending(spaceId),
    queryFn: () => fetchSpacePendingMembersClient(spaceId)
  })
}

// 스페이스 퇴출
export const useExpelMemberMutation = (
  options: Omit<
    UseMutationOptions<ExpelledMember, Error, ExpelMemberRequest>,
    'mutationFn' | 'mutationKey'
  >
) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['expel-member'],
    mutationFn: payload => expelMemberClient(payload),
    ...options
  })

  return {
    mutateExpelMember: mutate,
    isExpelling: isPending
  }
}
