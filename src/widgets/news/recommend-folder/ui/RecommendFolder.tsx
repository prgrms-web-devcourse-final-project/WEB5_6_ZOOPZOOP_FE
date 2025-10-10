'use client'

import { FolderData } from '@/entities/archive/folder'

interface Props {
  folderList?: FolderData[]
  onFolderSelect: (folderId: number) => void
}

export default function RecommendFolder({ folderList, onFolderSelect }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4 max-h-[120px] overflow-y-auto">
      {folderList?.map(item => (
        <div
          className="flex justify-between bg-[#F9FAFB] rounded-sm px-3 py-3 hover:bg-gray-light-hover cursor-pointer relative"
          key={item.folderId}
          onClick={() => onFolderSelect(item.folderId)}>
          <p className="text-base text-gray-darker truncate ">
            {item.folderName === 'default' ? '기본 폴더' : item.folderName}
          </p>
        </div>
      ))}
    </div>
  )
}
