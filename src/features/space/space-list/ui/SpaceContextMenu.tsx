/* eslint-disable no-console */
'use client'

import { useEffect } from 'react'

interface Props {
  spaceId: number
  position: { x: number; y: number }
  onClose?: () => void
  onEdit: () => void
  onDelete: () => void
}

const SpaceContextMenu = ({
  onDelete,
  onEdit,
  spaceId,
  onClose,
  position
}: Props) => {
  useEffect(() => {
    if (!onClose) return
    const handleClick = () => onClose()
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [onClose])

  const menuItems = [
    { label: '이름 수정', onClick: () => console.log('수정') },
    { label: '팀원 초대', onClick: () => console.log('삭제') },
    { label: '삭제', onClick: () => console.log('삭제') }
  ]

  return (
    <div
      style={{ top: position.y, left: position.x }}
      className="fixed shadow-lg rounded-md py-2 min-w-[150px] z-50 bg-gray-darker">
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

export default SpaceContextMenu
