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
      title="스페이스 탈퇴"
      description="탈퇴하면 스페이스의 데이터에 접근할 수 없습니다."
      confirmKeyword="탈퇴"
      confirmText={confirmText}
      onConfirmTextChange={setConfirmText}
      deleteButtonText="탈퇴"
      deletingButtonText="탈퇴 중..."
      inputPlaceholder="탈퇴"
      isDeleteEnabled={isDeleteEnabled}
      isDeleting={isLeaving}
      onDelete={handleClick}
    />
  )
}
export default LeaveSpaceModal
