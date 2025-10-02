'use client'

import ActionButton from './ActionButton'
import SearchBar from './Search'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useModalStore } from '@/shared/lib'
import { Plus, Upload } from 'lucide-react'

export type Button = {
  label: string
}

interface Props {
  title: string
  buttons?: Button[]
  searchBar: {
    placeholder: string
    // TODO: API 응답 타입에 따라 Promise<SearchResult[]> 등으로 변경 예정
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
      <SearchBar
        placeholder={searchBar.placeholder}
        value={query}
        onChange={setQuery}
        onEnter={handleSearch}
      />
    )
  }, [searchBar.placeholder, query, handleSearch])

  const buttonWithSearchHeader = useCallback(() => {
    return (
      <div className="flex justify-between">
        <div className="flex gap-3">
          {buttons &&
            buttons.map(button => {
              const modalLabel =
                button.label === '폴더 생성' ? 'create-folder' : 'url-upload'
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
        <SearchBar
          placeholder={searchBar.placeholder}
          value={query}
          onChange={setQuery}
          onEnter={handleSearch}
        />
      </div>
    )
  }, [buttons, searchBar.placeholder, query, handleSearch])

  return (
    <header className="bg-gray-dark-active p-6">
      <h1 className="text-white font-bold text-2xl mb-7">{title}</h1>
      {buttons ? buttonWithSearchHeader() : searchHeader()}
    </header>
  )
}
export default Header
