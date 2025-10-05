import { useCreateSpaceMutation } from '@/entities/space'
import { useModalStore } from '@/shared/lib'
import { showErrorToast, showSuccessToast } from '@/shared/ui/toast/Toast'
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
    onSuccess: data => {
      // space 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['space'] })
      router.refresh()
      showSuccessToast(`'${data?.name}' 스페이스 생성 완료`)
      closeModal()
    },
    onError: () => {
      showErrorToast(`스페이스 생성 실패 다시 시도해주세요.`)
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
