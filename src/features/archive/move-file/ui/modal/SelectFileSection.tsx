import { FolderData } from '@/entities/archive/folder'
import { ArchiveFolder } from '@/shared/ui/modal'
import { LuFolder } from 'react-icons/lu'
import { SelectedFile } from '../../model/type'
import { SelectedFolder } from '@/features/archive/upload-file/model/type'

interface Props {
  folderList: FolderData[]
  filesForArchiveFolder?: {
    id: number
    name: string
  }[]
  selectedFiles: SelectedFile[]
  archiveFolderType: 'folder' | 'file'
  onFolderSelect: (folderId: number, folderName: string) => void
  onFileSelect?: ({
    folderId,
    folderName,
    fileId,
    fileName
  }: {
    folderId: number
    folderName: string
    fileId: number
    fileName: string
  }) => void
  selectedFolder: SelectedFolder
}

function SelectFileSection({
  folderList,
  filesForArchiveFolder,
  archiveFolderType,
  selectedFiles,
  selectedFolder,
  onFolderSelect,
  onFileSelect
}: Props) {
  const totalSelectedFile = selectedFiles.reduce(
    (acc, folder) => acc + folder.files.length,
    0
  )
  return (
    <div className=" flex flex-col gap-2 ">
      <h2 className="text-lg font-bold">이동할 파일 선택</h2>

      <div className="flex items-center gap-2 text-base">
        <LuFolder size={20} />
        <p>내 아카이브</p>
      </div>
      <div className="h-[300px] overflow-y-auto box-border border-b-1">
        {folderList?.map(folder => (
          <ArchiveFolder
            key={folder.folderId}
            type={archiveFolderType}
            mode="select"
            data={{
              id: folder.folderId,
              name: folder.folderName,
              children: filesForArchiveFolder
            }}
            selectedFiles={selectedFiles}
            onFolderSelect={onFolderSelect}
            onFileSelect={onFileSelect}
            isSelected={selectedFolder.folderId === folder.folderId}
          />
        ))}
      </div>

      <h2 className="text-lg font-bold">선택한 파일: {totalSelectedFile}개</h2>
      {/* 선택된 파일 경로 */}
      <div className="h-[200px]  overflow-y-auto ">
        {selectedFiles.length > 0 ? (
          selectedFiles.map((folderItem, folderIdx) =>
            folderItem.files.map((fileItem, fileIdx) => (
              <div
                key={`${folderIdx}-${fileIdx}`}
                className="flex border border-gray-light rounded-md py-3 px-3 mb-2 text-base bg-gray-light
                    whitespace-nowrap overflow-hidden text-ellipsis">
                <p className="truncate">
                  {folderItem.folderName}/{fileItem.fileName}
                </p>
              </div>
            ))
          )
        ) : (
          <p>선택한 파일이 없습니다</p>
        )}
      </div>
    </div>
  )
}
export default SelectFileSection
