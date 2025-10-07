'use client'

import { useOnClickOutside } from '@/shared/hooks'
import { useModalStore } from '@/shared/lib'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

interface Props {
  title: string
  spaceId: number
  position: { x: number; y: number }
  onClose?: () => void
  handleDashboardAccess: (spaceId: string) => void
}

const SpaceContextMenu = ({
  title,
  spaceId,
  onClose,
  position,
  handleDashboardAccess
}: Props) => {
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement>(null)
  const openModal = useModalStore(state => state.openModal)

  useOnClickOutside(menuRef, () => onClose?.())

  const menuItems = [
    {
      label: '대시보드 열기',
      onClick: () => handleDashboardAccess(spaceId.toString())
    },
    {
      label: '스페이스 관리 열기',
      onClick: () => router.push(`/space/${spaceId}/m`)
    },
    {
      label: '삭제',
      onClick: () => {
        openModal({ type: 'delete-space', props: { spaceId: spaceId, title } })
        onClose?.()
      }
    }
  ]

  return (
    <div
      ref={menuRef}
      style={{ top: position.y, left: position.x }}
      className="fixed shadow-lg rounded-md py-2 w-52 z-50 bg-gray-darker">
      <h3 className="text-white p-1 pb-2 text-center text-sm border-b border-b-gray-normal truncate">
        {title}
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

export default SpaceContextMenu
