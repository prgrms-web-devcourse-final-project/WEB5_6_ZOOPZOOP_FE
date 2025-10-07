import { FolderData } from '@/entities/archive/folder'
import { ArchiveFolder } from '@/shared/ui/modal'
import { LuFolder } from 'react-icons/lu'
import { SelectedFile } from '../../model/type'

interface Props {
  folderList: FolderData[]
  filesForArchiveFolder?: {
    id: number
    name: string
  }[]
  selectedFiles: SelectedFile[]
  archiveFolderType: 'folder' | 'file'
  onFolderSelect: (folderId: number) => void
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
  selectedFolder: number | null
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
  return (
    <div className=" flex flex-col gap-2.5 ">
      <h2 className="text-lg font-bold">이동할 파일 선택</h2>
      <div className="flex items-center gap-2 text-base">
        <LuFolder size={20} />
        <p>내 아카이브</p>
      </div>
      <div className="h-[300px] overflow-y-auto mb-5">
        {folderList.map(folder => (
          <ArchiveFolder
            key={folder.folderId}
            type={archiveFolderType}
            mode="select"
            data={{
              id: folder.folderId,
              name: folder.folderName,
              children: filesForArchiveFolder
            }}
            onFolderSelect={onFolderSelect}
            onFileSelect={onFileSelect}
            isSelected={selectedFolder === folder.folderId}
          />
        ))}
      </div>

      {/* 선택된 파일 경로 */}
      <div className="h-[200px]  overflow-y-auto ">
        {selectedFiles.map((folderItem, folderIdx) =>
          folderItem.files.map((fileItem, fileIdx) => (
            <div
              key={`${folderIdx}-${fileIdx}`}
              className="flex border border-gray-light rounded-md py-3 px-3 mb-2 text-base bg-gray-light
                    whitespace-nowrap overflow-hidden text-ellipsis">
              <p className="truncate">
                내 아카이브/{folderItem.folderName}/{fileItem.fileName}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
export default SelectFileSection
