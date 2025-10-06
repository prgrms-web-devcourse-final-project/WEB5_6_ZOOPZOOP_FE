import { useEditSpaceNameMutation, useSpaceStore } from '@/entities/space'
import { showErrorToast, showSuccessToast } from '@/shared/ui/toast/Toast'
import { useEffect, useState } from 'react'

export const useEditSpaceName = () => {
  const { currentSpace, updateSpace } = useSpaceStore()
  const [newName, setNewName] = useState<string>('')

  useEffect(() => {
    if (currentSpace?.spaceName) {
      setNewName(currentSpace.spaceName)
    }
  }, [currentSpace?.spaceName])

  const { mutateEditSpaceName, isUpdating } = useEditSpaceNameMutation({
    onSuccess: ({ name }) => {
      updateSpace({ spaceName: name })
      showSuccessToast(`'${name}'으로 수정 완료`)
    },
    onError: error => {
      showErrorToast(error.message)
    }
  })

  const isDisabled =
    !currentSpace ||
    !newName.trim() ||
    currentSpace.spaceName === newName.trim()

  // 핸들 채인지
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value)
  }

  const handleSubmit = () => {
    if (isDisabled) return

    mutateEditSpaceName({
      spaceId: currentSpace.spaceId,
      name: newName.trim()
    })
  }

  return {
    newName,
    isUpdating,
    isDisabled,
    onChange: handleChange,
    onSubmit: handleSubmit
  }
}
