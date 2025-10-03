import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { logoutUserClient } from '../api/auth.client'

export const useLogoutMutation = (options: UseMutationOptions) => {
  return useMutation({
    mutationFn: logoutUserClient,
    ...options
  })
}
