import { useModalStore } from '@/shared/lib'
import { ModalLayout } from '@/shared/ui'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'
import { useRestoreSpaceFileAction } from '../../model/useRestoreSpaceFileAction'
import { useSpaceStore } from '@/entities/space'
import { useSpaceFilesByFolderQuery } from '@/entities/shared-archive/model/queries'

interface Props {
  dataSourceId: number[]
}
function RestoreSpaceFileModal({ dataSourceId }: Props) {
  const closeModal = useModalStore(s => s.closeModal)

  const { currentSpace } = useSpaceStore()
  const spaceId = currentSpace!.spaceId

  const { data } = useSpaceFilesByFolderQuery(spaceId)
  const { handelRestore } = useRestoreSpaceFileAction()
  const selectedFiles =
    data?.files?.filter(file =>
      dataSourceId.includes(Number(file.dataSourceId))
    ) ?? []

  return (
    <ModalLayout size="md">
      <h1 className="text-2xl text-gray-darker font-bold text-center">
        파일 복구
      </h1>
      <p className="mx-auto text-base text-gray-darker  ">
        <span className="font-bold"> {dataSourceId.length}개</span>의 파일이
        복구됩니다.
      </p>

      <div className="w-full flex flex-col gap-2.5 max-h-[40vh] overflow-y-auto">
        {selectedFiles &&
          selectedFiles.map((item, index) => (
            <div
              key={item.dataSourceId}
              className="min-h-12 flex items-center border border-gray-light rounded-md px-3 text-base bg-gray-light truncate">
              {index + 1}. {item.title}
            </div>
          ))}
      </div>
      <FolderActionButtons
        onCancel={closeModal}
        onCreate={() => handelRestore({ spaceId, dataSourceId })}
        isCreating={false}
        label={'복구'}
        disabled={false}
      />
    </ModalLayout>
  )
}
export default RestoreSpaceFileModal
