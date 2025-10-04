'use client'

import { usePathname } from 'next/navigation'
import { useModalStore } from '@/shared/lib'
import { Plus } from 'lucide-react'
import ActionButton from '@/shared/ui/header/ActionButton'

interface Props {
  title: string
  showButton?: boolean
}

function SpaceHeader({ title, showButton = true }: Props) {
  const openModal = useModalStore(s => s.openModal)

  const pathname = usePathname()

  const isDashboard = pathname.includes('/dashboard')

  if (isDashboard) {
    return null
  }

  return (
    <header className="bg-gray-dark-active p-6 w-full">
      <h1 className="text-white font-bold text-2xl mb-7">{title}</h1>
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
