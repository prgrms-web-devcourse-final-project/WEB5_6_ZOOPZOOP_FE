import { FolderData } from '@/entities/archive/folder'
import { SelectedFolder } from '@/features/archive/upload-file/model/type'
import { ArchiveFolder } from '@/shared/ui/modal'
import { LuFolder } from 'react-icons/lu'

interface Props {
  folderList: FolderData[]
  location: string
  saveFolder: FolderData | undefined
  selectedSaveFolder: SelectedFolder
  onFolderSelect: (folderId: number, folderName: string) => void
}

function SelectSaveFolderSection({
  folderList,
  location,
  selectedSaveFolder,
  saveFolder,
  onFolderSelect
}: Props) {
  return (
    <div className=" flex flex-col gap-2 ">
      <h2 className=" text-lg font-bold">이동할 위치 선택</h2>
      <div className="flex items-center gap-2 text-base">
        <LuFolder size={20} />
        <p>{location}</p>
      </div>
      <div className="h-[300px] overflow-y-auto box-border border-b-1">
        {folderList.map(folder => (
          <ArchiveFolder
            key={folder.folderId}
            type="folder"
            mode="move"
            data={{ id: folder.folderId, name: folder.folderName }}
            onFolderSelect={onFolderSelect}
            isSelected={selectedSaveFolder?.folderId === folder.folderId}
          />
        ))}
      </div>
      <h2 className="text-lg font-bold">선택한 폴더 위치</h2>
      <div className="h-[300px]  overflow-y-auto ">
        {saveFolder ? (
          <div className="border border-gray-light rounded-md py-3 px-3 text-base bg-gray-light">
            {location}/{saveFolder.folderName}
          </div>
        ) : (
          <p>선택한 폴더가 없습니다</p>
        )}
      </div>
    </div>
  )
}
export default SelectSaveFolderSection
