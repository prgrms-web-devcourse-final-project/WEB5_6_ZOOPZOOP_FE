'use client'

import { DeleteConfirmModel } from '@/shared/ui/modal'
import { useExpelMember } from '../model/useExpelMember'

interface Props {
  spaceId: number
  name: string
  memberId: number
}

const ExpelMemberModal = ({ spaceId, name, memberId }: Props) => {
  const {
    handleExpel,
    isExpelling,
    confirmText,
    isDeleteEnabled,
    setConfirmText
  } = useExpelMember()

  const handleCliCk = (e: React.FormEvent) => {
    e.preventDefault()
    handleExpel({ memberId, spaceId })
  }

  return (
    <DeleteConfirmModel
      title={`${name}님을 퇴출하시겠습니까?`}
      description=""
      confirmKeyword={name}
      onDelete={handleCliCk}
      confirmText={confirmText}
      isDeleteEnabled={isDeleteEnabled(name)}
      isDeleting={isExpelling}
      onConfirmTextChange={setConfirmText}
      deleteButtonText="퇴출"
      inputPlaceholder="퇴출"
      deletingButtonText="퇴출 중..."
    />
  )
}
export default ExpelMemberModal
