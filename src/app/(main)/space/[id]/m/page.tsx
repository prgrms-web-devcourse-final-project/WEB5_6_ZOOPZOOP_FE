import {
  getSpaceMemberList,
  getSpacePendingMemberList
} from '@/entities/member/api/member.ssr'
import { Separator } from '@/shared/ui/shadcn/separator'
import {
  SpaceDangerSection,
  SpaceInfo,
  SpaceMemberManagement
} from '@/widgets/space'

interface Props {
  params: Promise<{ id: string }>
}

const SpaceManagementPage = async ({ params }: Props) => {
  const { id } = await params
  const [members, pendingMembers] = await Promise.all([
    getSpaceMemberList(id),
    getSpacePendingMemberList(id)
  ])

  return (
    <div className="flex-center flex-col p-8 max-w-[1200px] m-auto">
      {/* 스페이스 인포 */}
      <SpaceInfo />
      <Separator className="my-10" />
      {/* 스페이스 맴버 테이블 */}
      <SpaceMemberManagement
        members={members.members}
        pendingMembers={pendingMembers.invitedUsers}
      />
      <Separator className="my-10" />
      {/* 스페이스 삭제 및 탈퇴 */}
      <SpaceDangerSection />
    </div>
  )
}
export default SpaceManagementPage
