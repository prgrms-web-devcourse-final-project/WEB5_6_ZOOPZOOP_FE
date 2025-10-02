'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

interface Props {
  placeholder: string
  value: string
  onChange: (value: string) => void
  onEnter?: () => void
  ariaLabel?: string
}

function SearchBar({
  placeholder,
  value,
  ariaLabel,
  onChange,
  onEnter
}: Props) {
  const [isComposing, setIsComposing] = useState(false)

  return (
    <div
      className="group bg-white flex items-center gap-2 rounded-full px-3 py-2 text-base text-gray-dark 
      w-50% md:w-96 border-2 focus-within:border-2 focus-within:border-orange-accent ">
      <Search className="w-4 text-gray-500 group-focus-within:text-orange-accent" />
      <input
        type="search"
        className="outline-none flex-1"
        placeholder={placeholder}
        value={value}
        aria-label={ariaLabel || placeholder}
        onChange={e => onChange(e.target.value)}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onKeyDown={e => {
          if (e.key === 'Enter' && !isComposing) {
            onEnter?.()
          }
        }}
      />
    </div>
  )
}

export default SearchBar
