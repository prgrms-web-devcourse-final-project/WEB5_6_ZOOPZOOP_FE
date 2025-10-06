'use client'

import { SpaceCard, SpacePagination } from '@/entities/space'
import Pagination from '@/shared/ui/pagination/Pagination'

import { postDashboardJWTClient } from '@/entities/dashboard'

import { useRouter } from 'next/navigation'
import { useContextMenu } from '../model/useContextMenu'
import { useFetchSpace } from '../model/useFetchSpace'
import EmptyList from './EmptyList'
import PendingListSkeleton from './PendingListSkeleton'
import SpaceContextMenu from './ContextMenu'

interface Props {
  initialData: SpacePagination
  initialPage: number
}
const SpaceList = ({ initialData, initialPage }: Props) => {
  const { spaces, isPending, isFetching } = useFetchSpace({
    initialData,
    initialPage
  })

  const router = useRouter()
  // 컨택스트 메뉴
  const { closeMenu, handleContextMenu, activeMenu } = useContextMenu()

  const handleDashboardAccess = async (spaceId: string) => {
    await postDashboardJWTClient(spaceId)
    router.push(`/space/${spaceId}/dashboard`)
  }

  // 초기 렌더링
  if (isPending) {
    return <PendingListSkeleton />
  }

  // 빈 상태 UI
  if (!spaces || spaces.spaces.length === 0) {
    return <EmptyList />
  }

  return (
    <section
      className={`flex flex-col gap-5 min-h-[calc(100vh-214px)] transition-opacity ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
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
