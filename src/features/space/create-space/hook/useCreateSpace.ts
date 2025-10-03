/* eslint-disable no-console */
import { postSpaceClient } from '@/entities/space'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const useCreateSpace = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['create-space'],
    mutationFn: (payload: string) => postSpaceClient(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['space'] })

      router.push('/space/?page=1')
      router.refresh()
    },
    onError: error => {
      // 에러 로직
      console.log('error', error)
      console.log('실패')
    }
  })
}
export default useCreateSpace
