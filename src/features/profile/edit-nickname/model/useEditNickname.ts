import { useUserStore } from '@/entities/user'
import { useUpdateNicknameMutation } from '@/entities/user/model/queries'
import { useState } from 'react'

export const useUpdateNickname = (nickname: string) => {
  const [newNickname, setNewNickname] = useState(nickname)
  const updateUser = useUserStore(state => state.updateUser)

  // tanstack query
  const { isUpdating, updateNickname } = useUpdateNicknameMutation({
    onSuccess: ({ name }) => {
      // 성공 로직
      updateUser({ name })
    },
    onError: () => {
      // 실패 로직
    }
  })

  // 파생
  const isChanged = newNickname.trim() !== nickname
  const isDisabled = isUpdating || !isChanged

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value)
  }

  const handleEditNickname = () => {
    if (!isChanged) return
    updateNickname(newNickname)
  }

  return {
    isDisabled,
    newNickname,
    isUpdating,
    onEditNickname: handleEditNickname,
    onChange: handleChange
  }
}
