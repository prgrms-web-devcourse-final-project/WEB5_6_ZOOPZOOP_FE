import { FolderData } from '@/entities/archive/folder'
import { SelectedFolder } from '@/features/archive/upload-file/model/type'
import { ArchiveFolder } from '@/shared/ui/modal'
import { FolderOpen } from 'lucide-react'

interface Props {
  spaceList: FolderData[]
  location: string
  saveFolder: FolderData | undefined
  selectedSaveFolder: SelectedFolder
  onFolderSelect: (folderId: number, folderName: string) => void
}

function SelectSaveSpaceSection({
  spaceList,
  location,
  selectedSaveFolder,
  onFolderSelect
}: Props) {
  return (
    <div className=" flex flex-col gap-2 ">
      <h2 className=" text-lg font-bold">이동할 위치 선택</h2>
      <div className="flex items-center gap-2 text-base">
        <FolderOpen size={20} />

        <p>{location}</p>
      </div>
      <div className="h-[300px] overflow-y-auto box-border border-b-1">
        {spaceList.length > 0 ? (
          spaceList.map(folder => (
            <ArchiveFolder
              key={folder.folderId}
              type="folder"
              mode="move"
              data={{ id: folder.folderId, name: folder.folderName }}
              onFolderSelect={onFolderSelect}
              isSelected={selectedSaveFolder?.folderId === folder.folderId}
            />
          ))
        ) : (
          <p>등록된 스페이스가 없습니다</p>
        )}
      </div>
      <div className="h-[300px]  overflow-y-auto ">
        <h2 className="text-lg font-bold">선택한 스페이스</h2>
        {selectedSaveFolder ? (
          <div className="border border-gray-light rounded-md py-3 px-3 text-base bg-gray-light">
            {location}/{selectedSaveFolder.folderName}
          </div>
        ) : (
          <p>선택한 스페이스가 없습니다</p>
        )}
      </div>
    </div>
  )
}
export default SelectSaveSpaceSection
