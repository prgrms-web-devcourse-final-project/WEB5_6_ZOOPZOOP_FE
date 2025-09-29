import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { useUserStore } from '@/entities/user'
import { useLogoutMutation } from '../../api/useLogoutMutation'
import { PATH } from '@/shared/constants'

export const useLogout = () => {
  const router = useRouter()
  const clearUser = useUserStore(state => state.clearUser)
  const queryClient = useQueryClient()

  const { mutate, isPending } = useLogoutMutation({
    onSuccess: () => {
      clearUser()
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.removeQueries({ queryKey: ['user'] })
      setTimeout(() => {
        router.push(PATH.AUTH.LOGIN)
      }, 0)
    },
    onError: () => {
      // 에러 코드
    }
  })

  return {
    logout: () => mutate(),
    isLoading: isPending
  }
}
