'use client'

import { AddMemberButton } from '@/features/space'
import { Search, X } from 'lucide-react'
import { useId, useState } from 'react'

type TabType = 'members' | 'pending'

interface Props {
  onTabChange: (tab: TabType) => void
  membersCount?: number
  pendingCount?: number
  searchTerm: string
  onSearchChange: (value: string) => void
}

export const MemberTabs = ({
  onTabChange,
  membersCount = 0,
  pendingCount = 0,
  searchTerm,
  onSearchChange
}: Props) => {
  const inputId = useId()
  const [activeTab, setActiveTab] = useState<TabType>('members')

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab)
    onTabChange(tab)
  }

  const handleReset = () => {
    onSearchChange('')
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
      <div className="flex items-center gap-3">
        <div className="relative">
          <label
            className="sr-only"
            htmlFor={inputId}>
            맴버 검색
          </label>
          <input
            id={inputId}
            className="w-full px-3 py-1 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-orange-accent focus:border-orange-accent"
            placeholder="search member"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
          />
          <div className='absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"'>
            {searchTerm ? (
              <button
                type="button"
                onClick={handleReset}
                className="flex-center w-4 h-4 text-red-500 hover:text-red-400 cursor-pointer">
                <X aria-hidden />
              </button>
            ) : (
              <Search
                className="w-4 h-4 text-gray-400"
                aria-hidden
              />
            )}
          </div>
        </div>
        <AddMemberButton />
      </div>
    </div>
  )
}
