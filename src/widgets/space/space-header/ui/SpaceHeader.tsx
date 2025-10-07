'use client'

import { usePathname } from 'next/navigation'

import { useSpaceStore } from '@/entities/space'
import { useModalStore } from '@/shared/lib'
import ActionButton from '@/shared/ui/header/ActionButton'
import { Plus } from 'lucide-react'

function SpaceHeader() {
  const { currentSpace } = useSpaceStore()

  const openModal = useModalStore(s => s.openModal)

  const pathname = usePathname()

  const isDashboard = pathname.includes('/dashboard')

  // 스페이스 메인 페이지일 경우 스페이스 생성 버튼 show
  const showCreateButton = pathname === '/space'

  if (isDashboard) {
    return null
  }

  return (
    <header className="bg-gray-dark-active p-6 w-full">
      <h1 className="text-white font-bold text-2xl mb-7">
        {currentSpace?.spaceName || '내 스페이스'}
      </h1>
      {showCreateButton ? (
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
          {/* <SearchBar
            placeholder={searchBar.placeholder}
            value={query}
            onChange={setQuery}
            onEnter={() => {}}
          /> */}
        </div>
      ) : (
        <></>
        // <SearchBar
        //   placeholder={searchBar.placeholder}
        //   value={query}
        //   onChange={setQuery}
        //   onEnter={() => {}}
        // />
      )}
    </header>
  )
}
export default SpaceHeader
