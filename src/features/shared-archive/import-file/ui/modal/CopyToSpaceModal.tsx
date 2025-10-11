import { useArchiveFilesByFolderQuery } from '@/entities/archive/file/model/queries'
import {
  FolderData,
  useGetArchiveFoldersQuery
} from '@/entities/archive/folder'
import { useSpaceStore } from '@/entities/space'
import { SelectFileSection } from '@/features/archive/move-file'

import { useMoveFileModalState } from '@/features/archive/move-file/model/useMoveFileModalState'

import { useModalStore } from '@/shared/lib'
import { ModalLayout } from '@/shared/ui'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'
import { ChevronsRight } from 'lucide-react'
import { useCopyToSpaceAction } from '../../model/useCopyToSpaceAction'
import { useFetchAllSpacesQuery } from '../../model/queries'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import SelectSaveSpaceSection from './SelectSaveSpaceSection'

function CopyToSpaceModal() {
  const pathname = usePathname()
  const isSpacePage = pathname.includes('/space')
  const { currentSpace } = useSpaceStore()

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
  const { filesQuery } = useArchiveFilesByFolderQuery(selectedFolder!, {
    enabled: !!selectedFolder
  })
  const { spaces } = useFetchAllSpacesQuery()

  const spaceList: FolderData[] =
    spaces?.spaces
      //  권한이 ADMIN 또는 READ_WRITE인 항목만 필터링
      .filter(
        item => item.authority === 'ADMIN' || item.authority === 'READ_WRITE'
      )
      // FolderData 형태로 변환
      .map(item => ({
        folderId: item.id,
        folderName: item.name
      })) ?? []

  const filesForArchiveFolder =
    filesQuery.data?.files.map(file => ({
      id: file.dataSourceId,
      name: file.title
    })) || []

  const { handleCopyToSpace } = useCopyToSpaceAction()

  useEffect(() => {
    if (isSpacePage && currentSpace && selectedSaveFolder === null) {
      handleSelectSaveFolder(currentSpace.spaceId)
    }
  }, [isSpacePage, currentSpace, selectedSaveFolder, handleSelectSaveFolder])

  return (
    <ModalLayout size="lg">
      <div className=" w-full flex flex-col gap-2 min-h-[600px] ">
        <h1 className="text-2xl font-bold text-center">스페이스로 불러오기</h1>
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
          {/* 스페이스 영역 */}
          <SelectSaveSpaceSection
            location={'내 스페이스'}
            spaceList={spaceList}
            saveFolder={saveFolder}
            selectedSaveFolder={selectedSaveFolder}
            onFolderSelect={handleSelectSaveFolder}
          />
        </div>

        {/* 버튼 */}
        <FolderActionButtons
          onCancel={closeModal}
          onCreate={() => handleCopyToSpace(selectedSaveFolder, selectedFiles)}
          isCreating={false}
          label={'이동'}
          disabled={false}
        />
      </div>
    </ModalLayout>
  )
}
export default CopyToSpaceModal
