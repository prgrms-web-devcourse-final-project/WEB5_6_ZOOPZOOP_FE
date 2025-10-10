'use client'

import { Button } from '@/shared/ui/shadcn/button'
import { Trash2 } from 'lucide-react'
import { useModalStore } from '@/shared/lib'

interface Props {
  memberId: number
  disabled: boolean
  spaceId: number
  name: string
}

const DeleteMemberButton = ({ memberId, disabled, spaceId, name }: Props) => {
  const openModal = useModalStore(state => state.openModal)

  const handleCliCk = () => {
    openModal({ type: 'expel-member', props: { memberId, name, spaceId } })
  }

  return (
    <Button
      disabled={disabled}
      size="sm"
      className="bg-red-500 hover:bg-red-400"
      onClick={handleCliCk}>
      <Trash2 />
    </Button>
  )
}
export default DeleteMemberButton
