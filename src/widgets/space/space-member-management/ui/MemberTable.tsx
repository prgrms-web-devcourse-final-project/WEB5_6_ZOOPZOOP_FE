import { Member } from '@/entities/space/member'
import MemberRow from './MemberRow'
import { Separator } from '@/shared/ui/shadcn/separator'
import { Fragment } from 'react'
import { ActiveType } from '../model/type'
import { useSpaceStore } from '@/entities/space'
import { AUTHORITIES } from '@/shared/constants'
import { useUserStore } from '@/entities/user'

interface Props {
  members: Member[]
  activeTab: ActiveType
}

export const MemberTable = ({ members, activeTab }: Props) => {
  const currentSpace = useSpaceStore(state => state.currentSpace)
  const user = useUserStore(state => state.user)

  if (!currentSpace) {
    return null
  }

  const isOwner = currentSpace.userAuthority === AUTHORITIES.ADMIN

  return (
    <ul className="w-full">
      {members.length === 0 ? (
        <li className="bg-white divide-y divide-gray-200 text-center py-3.5 text-gray-500">
          맴버가 없습니다
        </li>
      ) : (
        members.map((member, index) => {
          const isMe = user?.id === member.id
          return (
            <Fragment key={member.id}>
              <MemberRow
                {...member}
                spaceId={currentSpace.spaceId}
                isOwner={isOwner}
                isMe={isMe}
                activeTab={activeTab}
              />
              {index < members.length - 1 && <Separator />}
            </Fragment>
          )
        })
      )}
    </ul>
  )
}
