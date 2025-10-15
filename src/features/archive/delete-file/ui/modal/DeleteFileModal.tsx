import { ModalLayout } from '@/shared/ui'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'
import { useDeleteFileAction } from '../../model/useDeleteFileAction'
import { CheckedFile } from '@/features/archive/move-file/model/type'
import ModalLoading from '@/shared/ui/loading/ModalLoading'

interface Props {
  selectedFiles: CheckedFile[]
}
function DeleteFileModal({ selectedFiles }: Props) {
  const { handleDelete, isPending } = useDeleteFileAction()
  const selectedFilesId = selectedFiles.map(item => item.dataSourceId)

  return (
    <ModalLayout size="md">
      <h1 className="text-2xl text-gray-darker font-bold text-center">
        파일 삭제
      </h1>
      {!isPending ? (
        <>
          <div className="flex flex-col items-center ">
            <p>
              <span className="font-bold text-base">
                {selectedFiles.length}개
              </span>
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
                  {item.fileName}
                </div>
              ))}
          </div>
        </>
      ) : (
        <ModalLoading />
      )}

      <FolderActionButtons
        onCreate={() => {
          handleDelete(selectedFilesId)
        }}
        isCreating={isPending}
        label={'삭제'}
        disabled={false}
      />
    </ModalLayout>
  )
}
export default DeleteFileModal
