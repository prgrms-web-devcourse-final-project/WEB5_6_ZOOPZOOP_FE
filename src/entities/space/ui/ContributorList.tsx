import { Member } from '@/entities/member'
import { Avatar, RemainingAvatar } from '@/shared/ui'

interface Props {
  members: Member[] // 임시 타입
  maxDisplay?: number
}

const ContributorList = ({ members, maxDisplay = 5 }: Props) => {
  const displayContributors = members.slice(0, maxDisplay) // 최대 보여줄 기여자 프로필
  const remainingCount = members.length - maxDisplay

  return (
    <ul
      className="flex items-center -space-x-3 h-full"
      aria-label="팀원 목록">
      {displayContributors.map(member => (
        <li key={member.id}>
          <Avatar
            url={member.profileUrl}
            alt={member.name}
          />
        </li>
      ))}
      {remainingCount > 0 && <RemainingAvatar count={remainingCount} />}
    </ul>
  )
}
export default ContributorList
