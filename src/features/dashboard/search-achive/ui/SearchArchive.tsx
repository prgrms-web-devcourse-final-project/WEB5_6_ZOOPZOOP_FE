'use client'

import { SearchBar } from '@/shared/ui/header'
import { useState } from 'react'

export const SearchArchive = () => {
  const [value, setValue] = useState('')
  return (
    <div className="w-full">
      <SearchBar
        className="!w-full"
        placeholder="자료 검색"
        value={value}
        onChange={setValue}
        onEnter={() => {}}
      />
    </div>
  )
}
