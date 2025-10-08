import { useUserStore } from '@/entities/user'
import { useUpdateNicknameMutation } from '@/entities/user/model/queries'
import { showErrorToast, showSuccessToast } from '@/shared/ui/toast/Toast'
import { useState } from 'react'

export const useUpdateNickname = (nickname: string) => {
  const [newNickname, setNewNickname] = useState(nickname)
  const updateUser = useUserStore(state => state.updateUser)

  // tanstack query
  const { isUpdating, mutateUpdateNickname } = useUpdateNicknameMutation({
    onSuccess: ({ name }) => {
      // 성공 로직
      showSuccessToast('닉네임 수정 완료')
      updateUser({ name })
    },
    onError: error => {
      showErrorToast(error.message)
    }
  })

  // 파생
  const isChanged = newNickname.trim() !== nickname
  const isDisabled = !newNickname.trim() || isUpdating || !isChanged

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isChanged) return
    mutateUpdateNickname(newNickname)
  }

  return {
    isDisabled,
    newNickname,
    isUpdating,
    handleSubmit,
    handleChange
  }
}
