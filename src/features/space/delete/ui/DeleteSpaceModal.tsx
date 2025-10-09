'use client'

interface Props {
  spaceId: number
  title: string
}

import { DeleteConfirmModel } from '@/shared/ui/modal'
import { useDeleteSpace } from '../model/useDeleteSpace'

const DeleteAccountModal = ({ spaceId, title }: Props) => {
  const {
    isDeleting,
    handleDelete,
    confirmText,
    setConfirmText,
    isDeleteEnabled
  } = useDeleteSpace(spaceId)

  return (
    <DeleteConfirmModel
      // 모달 텍스트 설정
      title="스페이스 영구 삭제"
      description="  모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다."
      confirmKeyword={title}
      // 상태와 핸들러 연결
      confirmText={confirmText}
      onConfirmTextChange={setConfirmText}
      onDelete={handleDelete}
      isDeleteEnabled={isDeleteEnabled(title)}
      isDeleting={isDeleting}
    />
  )
}

export default DeleteAccountModal
