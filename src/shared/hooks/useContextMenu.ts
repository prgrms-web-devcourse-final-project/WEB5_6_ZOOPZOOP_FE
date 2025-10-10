import { Position } from '@/shared/types'
import { useEffect, useState } from 'react'

export const useContextMenu = () => {
  const [activeMenu, setActiveMenu] = useState<{
    targetId: number | null
    position: Position
  }>({ targetId: null, position: { x: 0, y: 0 } })

  const handleContextMenu = (targetId: number, x: number, y: number) => {
    setActiveMenu({ targetId, position: { x, y } })
  }

  const closeMenu = () => {
    setActiveMenu({ targetId: null, position: { x: 0, y: 0 } })
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu({ targetId: null, position: { x: 0, y: 0 } })
      }
    }

    if (activeMenu.targetId) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeMenu.targetId])

  return {
    handleContextMenu,
    closeMenu,
    activeMenu
  }
}
