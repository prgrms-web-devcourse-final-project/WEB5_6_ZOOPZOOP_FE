'use client'

import { useMemo, useState } from 'react'
import { ActiveType } from '../model/type'
import { MemberTable } from './MemberTable'
import { MemberTabs } from './MemberTabs'
import { useMembers } from '@/features/space'

interface Props {
  spaceId: string
}

export const SpaceMemberManagement = ({ spaceId }: Props) => {
  const [activeTab, setActiveTab] = useState<ActiveType>('members')
  const { members, pendingMembers } = useMembers(spaceId)

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
          activeTab={activeTab}
        />
      </div>
    </section>
  )
}

export default SpaceMemberManagement
