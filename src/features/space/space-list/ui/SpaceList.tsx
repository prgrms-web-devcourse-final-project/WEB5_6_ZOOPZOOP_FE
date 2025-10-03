'use client'

import { SpaceCard, SpacePagination } from '@/entities/space'
import Pagination from '@/shared/ui/pagination/Pagination'
import { useSearchParams } from 'next/navigation'
import { useSpaceQuery } from '../hook/useSpaceQuery'
import SpaceContextMenu from './SpaceContextMenu'

interface Props {
  initialData: SpacePagination
  initialPage: number
}
const SpaceList = ({ initialData, initialPage }: Props) => {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const { data: spaceList, isPending } = useSpaceQuery({
    pagination: { currentPage },
    initialData: currentPage === initialPage ? initialData : undefined
  })

  if (isPending) return null

  return (
    <section className="flex flex-col gap-5 h-[calc(100vh-214px)]">
      <h2 className="sr-only">내 스페이스 목록</h2>
      <ul
        className="grid gap-5 flex-1 
                 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
                 grid-rows-[repeat(3,minmax(200px,1fr))]">
        {spaceList &&
          spaceList.spaces.map(space => (
            <SpaceCard
              {...space}
              key={space.id}
              renderContextMenu={({ position, onClose }) => (
                <SpaceContextMenu
                  spaceId={space.id}
                  position={position}
                  onClose={onClose}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              )}
            />
          ))}
      </ul>
      <Pagination totalPages={spaceList?.totalPages} />
    </section>
  )
}
export default SpaceList
