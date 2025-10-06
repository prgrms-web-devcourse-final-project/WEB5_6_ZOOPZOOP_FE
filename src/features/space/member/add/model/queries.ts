import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AddMemberRequest } from './type'
import { addSpaceMemberClient } from '../api'

// 스페이스 유저 초대
export const useAddMembersMutation = (
  options: Omit<
    UseMutationOptions<void, Error, AddMemberRequest>,
    'mutationFn' | 'mutationKey'
  >
) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['add-member'],

    mutationFn: ({ memberNames, spaceId }) =>
      addSpaceMemberClient({ memberNames, spaceId }),
    ...options
  })

  return {
    handleAddMembers: mutate,
    isAdding: isPending
  }
}
