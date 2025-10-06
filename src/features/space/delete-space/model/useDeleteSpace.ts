import { useDeleteSpaceMutation } from '@/entities/space'
import { useModalStore } from '@/shared/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const useDeleteSpace = () => {
  const [confirmText, setConfirmText] = useState<string>('')
  const closeModal = useModalStore(state => state.closeModal)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { deleteSpace, isDeleting } = useDeleteSpaceMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['space'] })
      // 팝업 닫기
      closeModal()
      router.push('/space?page=1')
    },
    onError: error => {
      // eslint-disable-next-line no-console
      console.error('에러', error)
    }
  })

  // 파생 상태
  const isDeleteEnabled = (title: string) => {
    return confirmText.trim() === title.trim()
  }

  return {
    isDeleting,
    confirmText,
    onDelete: deleteSpace,
    setConfirmText,
    isDeleteEnabled
  }
}
