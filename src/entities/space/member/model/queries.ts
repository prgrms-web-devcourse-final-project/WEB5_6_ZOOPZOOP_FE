import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { updateMemberAuthorityClient } from '../api'
import { AuthorityChange, SpaceAuthorityChangeRequest } from './type'

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
    mutationFn: (payload: SpaceAuthorityChangeRequest) =>
      updateMemberAuthorityClient(payload),
    ...options
  })

  return {
    mutateUpdateAuthority: mutate,
    isUpdating: isPending
  }
}
