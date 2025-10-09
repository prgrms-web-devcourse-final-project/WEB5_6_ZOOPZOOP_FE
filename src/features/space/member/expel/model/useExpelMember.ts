import { memberQueryKeys } from '@/entities/space'
import { useExpelMemberMutation } from '@/entities/space/member/model/queries'
import { useModalStore } from '@/shared/lib'
import { showErrorToast, showSuccessToast } from '@/shared/ui/toast/Toast'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export const useExpelMember = () => {
  const closeModal = useModalStore(state => state.closeModal)
  const [confirmText, setConfirmText] = useState('')
  const queryClient = useQueryClient()

  const { expelMember, isExpelling } = useExpelMemberMutation({
    onSuccess: data => {
      if (!data) return
      showSuccessToast(`${data.expelledMemberInfo.name}님을 퇴출했습니다`)
      closeModal()
    },
    onError: error => {
      showErrorToast(error.message)
    },
    onSettled: data => {
      if (!data) return
      queryClient.invalidateQueries({
        queryKey: memberQueryKeys.list(String(data.spaceId))
      })
      queryClient.invalidateQueries({
        queryKey: memberQueryKeys.pending(String(data.spaceId))
      })
    }
  })

  const isDeleteEnabled = (name: string) => {
    return confirmText.trim() === name.trim()
  }

  return {
    handleExpel: expelMember,
    isExpelling,
    confirmText,
    isDeleteEnabled,
    setConfirmText
  }
}
