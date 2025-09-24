import { SortButton, SortKey } from '@/features/archive-sort'
import { SortDirection } from '@tanstack/react-table'
import { ChevronDown, Folder } from 'lucide-react'
import { useState } from 'react'

interface Props {
  onSortChange: (key: SortKey, direction: SortDirection) => void
}

function FolderHeader({ onSortChange }: Props) {
  const [direction, setDirection] = useState<SortDirection>('asc')

  const handleSortClick = () => {
    const newDirection = direction === 'asc' ? 'desc' : 'asc'
    setDirection(newDirection)
    onSortChange('이름', newDirection)
  }
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center ">
        <Folder
          size={24}
          className="text-gray-light-active"
        />
        <p className="text-lg font-bold text-gray-darker">폴더</p>
        <ChevronDown
          size={20}
          className="text-gray-dark"
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
