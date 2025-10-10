import { useModalStore } from '@/shared/lib'
import { ModalLayout } from '@/shared/ui'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'
import { useDeleteFileAction } from '../../model/useDeleteFileAction'

interface Props {
  dataSourceId: number[]
}
function DeleteSpaceFileModal({ dataSourceId }: Props) {
  const closeModal = useModalStore(s => s.closeModal)
  const { handleDelete } = useDeleteFileAction()

  return (
    <ModalLayout size="md">
      <h1 className="text-2xl text-gray-darker font-bold text-center">
        파일 삭제
      </h1>
      <p className="mx-auto text-base text-gray-darker  ">
        {dataSourceId.length}개의 파일이 삭제되며, 이후 복구하기 어렵습니다
      </p>

      <FolderActionButtons
        onCancel={closeModal}
        onCreate={() => {
          handleDelete(dataSourceId)
        }}
        isCreating={false}
        label={'삭제'}
        disabled={false}
      />
    </ModalLayout>
  )
}
export default DeleteSpaceFileModal
