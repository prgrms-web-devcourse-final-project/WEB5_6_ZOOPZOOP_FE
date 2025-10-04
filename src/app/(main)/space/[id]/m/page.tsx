import { getSpaceMemberList } from '@/entities/member/api/member.ssr'
import { SpaceInfo } from '@/widgets/space'
import SpaceMemberTable from '@/widgets/space/space-member-table/ui/SpaceMemberTable'

interface Props {
  params: Promise<{ id: string }>
}

const SpaceManagementPage = async ({ params }: Props) => {
  const { id } = await params
  const members = await getSpaceMemberList(id)

  return (
    <div className="flex-center p-8">
      <SpaceInfo />
      <SpaceMemberTable members={members} />
    </div>
  )
}
export default SpaceManagementPage
