import { useModalStore } from '@/shared/lib'
import { ModalLayout } from '@/shared/ui'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'
import { useDeleteFolderAction } from '../model/useDeleteFolderAction'

interface Props {
  folderId: number
  folderName: string
}

function DeleteFolderModal({ folderId, folderName }: Props) {
  const closeModal = useModalStore(s => s.closeModal)
  const { handleDelete, isPending } = useDeleteFolderAction()

  return (
    <ModalLayout size="md">
      <h1 className="text-2xl text-gray-darker font-bold text-center">
        폴더 삭제
      </h1>
      <p className="mx-auto text-base text-gray-darker  ">
        <span className="text-red-600">{folderName}</span> 폴더가 삭제되며, 삭제
        후 복구하기 어렵습니다.
      </p>

      <FolderActionButtons
        onCancel={closeModal}
        onCreate={() => handleDelete(folderId)}
        isCreating={isPending}
        label={'삭제'}
        disabled={false}
      />
    </ModalLayout>
  )
}
export default DeleteFolderModal
