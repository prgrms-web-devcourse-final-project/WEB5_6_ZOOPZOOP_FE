import { useEditSpaceNameMutation } from '@/entities/space/model/queries'
import { useSpaceStore } from '@/entities/space/model/store'
import { useEffect, useState } from 'react'

export const useEditSpaceName = () => {
  const { currentSpace, updateSpace } = useSpaceStore()
  const [newName, setNewName] = useState<string>('')

  useEffect(() => {
    if (currentSpace?.spaceName) {
      setNewName(currentSpace.spaceName)
    }
  }, [currentSpace?.spaceName])

  const { editSpaceName, isUpdating } = useEditSpaceNameMutation({
    onSuccess: ({ name }) => {
      updateSpace({ spaceName: name })
    },
    onError: () => {}
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

    editSpaceName({
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
