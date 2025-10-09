import { Member } from '@/entities/space/member'
import MemberRow from './MemberRow'
import { Separator } from '@/shared/ui/shadcn/separator'
import { Fragment } from 'react'
import { ActiveType } from '../model/type'
import { useSpaceStore } from '@/entities/space'
import { AUTHORITIES } from '@/shared/constants'

interface Props {
  members: Member[]
  activeTab: ActiveType
}

export const MemberTable = ({ members, activeTab }: Props) => {
  const currentSpace = useSpaceStore(state => state.currentSpace)

  const isOwner = currentSpace?.userAuthority === AUTHORITIES.ADMIN

  return (
    <ul className="w-full">
      {members.length === 0 ? (
        <li className="bg-white divide-y divide-gray-200 text-center py-3.5 text-gray-500">
          맴버가 없습니다
        </li>
      ) : (
        members.map((member, index) => (
          <Fragment key={member.id}>
            <MemberRow
              isOwner={isOwner}
              {...member}
              activeTab={activeTab}
            />
            {index < members.length - 1 && <Separator />}
          </Fragment>
        ))
      )}
    </ul>
  )
}
