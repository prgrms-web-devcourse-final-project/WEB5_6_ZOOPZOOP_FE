'use client'

import { LuSearch, LuUsers } from 'react-icons/lu'
import { useInviteMembers } from '../model/useInviteMembers'
import { useSearchUserByNickname } from '../model/useSearchUser'
import { MemberCard } from './MemberCard'
import SearchResultList from './SearchResultList'
import { tw } from '@/shared/lib'

interface Props {
  spaceId: number
}

export const InviteMember = ({ spaceId }: Props) => {
  const { handleInputChange, isSearching, results, searchTerm, resetSearch } =
    useSearchUserByNickname()

  const {
    addMember,
    hasSelectedMembers,
    inviteMembers,
    isAdding,
    removeMember,
    selectedMembers
  } = useInviteMembers()

  // 검색된 맴버 추가
  const handleSelectMember = (userName: string) => {
    addMember(userName)
    resetSearch()
  }

  // 초대 요청
  const handleInviteMembers = async () => {
    await inviteMembers(spaceId)
  }

  const shouldShowDropdown = searchTerm.length > 0

  const isButtonDisabled = !hasSelectedMembers || isAdding

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="space-y-2 flex flex-col gap-1">
        <label
          htmlFor="space-members"
          className="text-sm font-medium text-slate-900">
          멤버 검색
        </label>
        <div className="relative">
          <input
            type="text"
            id="space-members"
            className="w-full h-10 pl-10 pr-4 text-sm border border-slate-200 rounded-lg bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent transition-shadow"
            placeholder="닉네임으로 검색..."
            role="combobox"
            aria-expanded={shouldShowDropdown}
            aria-autocomplete="list"
            aria-controls={shouldShowDropdown ? 'search-results' : undefined}
            value={searchTerm}
            onChange={handleInputChange}
            autoFocus
          />

          <LuSearch
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          {shouldShowDropdown && (
            <SearchResultList
              onSelect={handleSelectMember}
              isSearching={isSearching}
              searchTerm={searchTerm}
              results={results}
            />
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">선택된 멤버</h3>
          {hasSelectedMembers && (
            <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">
              {selectedMembers.length}
            </span>
          )}
        </div>

        {hasSelectedMembers ? (
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {selectedMembers.map(member => (
              <MemberCard
                key={member}
                member={member}
                onRemove={removeMember}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <LuUsers
                size={24}
                className="text-slate-400"
              />
            </div>
            <h3 className="text-sm font-medium text-slate-900 mb-1">
              선택된 멤버가 없습니다
            </h3>
            <p className="text-sm text-slate-500">
              검색을 통해 초대할 멤버를 추가해주세요
            </p>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={handleInviteMembers}
        disabled={isButtonDisabled}
        className={tw(
          'w-full h-10 px-4 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer',
          isButtonDisabled &&
            'bg-green-light text-slate-400 cursor-not-allowed',
          !isButtonDisabled &&
            'bg-green-normal text-white hover:bg-green-normal-hover focus:ring-green-normal-hover'
        )}
        aria-label={
          !hasSelectedMembers
            ? '멤버를 먼저 선택해주세요'
            : isAdding
              ? '멤버 추가 중...'
              : '선택된 멤버 초대하기'
        }>
        {isAdding
          ? '초대 중...'
          : `멤버 초대${hasSelectedMembers ? ` (${selectedMembers.length})` : ''}`}
      </button>
    </div>
  )
}
