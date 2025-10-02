'use client'

import { useRef, useState } from 'react'

import { CreateModalHeader } from './CreateSpaceHeader'
import { InputSpaceName } from './SpaceNameInput'
import { InviteMember } from './MemberInvitation'
import { ModalLayout } from '@/shared/ui'
import useCreateSpace from '../hook/useCreateSpace'

export const CreateSpaceModal = ({
  initialStep = 1
}: {
  initialStep?: number
}) => {
  const [step, setStep] = useState(initialStep)

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
      <CreateModalHeader step={step} />
      {step === 1 && (
        <InputSpaceName
          setStep={setStep}
          inputRef={inputRef}
          onCreate={handleCreateSpace}
        />
      )}
      {step === 2 && <InviteMember />}
    </ModalLayout>
  )
}
