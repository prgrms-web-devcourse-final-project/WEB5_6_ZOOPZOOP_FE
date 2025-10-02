import { ArrowDown, ArrowUp, Minus } from 'lucide-react'
import React from 'react'

interface Props {
  label: string
  direction?: 'asc' | 'desc' | 'none'
  onClick: () => void
}

function SortButton({ label, direction = 'none', onClick }: Props) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-label={`${label} 정렬: ${direction === 'asc' ? '오름차순' : direction === 'desc' ? '내림차순' : '해제'}`}
        className="flex gap-2 items-center text-base rounded-sm p-1 cursor-pointer hover:bg-gray-light-active">
        <p>{label}</p>
        {direction === 'asc' && (
          <ArrowUp
            size={14}
            aria-hidden="true"
          />
        )}
        {direction === 'desc' && (
          <ArrowDown
            size={14}
            aria-hidden="true"
          />
        )}
        {direction === 'none' && (
          <Minus
            size={14}
            aria-hidden="true"
          />
        )}
      </button>
    </>
  )
}
export default React.memo(SortButton)
