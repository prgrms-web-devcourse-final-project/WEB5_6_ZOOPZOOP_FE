import { SortButton } from '@/features/archive/sort'
import type { SortDirection } from '@tanstack/react-table'
import { ChevronDown, Folder } from 'lucide-react'
import { useCallback } from 'react'

interface Props {
  direction: SortDirection
  onSortChange: (direction: SortDirection) => void
}

function FolderHeader({ onSortChange, direction }: Props) {
  const handleSortClick = useCallback(() => {
    const newDirection = direction === 'asc' ? 'desc' : 'asc'
    onSortChange(newDirection)
  }, [direction, onSortChange])

  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center ">
        <Folder
          size={24}
          className="text-gray-light-active"
          aria-hidden="true"
        />
        <p className="text-lg font-bold text-gray-darker">폴더</p>
        <ChevronDown
          size={20}
          className="text-gray-dark"
          aria-hidden="true"
        />
      </div>

      <div className="flex gap-2">
        <SortButton
          label="이름"
          direction={direction}
          onClick={handleSortClick}
        />
      </div>
    </div>
  )
}
export default FolderHeader
