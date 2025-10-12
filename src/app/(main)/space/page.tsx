import { SpaceQueryKey, SpaceStatus } from '@/entities/space'
import { getInitialSpaceList } from '@/entities/space/api/space.ssr'
import { SpaceList } from '@/features/space/list'
import SpaceTab from '@/widgets/space/space-tab/ui/SpaceTab'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'

interface Props {
  searchParams: Promise<{ page?: string; state?: SpaceStatus }>
}

// 스페이스 메인 페이지
export default async function Space({ searchParams }: Props) {
  const queryClient = new QueryClient()
  const params = await searchParams
  const currentPage = Number(params?.page) || 1
  const currentState = (params?.state as SpaceStatus) ?? undefined

  await queryClient.prefetchQuery({
    queryKey: [SpaceQueryKey, currentPage, currentPage],
    queryFn: () =>
      getInitialSpaceList({
        page: currentPage,
        state: currentState
      })
  })

  // server components에서 백엔드로 요청 ssr
  const initialData = await getInitialSpaceList({
    page: currentPage,
    state: currentState
  })

  if (!initialData) return null

  return (
    <div className="px-8 min-h-[calc(100vh-152px)] flex flex-col">
      <SpaceTab />
      {/*  서버 컴포넌트와 클라이언트 컴포넌트의 경계 */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SpaceList />
      </HydrationBoundary>
    </div>
  )
}
