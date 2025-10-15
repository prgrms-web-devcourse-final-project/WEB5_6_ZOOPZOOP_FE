import { ModalLayout } from '@/shared/ui'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'
import { useRestoreSpaceFileAction } from '../../model/useRestoreSpaceFileAction'
import { useSpaceStore } from '@/entities/space'
import { useSpaceFilesByFolderQuery } from '@/entities/shared-archive/model/queries'
import ModalLoading from '@/shared/ui/loading/ModalLoading'
import { CheckedFile } from '@/features/archive/move-file/model/type'

interface Props {
  selectedFiles: CheckedFile[]
}
function RestoreSpaceFileModal({ selectedFiles }: Props) {
  const { currentSpace } = useSpaceStore()
  const spaceId = currentSpace!.spaceId

  const selectedFilesId = selectedFiles.map(item => item.dataSourceId)

  const { handelRestore, isPending } = useRestoreSpaceFileAction()

  return (
    <ModalLayout size="md">
      <h1 className="text-2xl text-gray-darker font-bold text-center">
        파일 복구
      </h1>
      <p className="mx-auto text-base text-gray-darker  ">
        <span className="font-bold"> {selectedFilesId.length}개</span>의 파일이
        복구됩니다.
      </p>
      {!isPending ? (
        <div className="w-full flex flex-col gap-2.5 max-h-[40vh] overflow-y-auto">
          {selectedFiles.map(item => (
            <div
              key={item.dataSourceId}
              className="min-h-12 flex items-center border border-gray-light rounded-md px-3 text-base bg-gray-light truncate">
              {item.fileName}
            </div>
          ))}
        </div>
      ) : (
        <div className=" w-full flex justify-center items-center  min-h-[35vh] ">
          <ModalLoading />
        </div>
      )}

      <FolderActionButtons
        onCreate={() =>
          handelRestore({ spaceId, dataSourceId: selectedFilesId })
        }
        isCreating={isPending}
        label={'복구'}
        disabled={false}
      />
    </ModalLayout>
  )
}
export default RestoreSpaceFileModal
