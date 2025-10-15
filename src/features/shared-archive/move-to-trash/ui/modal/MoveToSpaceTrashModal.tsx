import { useSpaceFilesByFolderQuery } from '@/entities/shared-archive/model/queries'
import { useSpaceStore } from '@/entities/space'
import { ModalLayout } from '@/shared/ui'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'
import { useMoveToSpaceTrashAction } from '../../model/useMoveToSpaceTrashAction'
import ModalLoading from '@/shared/ui/loading/ModalLoading'

interface Props {
  dataSourceId: number[]
}

function MoveToSpaceTrashModal({ dataSourceId }: Props) {
  const { currentSpace } = useSpaceStore()
  const spaceId = currentSpace!.spaceId
  const { data, isLoading } = useSpaceFilesByFolderQuery(spaceId)
  const selectedFiles =
    data?.files?.filter(file =>
      dataSourceId.includes(Number(file.dataSourceId))
    ) ?? []

  const { handleMoveToTrash, isPending } = useMoveToSpaceTrashAction()

  return (
    <ModalLayout size="md">
      <div className=" w-full flex flex-col gap-2 ">
        <h1 className="text-2xl text-gray-darker font-bold text-center">
          파일 임시 삭제
        </h1>
        {!isPending ? (
          <>
            <p className="mx-auto text-base text-gray-darker  ">
              <span className="font-bold"> {dataSourceId.length}개</span>의
              파일이 휴지통으로 이동됩니다.
            </p>

            <div className="w-full flex flex-col gap-2.5 max-h-[40vh] overflow-y-auto">
              {!isLoading ? (
                selectedFiles &&
                selectedFiles.map((item, index) => (
                  <div
                    key={item.dataSourceId}
                    className="min-h-12 flex items-center border border-gray-light rounded-md px-3 text-base bg-gray-light truncate">
                    {index + 1}. {item.title}
                  </div>
                ))
              ) : (
                <div className=" w-full flex justify-center items-center  min-h-[35vh] ">
                  <ModalLoading />
                </div>
              )}
            </div>
          </>
        ) : (
          <ModalLoading />
        )}

        {/* 버튼 */}
        <FolderActionButtons
          onCreate={() => {
            handleMoveToTrash({
              spaceId: spaceId,
              dataSourceId: dataSourceId
            })
          }}
          isCreating={isPending}
          label={'이동'}
          disabled={false}
        />
      </div>
    </ModalLayout>
  )
}
export default MoveToSpaceTrashModal
