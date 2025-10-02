import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { logoutUserClient } from './auth.client'

export const useLogoutMutation = (options: UseMutationOptions) => {
  return useMutation({
    mutationFn: logoutUserClient,
    ...options
  })
}
