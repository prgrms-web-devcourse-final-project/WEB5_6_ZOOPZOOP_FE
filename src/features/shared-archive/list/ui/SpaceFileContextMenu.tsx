'use client'

import { SpaceFileData } from '@/entities/shared-archive/model/type'
import { useOnClickOutside } from '@/shared/hooks'
import { useModalStore } from '@/shared/lib'
import { useRef } from 'react'

interface Props {
  fileData: SpaceFileData
  position: { x: number; y: number }
  onClose?: () => void
}

const SpaceFileContextMenu = ({ fileData, position, onClose }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const openModal = useModalStore(state => state.openModal)

  useOnClickOutside(menuRef, () => onClose?.())

  const menuItems = [
    {
      label: '수정하기',
      onClick: () => {
        openModal({
          type: 'edit-archive-file',
          props: { fileData: fileData }
        })
      }
    }
  ]

  return (
    <div
      ref={menuRef}
      style={{ top: position.y, left: position.x }}
      className="fixed shadow-lg rounded-md py-2 w-52 z-50 bg-gray-darker">
      <h3 className="text-white p-1 pb-2 text-center text-sm border-b border-b-gray-normal truncate">
        {fileData.title}
      </h3>
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

export default SpaceFileContextMenu
