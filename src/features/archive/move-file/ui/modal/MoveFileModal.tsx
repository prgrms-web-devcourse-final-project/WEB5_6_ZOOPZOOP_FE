'use client'

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

  const { foldersQuery } = useGetArchiveFoldersQuery()
  const folderList = foldersQuery.data?.data || []
  const saveFolder = folderList.find(
    f => f.folderId === selectedSaveFolder?.folderId
  )

  // 선택한 폴더에 대한 파일 조회
  const { filesQuery } = useArchiveFilesByFolderQuery(selectedFolder.folderId, {
    enabled: !!selectedFolder
  })
  const { handleMoveFiles, isPending } = useMoveFileAction()

  const filesForArchiveFolder =
    filesQuery.data?.files.map(file => ({
      id: file.dataSourceId,
      name: file.title
    })) || []

  // api 연동

  return (
    <ModalLayout size="lg">
      <div className=" w-full flex flex-col gap-5 min-h-[600px] ">
        <h1 className="text-2xl font-bold text-center">파일 이동</h1>
        <div className="flex justify-between">
          {/* 파일 위치 */}
          <div className="w-1/2 h-[600px] flex flex-col gap-2.5 overflow-hidden box-border">
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

          <div className="w-1/2 h-[600px] flex flex-col gap-2.5 overflow-hidden box-border">
            <SelectSaveFolderSection
              location="내 아카이브"
              folderList={folderList}
              saveFolder={saveFolder}
              selectedSaveFolder={selectedSaveFolder!}
              onFolderSelect={handleSelectSaveFolder}
            />
          </div>
        </div>

        {/* 버튼 */}
        <FolderActionButtons
          onCreate={() => handleMoveFiles(selectedFiles, selectedSaveFolder!)}
          isCreating={isPending}
          label={'이동'}
          disabled={!saveFolder}
        />
      </div>
    </ModalLayout>
  )
}
