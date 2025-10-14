'use client'

import ActionButton from './ActionButton'
import SearchBar from './Search'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useModalStore } from '@/shared/lib'
import { ArrowLeft, ChevronLeft, Plus, Upload } from 'lucide-react'

export type Button = {
  label: string
}

interface Props {
  title: string
  buttons?: Button[]
  searchBar: {
    placeholder: string
    onSearch?: (query: string) => void | Promise<void>
  }
}

function Header({ title, buttons, searchBar }: Props) {
  const [query, setQuery] = useState('')
  const openModal = useModalStore(s => s.openModal)
  const router = useRouter()

  const handleSearch = () => {
    if (!query.trim()) return
    if (searchBar.onSearch) {
      searchBar.onSearch(query)
    }
    router.push(`/archive/search?q=${encodeURIComponent(query)}`)
    setQuery('')
  }

  const searchHeader = useCallback(() => {
    return (
      <header className="bg-gray-dark-active px-2 pb-5 py-1">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 p-2 rounded-lg hover:bg-gray-600  cursor-pointer transition-colors mb-2">
          <ChevronLeft
            className=" text-white"
            size={20}
          />
          <p className="text-white text-sm">뒤로 가기</p>
        </button>
        <div className="px-4">
          <h1 className="text-white font-bold text-2xl mb-5">{title}</h1>
          <div className="flex items-center gap-3">
            <SearchBar
              placeholder={searchBar.placeholder}
              value={query}
              onChange={setQuery}
              onEnter={handleSearch}
            />
          </div>
        </div>
      </header>
    )
  }, [searchBar.placeholder, query, handleSearch, router])

  const buttonWithSearchHeader = useCallback(() => {
    return (
      <header className="bg-gray-dark-active p-6">
        <h1 className="text-white font-bold text-2xl mb-7">{title}</h1>
        <div className="flex justify-between">
          <SearchBar
            placeholder={searchBar.placeholder}
            value={query}
            onChange={setQuery}
            onEnter={handleSearch}
          />
          <div className="flex gap-3">
            {buttons &&
              buttons.map(button => {
                const modalLabel =
                  button.label === '폴더 생성'
                    ? 'create-folder'
                    : 'upload-archive-url'
                const Icon = button.label === '폴더 생성' ? Plus : Upload
                return (
                  <ActionButton
                    key={button.label}
                    label={button.label}
                    icon={Icon}
                    onClick={() => openModal({ type: modalLabel })}
                  />
                )
              })}
          </div>
        </div>
      </header>
    )
  }, [buttons, searchBar.placeholder, query, handleSearch])

  return <>{buttons ? buttonWithSearchHeader() : searchHeader()}</>
}
export default Header
