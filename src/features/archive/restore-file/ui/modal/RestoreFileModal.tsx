import { ModalLayout } from '@/shared/ui'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'
import { useRestoreFileAction } from '../../model/useRestoreFileAction'
import { CheckedFile } from '@/features/archive/move-file/model/type'

interface Props {
  selectedFiles: CheckedFile[]
}
function RestoreFileModal({ selectedFiles }: Props) {
  const { handelRestore, isPending } = useRestoreFileAction()
  const selectedFilesId = selectedFiles.map(item => item.dataSourceId)
  return (
    <ModalLayout size="md">
      <h1 className="text-2xl text-gray-darker font-bold text-center">
        파일 복구
      </h1>
      <p className="mx-auto text-base text-gray-darker  ">
        <span className="font-bold"> {selectedFilesId.length}개</span>의 파일이
        복구됩니다.
      </p>

      <div className="w-full flex flex-col gap-2.5 max-h-[40vh] overflow-y-auto">
        {selectedFiles &&
          selectedFiles.map(item => (
            <div
              key={item.dataSourceId}
              className="min-h-12 flex items-center border border-gray-light rounded-md px-3 text-base bg-gray-light truncate">
              {item.fileName}
            </div>
          ))}
      </div>

      <FolderActionButtons
        onCreate={() => handelRestore(selectedFilesId)}
        isCreating={isPending}
        label={'복구'}
        disabled={false}
      />
    </ModalLayout>
  )
}
export default RestoreFileModal
