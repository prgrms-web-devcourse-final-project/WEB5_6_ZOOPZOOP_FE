import { DeleteConfirmModel } from '@/shared/ui/modal'
import { useLeaveSpace } from '../model/useLeaveSpace'

interface Props {
  spaceId: number
}
const LeaveSpaceModal = ({ spaceId }: Props) => {
  const {
    confirmText,
    isLeaving,
    setConfirmText,
    handleLeave,
    isDeleteEnabled
  } = useLeaveSpace()

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault()
    handleLeave(spaceId)
  }

  return (
    <DeleteConfirmModel
      title="스페이스 나가기"
      description="해당 스페이스를 나가시겠습니까?"
      confirmKeyword="탈퇴"
      confirmText={confirmText}
      onConfirmTextChange={setConfirmText}
      deleteButtonText="탈퇴"
      deletingButtonText="탈퇴 하는 중.."
      inputPlaceholder="탈퇴"
      isDeleteEnabled={isDeleteEnabled}
      isDeleting={isLeaving}
      onDelete={handleClick}
    />
  )
}
export default LeaveSpaceModal
