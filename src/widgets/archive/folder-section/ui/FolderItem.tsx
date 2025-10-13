'use client'

import { tw } from '@/shared/lib'
import Link from 'next/link'

interface Props {
  folderId: number
  folderName: string
  useName?: string
  isDefault: boolean
  isActive: boolean
  contextMenu?: React.ReactNode
  isContextMenuActive?: boolean
  onContextMenu?: (x: number, y: number) => void
}

function FolderItem({
  folderId,
  folderName,
  isDefault,
  useName,
  isActive,
  contextMenu,
  isContextMenuActive,
  onContextMenu
}: Props) {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onContextMenu) onContextMenu(e.clientX, e.clientY)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (isContextMenuActive) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <>
      <Link
        href={
          isDefault
            ? '/archive'
            : `/archive/${folderId}?name=${encodeURIComponent(folderName)}`
        }
        onClick={handleClick}>
        <div
          onContextMenu={handleContextMenu}
          className={tw(
            'flex justify-between bg-[#F9FAFB] rounded-sm px-3 py-3 hover:bg-gray-light-hover cursor-pointer relative',
            isDefault ? 'bg-green-normal text-gray-darker ' : '',
            isActive ? 'bg-orange-accent' : ''
          )}>
          <p className={tw('text-base text-gray-darker truncate')}>
            {isDefault ? useName : folderName}
          </p>

          {contextMenu && contextMenu}
        </div>
      </Link>
    </>
  )
}
export default FolderItem
