/* eslint-disable no-console */
import { postSpaceClient } from '@/entities/space'
import { useMutation } from '@tanstack/react-query'

const useCreateSpace = () => {
  return useMutation({
    mutationKey: ['create-space'],
    mutationFn: (payload: string) => postSpaceClient(payload),
    onSuccess: () => {
      // 성공 로직
      console.log('성공')
    },
    onError: error => {
      // 에러 로직
      console.log('error', error)
      console.log('실패')
    }
  })
}
export default useCreateSpace
