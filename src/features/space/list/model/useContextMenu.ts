import { Position } from '@/shared/types'
import { useEffect, useState } from 'react'

export const useContextMenu = () => {
  const [activeMenu, setActiveMenu] = useState<{
    spaceId: number | null
    position: Position
  }>({ spaceId: null, position: { x: 0, y: 0 } })

  const handleContextMenu = (spaceId: number, x: number, y: number) => {
    setActiveMenu({ spaceId, position: { x, y } })
  }

  const closeMenu = () => {
    setActiveMenu({ spaceId: null, position: { x: 0, y: 0 } })
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu({ spaceId: null, position: { x: 0, y: 0 } })
      }
    }

    if (activeMenu.spaceId) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeMenu.spaceId])

  return {
    handleContextMenu,
    closeMenu,
    activeMenu
  }
}
