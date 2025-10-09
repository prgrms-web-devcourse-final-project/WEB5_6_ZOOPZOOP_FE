'use client'

import { useSpaceStore } from '@/entities/space'
import { AUTHORITIES } from '@/shared/constants'
import { useModalStore } from '@/shared/lib'
import { Button } from '@/shared/ui/shadcn/button'
import { Users2 } from 'lucide-react'

const AddMemberButton = () => {
  const currentSpace = useSpaceStore(state => state.currentSpace)
  const openModal = useModalStore(state => state.openModal)

  const isOwner = currentSpace?.userAuthority === AUTHORITIES.ADMIN

  const handleOpenModal = () => {
    if (!currentSpace) return
    openModal({ type: 'add-member', props: { spaceId: currentSpace.spaceId } })
  }

  return (
    <Button
      disabled={!isOwner}
      size="sm"
      onClick={handleOpenModal}>
      <Users2 /> Add Member
    </Button>
  )
}
export default AddMemberButton
