import { getSpaceMemberList } from '@/entities/member/api/member.ssr'
import { getSpaceInfo } from '@/entities/space/api/space.ssr'
import { SpaceSyncProvider } from '@/entities/space/ui'
import { SpaceInfo } from '@/widgets/space'
import SpaceMemberTable from '@/widgets/space/space-member-table/ui/SpaceMemberTable'

interface Props {
  params: Promise<{ id: string }>
}

const SpaceManagementPage = async ({ params }: Props) => {
  const { id } = await params
  const spaceInfo = await getSpaceInfo(id)
  const members = await getSpaceMemberList(id)

  return (
    <div className="flex-center">
      <SpaceSyncProvider spaceInfo={spaceInfo} />
      <SpaceInfo />
      <SpaceMemberTable members={members} />
    </div>
  )
}
export default SpaceManagementPage
