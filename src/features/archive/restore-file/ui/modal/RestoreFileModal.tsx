import { useModalStore } from '@/shared/lib'
import { ModalLayout } from '@/shared/ui'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'
import { useRestoreFileAction } from '../../model/useRestoreFileAction'

interface Props {
  dataSourceId: number[]
}
function RestoreFileModal({ dataSourceId }: Props) {
  const closeModal = useModalStore(s => s.closeModal)
  const { handelRestore } = useRestoreFileAction()
  return (
    <ModalLayout size="md">
      <h1 className="text-2xl text-gray-darker font-bold text-center">
        파일 복구
      </h1>
      <p className="mx-auto text-base text-gray-darker  ">
        {dataSourceId.length}개의 데이터가 이전 폴더로 복구됩니다.
      </p>
      {/* 선택된 파일 리스트 */}
      <FolderActionButtons
        onCancel={closeModal}
        onCreate={() => handelRestore(dataSourceId)}
        isCreating={false}
        label={'복구'}
        disabled={false}
      />
    </ModalLayout>
  )
}
export default RestoreFileModal
