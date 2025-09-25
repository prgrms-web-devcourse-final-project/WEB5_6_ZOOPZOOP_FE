import { SortButton } from '@/features/archive/sort'
import { SortDirection } from '@tanstack/react-table'
import { ChevronDown, Folder } from 'lucide-react'

interface Props {
  direction: SortDirection
  onSortChange: (direction: SortDirection) => void
}

function FolderHeader({ onSortChange, direction }: Props) {
  const handleSortClick = () => {
    const newDirection = direction === 'asc' ? 'desc' : 'asc'
    onSortChange(newDirection)
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
