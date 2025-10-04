'use client'

import { useRef } from 'react'
import { ModalLayout } from '@/shared/ui'
import useCreateSpace from '../hook/useCreateSpace'
import { InputSpaceName } from './SpaceNameInput'

export const CreateSpaceModal = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { mutate } = useCreateSpace()

  const handleCreateSpace = () => {
    if (!inputRef?.current) return

    const spaceName = inputRef.current.value.trim()
    if (!spaceName) return

    mutate(spaceName)
  }

  return (
    <ModalLayout size="md">
      <h1 className="text-2xl font-bold">스페이스 생성</h1>
      <InputSpaceName
        inputRef={inputRef}
        onCreate={handleCreateSpace}
      />
    </ModalLayout>
  )
}
