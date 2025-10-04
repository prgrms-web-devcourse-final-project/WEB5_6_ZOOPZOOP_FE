'use client'

import { Member } from '@/entities/member'
import { useMemo, useState } from 'react'
import { MemberTable } from './MemberTable'
import { MemberTabs } from './MemberTabs'
import { ActiveType } from '../model/type'

interface Props {
  members: Member[]
  pendingMembers: Member[]
}

export const SpaceMemberManagement = ({ members, pendingMembers }: Props) => {
  const [activeTab, setActiveTab] = useState<ActiveType>('members')
  const currentMembers = useMemo(() => {
    return activeTab === 'members' ? members : pendingMembers
  }, [activeTab, members, pendingMembers])

  return (
    <section className="w-full">
      <h2 className="text-xl font-bold mb-4">스페이스 멤버 관리</h2>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <MemberTabs
          onTabChange={setActiveTab}
          membersCount={members.length}
          pendingCount={pendingMembers?.length}
        />

        <MemberTable
          members={currentMembers}
          activeType={activeTab}
        />
      </div>
    </section>
  )
}

export default SpaceMemberManagement
