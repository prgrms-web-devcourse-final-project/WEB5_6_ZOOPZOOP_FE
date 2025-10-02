'use client'

import { ToggleButton } from '@/features/archive/toggle-folder'
import { tw } from '@/shared/lib'
import Link from 'next/link'

interface Props {
  folderName: string
  folderId: number
  isUndo: boolean
  isActive: boolean
  isClicked: boolean
  onClick: (id: number) => void
}

function FolderItem({
  folderId,
  folderName,
  isUndo,
  isActive,
  isClicked,
  onClick
}: Props) {
  return (
    <>
      <Link href={!isUndo ? `/archive/${folderName}` : '/archive'}>
        <div
          className={tw(
            'flex justify-between bg-[#F9FAFB] rounded-sm px-3 py-3 hover:bg-gray-light-hover cursor-pointer relative',
            isUndo
              ? 'bg-orange-accent text-gray-darker hover:bg-green-normal'
              : '',
            isActive ? 'bg-gray-light-active' : ''
          )}>
          <p className="text-base text-gray-darker truncate ">{folderName}</p>

          {!isUndo && (
            <ToggleButton
              id={folderId}
              folderName={folderName}
              isClicked={isClicked}
              onClick={onClick}
            />
          )}
        </div>
      </Link>
    </>
  )
}
export default FolderItem
