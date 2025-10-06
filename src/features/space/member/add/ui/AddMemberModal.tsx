import { ModalLayout } from '@/shared/ui'
import { InviteMember } from './MemberInvitation'

interface Props {
  spaceId: number
}

const AddMemberModal = ({ spaceId }: Props) => {
  return (
    <ModalLayout size="md">
      <h1 className="text-2xl font-bold">맴버 초대</h1>
      <InviteMember spaceId={spaceId} />
    </ModalLayout>
  )
}
export default AddMemberModal
