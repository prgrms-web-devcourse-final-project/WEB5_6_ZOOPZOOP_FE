import { Profile, updateProfileImageClient } from '@/entities/user'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

export const useProfileImageMutation = (
  options: Omit<UseMutationOptions<Profile, Error, File>, 'mutationFn'>
) => {
  return useMutation({
    mutationFn: (file: File) => updateProfileImageClient(file),
    ...options
  })
}
