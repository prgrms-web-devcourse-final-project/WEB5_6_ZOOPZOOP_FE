'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useSpaceStore } from '@/entities/space'
import { useModalStore } from '@/shared/lib'
import ActionButton from '@/shared/ui/header/ActionButton'
import { ChevronLeft, Plus, Upload } from 'lucide-react'
import { useState } from 'react'
import { SearchBar } from '@/shared/ui/header'
import SearchHeader from './SearchHeadet'

function SpaceHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')

  const { currentSpace } = useSpaceStore()
  const spaceId = currentSpace?.spaceId
  const openModal = useModalStore(s => s.openModal)

  const isDashboard =
    pathname.includes('/dashboard') || pathname.includes('/news')
  const isMainPage = pathname === '/space'
  const isDetailPage = pathname.endsWith('/detail')
  const isSearchResultPage = !!searchParams.get('q')
  const isTrashPage = pathname.endsWith('/trash')
  const PLACEHOLDER = '검색어를 입력해 주세요'

  if (isDashboard) {
    return null
  }

  const handleSearchInArchive = () => {
    if (!query.trim()) return
    router.push(`/space/${spaceId}/detail?q=${encodeURIComponent(query)}`)
  }

  return (
    <>
      {isSearchResultPage ? (
        <SearchHeader
          spaceName={currentSpace?.spaceName}
          query={query}
          placeholder={PLACEHOLDER}
          setQuery={setQuery}
          handleSearchInArchive={handleSearchInArchive}
        />
      ) : (
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
            <div className="flex gap-3">
              <ActionButton
                label="스페이스 생성"
                icon={Plus}
                onClick={() => {
                  openModal({ type: 'create-space' })
                }}
              />
            </div>
          )}
          {/* 상세 페이지 , 검색결과 페이지*/}
          {isDetailPage && (
            <div className="flex justify-between">
              <SearchBar
                placeholder={PLACEHOLDER}
                value={query}
                onChange={setQuery}
                onEnter={handleSearchInArchive}
              />
              <div className="flex gap-3">
                <ActionButton
                  label="파일 불러오기"
                  icon={Upload}
                  onClick={() => {
                    openModal({ type: 'import-to-space-file' })
                  }}
                />
              </div>
            </div>
          )}
        </header>
      )}
    </>
  )
}
export default SpaceHeader
