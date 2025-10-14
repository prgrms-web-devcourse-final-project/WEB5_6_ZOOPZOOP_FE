import { SelectFileSection } from '@/features/archive/move-file'

import { ModalLayout } from '@/shared/ui'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'
import { ChevronsRight } from 'lucide-react'
import { useCopyToSpaceAction } from '../../model/useCopyToSpaceAction'
import SelectSaveSpaceSection from './SelectSaveSpaceSection'
import { useCopyToSpaceState } from '../../model/useCopyToSpaceState'

function CopyToSpaceModal() {
  const { handleCopyToSpace, idPending } = useCopyToSpaceAction()
  const {
    spaceList,
    folderList,
    filesForArchiveFolder,
    saveFolder,
    selectedFolder,
    selectedSaveFolder,
    selectedFiles,
    handleSelectFolder,
    handleSelectSaveFolder,
    onSelectFiles
  } = useCopyToSpaceState()

  return (
    <ModalLayout size="lg">
      <div className=" w-full flex flex-col gap-2 min-h-[600px]  ">
        <h1 className="text-2xl text-gray-darker font-bold text-center">
          스페이스로 불러오기
        </h1>
        <div className="flex justify-between">
          {/* 파일 위치 */}
          <div className="w-1/2 h-[600px] flex flex-col gap-2.5 overflow-hidden box-border">
            <SelectFileSection
              folderList={folderList!}
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
            {/* 스페이스 영역 */}
            <SelectSaveSpaceSection
              location={'내 스페이스'}
              spaceList={spaceList}
              saveFolder={saveFolder}
              selectedSaveFolder={selectedSaveFolder!}
              onFolderSelect={handleSelectSaveFolder}
            />
          </div>
        </div>

        {/* 버튼 */}
        <FolderActionButtons
          onCreate={() =>
            handleCopyToSpace(selectedSaveFolder?.folderId ?? 0, selectedFiles)
          }
          isCreating={idPending}
          label={'이동'}
          disabled={!selectedSaveFolder?.folderId}
        />
      </div>
    </ModalLayout>
  )
}
export default CopyToSpaceModal
