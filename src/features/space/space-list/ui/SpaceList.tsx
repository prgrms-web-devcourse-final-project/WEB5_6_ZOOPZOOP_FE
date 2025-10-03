'use client'

import { SpaceCard, SpacePagination } from '@/entities/space'
import Pagination from '@/shared/ui/pagination/Pagination'
import SpaceContextMenu from './SpaceContextMenu'
import { useFetchSpace } from '../model/useFetchSpace'
import { useEffect, useState } from 'react'
import { Position } from '@/shared/types'

interface Props {
  initialData: SpacePagination
  initialPage: number
}
const SpaceList = ({ initialData, initialPage }: Props) => {
  const { spaces, isLoading } = useFetchSpace({ initialData, initialPage })
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

  if (isLoading) return null

  return (
    <section className="inline-flex flex-col gap-5 min-h-[calc(100vh-214px)]">
      <h2 className="sr-only">내 스페이스 목록</h2>
      <ul className="grid gap-5 flex-1 grid-cols-1 min-[480px]:grid-cols-2 min-[896px]:grid-cols-3 min-[1312px]:grid-cols-4 min-[1728px]:grid-cols-5 auto-rows-min">
        {spaces &&
          spaces.spaces.map(space => (
            <SpaceCard
              {...space}
              key={space.id}
              onContextMenu={(x, y) => handleContextMenu(space.id, x, y)}
              renderContextMenu={
                activeMenu.spaceId === space.id
                  ? () => (
                      <SpaceContextMenu
                        title={space.name}
                        spaceId={space.id}
                        position={activeMenu.position}
                        onClose={closeMenu}
                        onEdit={() => {}}
                        onDelete={() => {}}
                      />
                    )
                  : undefined
              }
            />
          ))}
      </ul>
      <Pagination totalPages={spaces?.totalPages} />
    </section>
  )
}
export default SpaceList
