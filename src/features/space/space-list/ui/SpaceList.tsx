'use client'

import { SpaceCard, SpacePagination } from '@/entities/space'
import Pagination from '@/shared/ui/pagination/Pagination'

import SpaceContextMenu from './SpaceContextMenu'
import { postDashboardJWTClient } from '@/entities/dashboard'

import { useFetchSpace } from '../model/useFetchSpace'
import { useContextMenu } from '../model/useContextMenu'
import { useRouter } from 'next/navigation'

interface Props {
  initialData: SpacePagination
  initialPage: number
}
const SpaceList = ({ initialData, initialPage }: Props) => {
  const { spaces, isLoading } = useFetchSpace({ initialData, initialPage })

  const router = useRouter()
  // 컨택스트 메뉴
  const { closeMenu, handleContextMenu, activeMenu } = useContextMenu()

  const handleDashboardAccess = async (spaceId: string) => {
    await postDashboardJWTClient(spaceId)
    router.push(`/space/${spaceId}/dashboard`)
  }

  if (isLoading) return null

  return (
    <section className="flex flex-col gap-5 min-h-[calc(100vh-214px)]">
      <h2 className="sr-only">내 스페이스 목록</h2>
      <ul className="grid gap-5 flex-1 grid-cols-1 min-[480px]:grid-cols-2 min-[896px]:grid-cols-3 min-[1312px]:grid-cols-4 min-[1728px]:grid-cols-5 auto-rows-min">
        {spaces &&
          spaces.spaces.map(space => (
            <SpaceCard
              {...space}
              handleDashboardAccess={handleDashboardAccess}
              key={space.id}
              onContextMenu={(x, y) => handleContextMenu(space.id, x, y)}
              contextMenu={
                activeMenu.spaceId === space.id ? (
                  <SpaceContextMenu
                    title={space.name}
                    spaceId={space.id}
                    position={activeMenu.position}
                    onClose={closeMenu}
                    handleDashboardAccess={handleDashboardAccess}
                  />
                ) : undefined
              }
            />
          ))}
      </ul>
      <Pagination totalPages={spaces?.totalPages} />
    </section>
  )
}
export default SpaceList
