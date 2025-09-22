import { Avatar } from '../../avatar'
import RemainingAvatar from '../../avatar/RemainingAvatar'

interface Props {
  contributors: number[] // 임시 타입
  maxDisplay?: number
}

const ContributorList = ({ contributors, maxDisplay = 5 }: Props) => {
  const displayContributors = contributors.slice(0, maxDisplay) // 최대 보여줄 기여자 프로필
  const remainingCount = contributors.length - maxDisplay

  return (
    <div className="flex items-center">
      <ul
        className="flex -space-x-3"
        aria-label="팀원 목록">
        {displayContributors.map((_, index) => (
          <li key={index}>
            <Avatar
              url="https://github.com/shadcn.png"
              alt="사용자"
            />
          </li>
        ))}
        {remainingCount > 0 && <RemainingAvatar count={remainingCount} />}
      </ul>
    </div>
  )
}
export default ContributorList
