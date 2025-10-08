import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { deleteAccountClient } from '@/entities/user/api/user.client'

export const useDeleteAccountMutation = (options: UseMutationOptions) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['auth', 'delete'],
    mutationFn: deleteAccountClient,
    ...options
  })

  return {
    mutateDeleteAccount: mutate,
    isDeleting: isPending
  }
}
