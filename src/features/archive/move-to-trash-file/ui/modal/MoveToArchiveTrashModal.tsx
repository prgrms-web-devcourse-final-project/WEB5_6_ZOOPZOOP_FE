'use client'

import { useArchiveFilesByFolderQuery } from '@/entities/archive/file/model/queries'
import { useGetArchiveFoldersQuery } from '@/entities/archive/folder'
import { useMoveFileModalState } from '@/features/archive/move-file/model/useMoveFileModalState'
import { useModalStore } from '@/shared/lib'
import { ModalLayout } from '@/shared/ui'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'
import { ChevronsRight, Trash2 } from 'lucide-react'
import { useMoveToTrashArchiveFilesQuery } from '../../model/queries'
import { showSuccessToast } from '@/shared/ui/toast/Toast'
import { SelectFileSection } from '@/features/archive/move-file'
import { useRouter } from 'next/navigation'
import ModalLoading from '@/shared/ui/loading/ModalLoading'

function MoveToArchiveTrashModal() {
  const router = useRouter()
  const { selectedFolder, selectedFiles, handleSelectFolder, onSelectFiles } =
    useMoveFileModalState()

  const closeModal = useModalStore(s => s.closeModal)
  const { moveToTrash, isPending } = useMoveToTrashArchiveFilesQuery()
  const { foldersQuery } = useGetArchiveFoldersQuery()
  const folderList = foldersQuery.data?.data || []

  // 선택한 폴더에 대한 파일 조회
  const { filesQuery } = useArchiveFilesByFolderQuery(selectedFolder.folderId, {
    enabled: !!selectedFolder
  })

  const filesForArchiveFolder =
    filesQuery.data?.files.map(file => ({
      id: file.dataSourceId,
      name: file.title
    })) || []

  const handleMoveToTrash = () => {
    const fileIdList = selectedFiles.flatMap(folder =>
      folder.files.map(file => file.fileId)
    )
    moveToTrash.mutate(fileIdList, {
      onSuccess: () => {
        showSuccessToast('파일 휴지통으로 이동')

        closeModal()

        router.push('/archive/trash')
      }
    })
  }

  return (
    <ModalLayout size="lg">
      <div className=" w-full flex flex-col gap-2 min-h-[600px] ">
        <h1 className="text-2xl text-gray-darker font-bold text-center">
          파일 임시 삭제
        </h1>
        <p className="mx-auto text-base text-gray-darker  ">
          선택한 파일은 휴지통으로 이동됩니다.
        </p>

        {!isPending ? (
          <>
            <div className="flex justify-between">
              {/* 파일 위치 */}
              <div className="w-1/2 flex flex-col gap-2.5 ">
                <SelectFileSection
                  folderList={folderList}
                  filesForArchiveFolder={filesForArchiveFolder}
                  archiveFolderType={'file'}
                  selectedFiles={selectedFiles}
                  selectedFolder={selectedFolder}
                  onFolderSelect={handleSelectFolder}
                  onFileSelect={onSelectFiles}
                />
              </div>
              <div className="flex items-center">
                <ChevronsRight
                  size={50}
                  className="text-green-normal"
                />
              </div>
              <div className="w-1/2 flex flex-col items-center justify-center">
                <Trash2
                  size={80}
                  className="text-gray-normal"
                />
                <p className="text-xl">휴지통</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center  min-h-[500px] ">
            <ModalLoading />
          </div>
        )}

        {/* 버튼 */}
        <FolderActionButtons
          onCreate={handleMoveToTrash}
          isCreating={isPending}
          label={'이동'}
          disabled={selectedFiles.length === 0}
        />
      </div>
    </ModalLayout>
  )
}
export default MoveToArchiveTrashModal
