'use client'

import { useState } from 'react'
import { ModalLayout } from '../ModalLayout'

import { CreateModalHeader } from './CreateSpaceHeader'
import { InputSpaceName } from './SpaceNameInput'
import { InviteMember } from './MemberInvitation'

export const CreateSpaceModal = ({
  initialStep = 1
}: {
  initialStep?: number
}) => {
  const [step, setStep] = useState(initialStep)
  return (
    <ModalLayout size="md">
      <CreateModalHeader step={step} />
      {step === 1 && <InputSpaceName setStep={setStep} />}
      {step === 2 && <InviteMember />}
    </ModalLayout>
  )
}
