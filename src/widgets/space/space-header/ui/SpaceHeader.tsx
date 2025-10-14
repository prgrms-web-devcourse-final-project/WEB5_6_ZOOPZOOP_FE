'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useSpaceStore } from '@/entities/space'
import { useModalStore } from '@/shared/lib'
import ActionButton from '@/shared/ui/header/ActionButton'
import { Plus, Upload } from 'lucide-react'
import { useState } from 'react'
import { SearchBar } from '@/shared/ui/header'

function SpaceHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [query, setQuery] = useState('')

  const { currentSpace } = useSpaceStore()
  const spaceId = currentSpace?.spaceId
  const openModal = useModalStore(s => s.openModal)

  const isDashboard =
    pathname.includes('/dashboard') || pathname.includes('/news')
  const isMainPage = pathname === '/space'
  const isDetailPage = pathname.endsWith('/detail')
  const isSearchResultPage = pathname.includes('/search')
  const isTrashPage = pathname.endsWith('/trash')
  const PLACEHOLDER = '검색어를 입력해 주세요'

  if (isDashboard) {
    return null
  }

  const handleSearchInArchive = () => {
    if (!query.trim()) return
    router.push(`/space/${spaceId}/detail?q=${encodeURIComponent(query)}`)
  }

  const handleSearchInSpace = () => {
    if (!query.trim()) return
  }

  return (
    <header className="bg-gray-dark-active p-6 w-full">
      <h1 className="text-white font-bold text-2xl mb-7">
        {isMainPage ? '내 스페이스' : currentSpace?.spaceName}
      </h1>

      {/* 휴지통 페이지 */}
      {isTrashPage && (
        <SearchBar
          placeholder={PLACEHOLDER}
          value={query}
          onChange={setQuery}
          onEnter={handleSearchInArchive}
        />
      )}
      {/* 메인 페이지 */}
      {isMainPage && (
        <div className="flex justify-between">
          <div className="flex gap-3">
            <ActionButton
              label="스페이스 생성"
              icon={Plus}
              onClick={() => {
                openModal({ type: 'create-space' })
              }}
            />
          </div>
          <SearchBar
            placeholder={PLACEHOLDER}
            value={query}
            onChange={setQuery}
            onEnter={handleSearchInSpace}
          />
        </div>
      )}
      {/* 상세 페이지 , 검색결과 페이지*/}
      {(isDetailPage || isSearchResultPage) && (
        <div className="flex justify-between">
          <div className="flex gap-3">
            <ActionButton
              label="파일 불러오기"
              icon={Upload}
              onClick={() => {
                openModal({ type: 'import-to-space-file' })
              }}
            />
          </div>
          <SearchBar
            placeholder={PLACEHOLDER}
            value={query}
            onChange={setQuery}
            onEnter={handleSearchInArchive}
          />
        </div>
      )}
    </header>
  )
}
export default SpaceHeader
