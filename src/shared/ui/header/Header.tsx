'use client'

import { LucideIcon } from 'lucide-react'
import ActionButton from './ActionButton'
import SearchBar from './Search'
import { useState } from 'react'

export type Button = {
  label: string
  icon: LucideIcon
  onClick: () => void
}

interface Props {
  title: string
  buttons?: Button[]
  searchBar: {
    placeholder: string
    // api 통신 매개변수 -> 추후 타입 변경 필요
    onSearch?: (query: string) => void
  }
}

function Header({ title, buttons, searchBar }: Props) {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (searchBar.onSearch) {
      searchBar.onSearch(query)
    }
    setQuery('')
  }

  const searchHeader = () => {
    return (
      <SearchBar
        placeholder={searchBar.placeholder}
        value={query}
        onChange={setQuery}
        onEnter={handleSearch}
      />
    )
  }

  const buttonWithSearchHeader = () => {
    return (
      <div className="flex justify-between">
        <div className="flex gap-3">
          {buttons &&
            buttons.map(button => (
              <ActionButton
                key={button.label}
                label={button.label}
                icon={button.icon}
                onClick={button.onClick}
              />
            ))}
        </div>
        <SearchBar
          placeholder={searchBar.placeholder}
          value={query}
          onChange={setQuery}
          onEnter={handleSearch}
        />
      </div>
    )
  }

  return (
    <header className="bg-gray-darker p-6">
      <h1 className="text-white font-bold text-2xl mb-7">{title}</h1>
      {buttons ? buttonWithSearchHeader() : searchHeader()}
    </header>
  )
}
export default Header
