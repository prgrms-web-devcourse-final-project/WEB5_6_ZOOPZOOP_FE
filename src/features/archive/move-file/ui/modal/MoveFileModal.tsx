'use client'

import { LuFolder } from 'react-icons/lu'
import { useModalStore } from '@/shared/lib'
import { useArchiveFilesByFolderQuery } from '@/entities/archive/file/model/queries'
import { useGetArchiveFoldersQuery } from '@/entities/archive/folder'
import { ChevronsRight } from 'lucide-react'
import { ModalLayout } from '@/shared/ui'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'

import SelectFileSection from './SelectFileSection'
import SelectSaveFolderSection from './SelectSaveFolderSection'
import { useMoveFileModalState } from '../../model/useMoveFileModalState'
import { useMoveFileAction } from '../../model/useMoveFileAction'

export const MoveFileModal = () => {
  const {
    selectedFolder,
    selectedSaveFolder,
    selectedFiles,
    handleSelectFolder,
    handleSelectSaveFolder,
    onSelectFiles
  } = useMoveFileModalState()

  const closeModal = useModalStore(s => s.closeModal)
  const { foldersQuery } = useGetArchiveFoldersQuery()
  const folderList = foldersQuery.data?.data || []
  const saveFolder = folderList.find(f => f.folderId === selectedSaveFolder)

  // 선택한 폴더에 대한 파일 조회
  const { filesQuery } = useArchiveFilesByFolderQuery(selectedFolder!, {
    enabled: !!selectedFolder
  })
  const { handleMoveFiles } = useMoveFileAction()

  const filesForArchiveFolder =
    filesQuery.data?.files.map(file => ({
      id: file.dataSourceId,
      name: file.title
    })) || []

  // api 연동

  return (
    <ModalLayout size="lg">
      <div className=" w-full flex flex-col gap-2 min-h-[600px] ">
        <h1 className="text-2xl font-bold text-center">파일 이동</h1>
        <div className="flex justify-between">
          {/* 파일 위치 */}
          <div className=" w-1/2 flex flex-col gap-2.5 ">
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
          <SelectSaveFolderSection
            folderList={folderList}
            saveFolder={saveFolder}
            selectedSaveFolder={selectedSaveFolder}
            onFolderSelect={handleSelectSaveFolder}
          />
        </div>

        {/* 버튼 */}
        <FolderActionButtons
          onCancel={closeModal}
          onCreate={() => handleMoveFiles(selectedFiles)}
          isCreating={false}
          label={'이동'}
          disabled={!saveFolder}
        />
      </div>
    </ModalLayout>
  )
}
