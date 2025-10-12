import { useModalStore } from '@/shared/lib'
import { ModalLayout } from '@/shared/ui'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'
import { useDeleteFileAction } from '../../model/useDeleteFileAction'
import { useSpaceStore } from '@/entities/space'
import { useSpaceFilesByFolderQuery } from '@/entities/shared-archive/model/queries'

interface Props {
  dataSourceId: number[]
}
function DeleteSpaceFileModal({ dataSourceId }: Props) {
  const closeModal = useModalStore(s => s.closeModal)
  const { currentSpace } = useSpaceStore()
  const spaceId = currentSpace!.spaceId
  const { handleDelete, isPending } = useDeleteFileAction()
  const { data } = useSpaceFilesByFolderQuery(spaceId)
  const selectedFiles =
    data?.files?.filter(file =>
      dataSourceId.includes(Number(file.dataSourceId))
    ) ?? []

  return (
    <ModalLayout size="md">
      <div className=" w-full flex flex-col gap-2 items-center ">
        <h1 className="text-2xl text-gray-darker font-bold text-center">
          파일 삭제
        </h1>

        <div className="flex flex-col items-center ">
          <p>
            <span className="font-bold text-base">{dataSourceId.length}개</span>
            의 파일이 삭제됩니다
          </p>
          <p className="text-red-500 text-base">
            삭제 후에는 복구하기 어렵습니다
          </p>
        </div>

        <div className="w-full flex flex-col gap-2.5 max-h-[40vh] overflow-y-auto">
          {selectedFiles &&
            selectedFiles.map(item => (
              <div
                key={item.dataSourceId}
                className="min-h-12 flex items-center border border-gray-light rounded-md px-3 text-base bg-gray-light truncate">
                {item.title}
              </div>
            ))}
        </div>

        {/* 삭제 파일 리스트  */}
        <FolderActionButtons
          onCancel={closeModal}
          onCreate={() => {
            handleDelete({ spaceId: spaceId, dataSourceId })
          }}
          isCreating={isPending}
          label={'삭제'}
          disabled={false}
        />
      </div>
    </ModalLayout>
  )
}
export default DeleteSpaceFileModal
