import { memberQueryKeys } from '@/entities/space'
import {
  getSpaceMemberList,
  getSpacePendingMemberList
} from '@/entities/space/member/api/member.ssr'
import { Separator } from '@/shared/ui/shadcn/separator'
import {
  MemberTableSkeleton,
  SpaceDangerSection,
  SpaceInfo,
  SpaceMemberManagement
} from '@/widgets'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'
import { Suspense } from 'react'

interface Props {
  params: Promise<{ id: string }>
}

const SpaceManagementPage = async ({ params }: Props) => {
  const { id } = await params
  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: memberQueryKeys.list(id),
      queryFn: () => getSpaceMemberList(id)
    }),
    queryClient.prefetchQuery({
      queryKey: memberQueryKeys.pending(id),
      queryFn: () => getSpacePendingMemberList(id)
    })
  ])

  return (
    <div className="flex-center flex-col p-8 max-w-[1200px] m-auto">
      {/* 스페이스 인포 */}
      <SpaceInfo />
      <Separator className="my-10" />
      {/* 스페이스 맴버 테이블 */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MemberTableSkeleton />}>
          <SpaceMemberManagement spaceId={id} />
        </Suspense>
      </HydrationBoundary>
      <Separator className="my-10" />
      {/* 스페이스 삭제 및 탈퇴 */}
      <SpaceDangerSection />
    </div>
  )
}
export default SpaceManagementPage
