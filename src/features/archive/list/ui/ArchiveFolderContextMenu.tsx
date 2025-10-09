'use client'

import { useOnClickOutside } from '@/shared/hooks'
import { useModalStore } from '@/shared/lib'
import { useRef } from 'react'

interface Props {
  folderId: number
  folderName: string
  position: { x: number; y: number }
  onClose?: () => void
}

const ArchiveContextMenu = ({
  folderId,
  folderName,
  position,
  onClose
}: Props) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const openModal = useModalStore(state => state.openModal)

  useOnClickOutside(menuRef, () => onClose?.())

  const menuItems = [
    {
      label: '수정하기',
      onClick: () =>
        openModal({
          type: 'rename-folder',
          props: { folderId: folderId, folderName: folderName }
        })
    },

    {
      label: '삭제하기',
      onClick: () => {
        openModal({
          type: 'delete-folder',
          props: { folderId: folderId, folderName: folderName }
        })
        onClose?.()
      }
    }
  ]

  return (
    <div
      ref={menuRef}
      style={{ top: position.y, left: position.x }}
      className="fixed shadow-lg rounded-md py-2 w-52 z-50 bg-gray-darker">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.onClick()
          }}
          className="w-full px-4 py-2 text-left hover:bg-gray-dark text-white cursor-pointer">
          {item.label}
        </button>
      ))}
    </div>
  )
}

export default ArchiveContextMenu
