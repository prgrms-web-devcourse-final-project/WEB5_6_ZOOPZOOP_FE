import { FolderData } from '@/entities/archive/folder'
import { ArchiveFolder } from '@/shared/ui/modal'
import { LuFolder } from 'react-icons/lu'

interface Props {
  folderList: FolderData[]
  location: string
  saveFolder: FolderData | undefined
  selectedSaveFolder: number | null
  onFolderSelect: (folderId: number) => void
}

function SelectSaveFolderSection({
  folderList,
  location,
  selectedSaveFolder,
  saveFolder,
  onFolderSelect
}: Props) {
  return (
    <div className=" w-1/2 flex flex-col gap-2.5 ">
      <h2 className=" text-lg font-bold">이동할 위치 선택</h2>
      <div className="flex items-center gap-2 text-base">
        <LuFolder size={20} />
        <p>{location}</p>
      </div>
      <div className="h-[300px] overflow-y-auto mb-5">
        {folderList.map(folder => (
          <ArchiveFolder
            key={folder.folderId}
            type="folder"
            mode="move"
            data={{ id: folder.folderId, name: folder.folderName }}
            onFolderSelect={onFolderSelect}
            isSelected={selectedSaveFolder === folder.folderId}
          />
        ))}
      </div>

      <div className="w-full flex flex-col gap-2.5">
        {saveFolder && (
          <div className="border border-gray-light rounded-md py-3 px-3 text-base bg-gray-light">
            {location}/{saveFolder.folderName}
          </div>
        )}
      </div>
    </div>
  )
}
export default SelectSaveFolderSection
