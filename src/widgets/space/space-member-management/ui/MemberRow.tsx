import { Member } from '@/entities/space'
import { ChangeAuthorityDropDown } from '@/features/space'
import { Avatar } from '@/shared/ui'
import { Badge } from '@/shared/ui/shadcn/badge'
import { Button } from '@/shared/ui/shadcn/button'
import { Loader2, Trash2 } from 'lucide-react'
import { ActiveType } from '../model/type'
import { AUTHORITIES } from '@/shared/constants'

interface Props extends Member {
  activeTab: ActiveType
  isOwner: boolean
}

const MemberRow = ({
  authority,
  id,
  name,
  profileUrl,
  activeTab,
  isOwner
}: Props) => {
  const showChangeAuthority = activeTab === 'members' && isOwner
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
            role={authority}
            memberId={id}
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
          <Button
            size="sm"
            className="bg-red-500">
            <Trash2 />
          </Button>
        )}
      </div>
    </li>
  )
}
export default MemberRow
