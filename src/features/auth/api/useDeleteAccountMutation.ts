import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { deleteAccountClient } from '@/entities/user/api/user.client'

export const useDeleteAccountMutation = (options: UseMutationOptions) => {
  return useMutation({
    mutationFn: deleteAccountClient,
    ...options
  })
}
