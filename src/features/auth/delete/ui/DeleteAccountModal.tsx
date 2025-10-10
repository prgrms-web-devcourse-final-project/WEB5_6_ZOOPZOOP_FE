'use client'

import { useDeleteAccount } from '../hook/useDeleteAccount'
import { DeleteConfirmModel } from '@/shared/ui/modal'

const DeleteAccountModal = () => {
  const {
    confirmText,
    isDeleteEnabled,
    handleDelete,
    isDeleting,
    setConfirmText
  } = useDeleteAccount()
  return (
    <DeleteConfirmModel
      title="계정을 삭제하시겠습니까?"
      description=" 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다."
      confirmKeyword="계정 영구 삭제"
      onDelete={handleDelete}
      confirmText={confirmText}
      isDeleteEnabled={isDeleteEnabled}
      isDeleting={isDeleting}
      onConfirmTextChange={setConfirmText}
    />
  )
}

export default DeleteAccountModal
