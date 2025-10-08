'use client'

import { LuSearch } from 'react-icons/lu'
import { useInviteMembers } from '../model/useInviteMembers'
import { useSearchUserByNickname } from '../model/useSearchUser'
import { MemberCard } from './MemberCard'
import SearchResult from './SearchResult'

interface Props {
  spaceId: number
}

export const InviteMember = ({ spaceId }: Props) => {
  const { handleInputChange, isSearching, result, searchTerm, resetSearch } =
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
  const handleSelectMember = () => {
    if (!result) return
    addMember(result.name)
    resetSearch()
  }

  const handleInviteMembers = async () => {
    await inviteMembers(spaceId)
  }

  // 검색어가 있으면 검색하는 중
  const shouldShowDropdown = searchTerm.length > 0

  const isButtonDisabled = !hasSelectedMembers || isAdding

  return (
    <div className="flex flex-col gap-2.5 w-full">
      <label
        htmlFor="space-members"
        className="text-base font-bold">
        닉네임 입력
      </label>
      <div className="relative">
        <input
          type="text"
          id="space-members"
          className="relative border border-gray-light rounded-md py-3 px-3 text-base w-full"
          placeholder="이메일을 입력해 주세요"
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
          className="text-normal absolute right-3 top-1/2 -translate-y-1/2"
          size={24}
        />
        {/* 검색 결과 창 */}
        {shouldShowDropdown && (
          <SearchResult
            result={result}
            isSearching={isSearching}
            searchTerm={searchTerm}
            onSelect={handleSelectMember}
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-gray-700">
          선택된 멤버 ({selectedMembers.length})
        </p>
        {hasSelectedMembers && (
          <>
            {selectedMembers.map(member => (
              <MemberCard
                onRemove={removeMember}
                member={member}
                key={member}
              />
            ))}
          </>
        )}
      </div>
      <button
        type="button"
        className={`
          w-full rounded-md py-3 px-3 text-base transition-colors
          ${
            isButtonDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-normal text-white hover:bg-green-600 active:bg-green-700'
          }
        `}
        onClick={handleInviteMembers}
        disabled={isButtonDisabled}
        aria-label={
          !hasSelectedMembers
            ? '멤버를 먼저 선택해주세요'
            : isAdding
              ? '멤버 추가 중...'
              : '선택된 멤버 추가하기'
        }>
        {isAdding ? '전송 중..' : '추가'}
      </button>
    </div>
  )
}
