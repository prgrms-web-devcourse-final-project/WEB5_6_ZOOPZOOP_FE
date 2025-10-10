import { Member } from '@/entities/space'
import { ChangeAuthorityDropDown, ExpelMemberButton } from '@/features/space'
import { Avatar } from '@/shared/ui'
import { Badge } from '@/shared/ui/shadcn/badge'
import { Loader2 } from 'lucide-react'
import { ActiveType } from '../model/type'

interface Props extends Member {
  activeTab: ActiveType
  isOwner: boolean
  isMe: boolean
  spaceId: number
}

const MemberRow = ({
  authority,
  id,
  name,
  profileUrl,
  activeTab,
  isOwner,
  isMe,
  spaceId
}: Props) => {
  const showChangeAuthority = activeTab === 'members'
  const showPendingBadge = activeTab !== 'members'

  return (
    <li className="flex items-center px-5 py-2 font-semibold">
      <div className="flex items-center gap-5 flex-1">
        <Avatar
          url={profileUrl}
          alt={`${name}님의 프로필 이미지`}
        />
        <p className="text-gray-900 text-sm">{name}</p>
      </div>

      <div className="flex items-center gap-5">
        {showChangeAuthority && (
          <ChangeAuthorityDropDown
            spaceId={spaceId}
            role={authority}
            memberId={id}
            disabled={isMe || !isOwner}
          />
        )}
        {showPendingBadge && (
          <Badge
            variant="secondary"
            className="gap-1">
            <Loader2 className="animate-spin h-3 w-3" />
            Pending
          </Badge>
        )}
        {isOwner && (
          <ExpelMemberButton
            disabled={!isOwner || isMe}
            spaceId={spaceId}
            memberId={id}
            name={name}
          />
        )}
      </div>
    </li>
  )
}
export default MemberRow
