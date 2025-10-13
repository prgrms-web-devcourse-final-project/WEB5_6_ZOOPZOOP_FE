import { useCopyToSpaceAction } from '../../model/useCopyToSpaceAction'
import { ModalLayout } from '@/shared/ui'
import { SelectFileSection } from '@/features/archive'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'
import { useMoveFileModalState } from '@/features/archive/move-file/model/useMoveFileModalState'
import { useArchiveFilesByFolderQuery } from '@/entities/archive/file/model/queries'
import { useSpaceStore } from '@/entities/space'

function ImportToSpaceModal() {
  const { currentSpace } = useSpaceStore()
  const spaceId = currentSpace!.spaceId
  const {
    folderList,
    selectedFolder,
    selectedFiles,
    handleSelectFolder,
    onSelectFiles
  } = useMoveFileModalState()

  const { handleCopyToSpace, idPending } = useCopyToSpaceAction()

  const { filesQuery } = useArchiveFilesByFolderQuery(
    selectedFolder.folderId!,
    {
      enabled: !!selectedFolder
    }
  )
  const filesForArchiveFolder =
    filesQuery.data?.files.map(file => ({
      id: file.dataSourceId,
      name: file.title
    })) || []

  return (
    <ModalLayout size="md">
      <div className=" w-full flex flex-col gap-2 min-h-[600px]  ">
        <h1 className="text-2xl text-gray-darker font-bold text-center">
          스페이스로 불러오기
        </h1>
        <div className="flex">
          {/* 파일 위치 */}
          <div className=" h-[600px] flex flex-col gap-2.5 overflow-hidden box-border">
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
        </div>

        {/* 버튼 */}
        <FolderActionButtons
          onCreate={() => handleCopyToSpace(spaceId, selectedFiles)}
          isCreating={idPending}
          label={'불러오기'}
          disabled={false}
        />
      </div>
    </ModalLayout>
  )
}
export default ImportToSpaceModal
