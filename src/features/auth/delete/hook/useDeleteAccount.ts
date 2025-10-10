import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useUserStore } from '@/entities/user'
import { useModalStore } from '@/shared/lib'
import { useQueryClient } from '@tanstack/react-query'
import { PATH } from '@/shared/constants'
import { useDeleteAccountMutation } from './useDeleteAccountMutation'

export const useDeleteAccount = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const closeModal = useModalStore(state => state.closeModal)
  const clearUser = useUserStore(state => state.clearUser)
  const [confirmText, setConfirmText] = useState('')

  const isDeleteEnabled = confirmText === '계정 영구 삭제'

  const { isDeleting, mutateDeleteAccount } = useDeleteAccountMutation({
    onSuccess: () => {
      clearUser()
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.removeQueries({ queryKey: ['user'] })
      setTimeout(() => {
        router.push(PATH.AUTH.LOGIN)
        closeModal()
      }, 0)
    },
    onError: () => {
      closeModal()
    }
  })

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault()
    mutateDeleteAccount()
  }

  return {
    handleDelete,
    onClose: closeModal,
    isDeleting,
    setConfirmText,
    confirmText,
    isDeleteEnabled
  }
}
