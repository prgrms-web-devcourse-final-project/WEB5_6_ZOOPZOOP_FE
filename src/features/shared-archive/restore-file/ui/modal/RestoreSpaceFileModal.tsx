import { ModalLayout } from '@/shared/ui'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'
import { useRestoreSpaceFileAction } from '../../model/useRestoreSpaceFileAction'
import { useSpaceStore } from '@/entities/space'
import { useSpaceFilesByFolderQuery } from '@/entities/shared-archive/model/queries'
import ModalLoading from '@/shared/ui/loading/ModalLoading'

interface Props {
  dataSourceId: number[]
}
function RestoreSpaceFileModal({ dataSourceId }: Props) {
  const { currentSpace } = useSpaceStore()
  const spaceId = currentSpace!.spaceId

  const { data, isLoading } = useSpaceFilesByFolderQuery(spaceId)
  const selectedFiles =
    data?.files?.filter(file =>
      dataSourceId.filter(item => item === file.dataSourceId)
    ) ?? []
  const { handelRestore, isPending } = useRestoreSpaceFileAction()

  return (
    <ModalLayout size="md">
      <h1 className="text-2xl text-gray-darker font-bold text-center">
        파일 복구
      </h1>
      <p className="mx-auto text-base text-gray-darker  ">
        <span className="font-bold"> {dataSourceId.length}개</span>의 파일이
        복구됩니다.
      </p>
      {!isPending ? (
        <div className="w-full flex flex-col gap-2.5 max-h-[40vh] overflow-y-auto">
          {!isLoading ? (
            selectedFiles.map(item => (
              <div
                key={item.dataSourceId}
                className="min-h-12 flex items-center border border-gray-light rounded-md px-3 text-base bg-gray-light truncate">
                {item.title}
              </div>
            ))
          ) : (
            <div className="flex items-center">
              <ModalLoading />
            </div>
          )}
        </div>
      ) : (
        <ModalLoading />
      )}

      <FolderActionButtons
        onCreate={() => handelRestore({ spaceId, dataSourceId })}
        isCreating={isPending}
        label={'복구'}
        disabled={false}
      />
    </ModalLayout>
  )
}
export default RestoreSpaceFileModal
