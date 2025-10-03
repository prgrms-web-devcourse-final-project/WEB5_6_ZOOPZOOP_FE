import { getSpaceInfo } from '@/entities/space/api/space.ssr'
import { SpaceSyncProvider } from '@/entities/space/ui'
import { SpaceInfo } from '@/widgets/space'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'

interface Props {
  params: Promise<{ id: string }>
}

const SpaceManagementPage = async ({ params }: Props) => {
  const { id } = await params
  const spaceInfo = await getSpaceInfo(id)

  return (
    <div className="flex-center">
      <SpaceSyncProvider spaceInfo={spaceInfo} />
      <SpaceInfo />
    </div>
  )
}
export default SpaceManagementPage
