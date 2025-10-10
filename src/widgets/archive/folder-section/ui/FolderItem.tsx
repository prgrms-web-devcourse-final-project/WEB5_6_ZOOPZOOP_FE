'use client'

import { tw } from '@/shared/lib'
import Link from 'next/link'

interface Props {
  folderName: string
  isUndo: boolean
  isActive: boolean
  contextMenu?: React.ReactNode
  onContextMenu?: (x: number, y: number) => void
}

function FolderItem({
  folderName,
  isUndo,
  isActive,
  contextMenu,
  onContextMenu
}: Props) {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onContextMenu) onContextMenu(e.clientX, e.clientY)
  }

  return (
    <>
      <Link href={!isUndo ? `/archive/${folderName}` : '/archive'}>
        <div
          onContextMenu={handleContextMenu}
          className={tw(
            'flex justify-between bg-[#F9FAFB] rounded-sm px-3 py-3 hover:bg-gray-light-hover cursor-pointer relative',
            isUndo
              ? 'bg-orange-accent text-gray-darker hover:bg-green-normal'
              : '',
            isActive ? 'bg-gray-light-active' : ''
          )}>
          <p className="text-base text-gray-darker truncate ">{folderName}</p>

          {contextMenu && contextMenu}
        </div>
      </Link>
    </>
  )
}
export default FolderItem
