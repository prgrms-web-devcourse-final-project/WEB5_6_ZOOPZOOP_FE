/* eslint-disable no-console */
import { useCreateSpaceMutation } from '@/entities/space'
import { useModalStore } from '@/shared/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

export const useCreateSpace = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const closeModal = useModalStore(state => state.closeModal)

  // tanstack query
  const { createSpace, isCreating } = useCreateSpaceMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['space'] })

      router.push('/space/?page=1')
      closeModal()
    },
    onError: error => {
      // 에러 로직
      console.log('error', error)
      console.log('실패')
    }
  })

  const handleCreateSpace = () => {
    if (!inputRef?.current) return

    const spaceName = inputRef.current.value.trim()
    if (!spaceName) return

    createSpace(spaceName)
  }

  return {
    inputRef,
    onCreate: handleCreateSpace,
    isCreating
  }
}
