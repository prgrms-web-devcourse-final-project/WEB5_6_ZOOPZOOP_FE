'use client'

import { ModalLayout } from '@/shared/ui'
import { InputSpaceName } from './SpaceNameInput'
import { useCreateSpace } from '../model/useCreateSpace'

export const CreateSpaceModal = () => {
  const { isCreating, handleCreateSpace, inputRef } = useCreateSpace()

  return (
    <ModalLayout size="md">
      <h1 className="text-2xl font-bold">스페이스 생성</h1>
      <InputSpaceName
        inputRef={inputRef}
        onCreate={handleCreateSpace}
        isCreating={isCreating}
      />
    </ModalLayout>
  )
}
