'use client'

import { usePathname } from 'next/navigation'

import { useSpaceStore } from '@/entities/space/model/store'

import { useModalStore } from '@/shared/lib'
import ActionButton from '@/shared/ui/header/ActionButton'
import { Plus } from 'lucide-react'

interface Props {
  title: string
  showButton?: boolean
}

function SpaceHeader({ title, showButton = true }: Props) {
  const { currentSpace } = useSpaceStore()

  const openModal = useModalStore(s => s.openModal)

  const pathname = usePathname()

  const isDashboard = pathname.includes('/dashboard')

  if (isDashboard) {
    return null
  }

  return (
    <header className="bg-gray-dark-active p-6 w-full">
      <h1 className="text-white font-bold text-2xl mb-7">
        {currentSpace?.spaceName || title}
      </h1>
      {showButton ? (
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
