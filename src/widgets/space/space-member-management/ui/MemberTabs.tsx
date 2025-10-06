'use client'

import { AddMemberButton } from '@/features/space'
import { useState } from 'react'

type TabType = 'members' | 'pending'

interface Props {
  onTabChange: (tab: TabType) => void
  membersCount?: number
  pendingCount?: number
}

export const MemberTabs = ({
  onTabChange,
  membersCount = 0,
  pendingCount = 0
}: Props) => {
  const [activeTab, setActiveTab] = useState<TabType>('members')

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab)
    onTabChange(tab)
  }

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b">
      <ul className="flex gap-5 text-sm">
        <li
          className={`cursor-pointer pb-1 transition-colors ${
            activeTab === 'members'
              ? 'border-b-2 border-green-500 font-semibold text-green-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => handleTabClick('members')}>
          Members({membersCount || 0})
        </li>
        <li
          className={`cursor-pointer pb-1 transition-colors ${
            activeTab === 'pending'
              ? 'border-b-2 border-green-500 font-semibold text-green-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => handleTabClick('pending')}>
          Pending ({pendingCount || 0})
        </li>
      </ul>
      <AddMemberButton />
    </div>
  )
}
