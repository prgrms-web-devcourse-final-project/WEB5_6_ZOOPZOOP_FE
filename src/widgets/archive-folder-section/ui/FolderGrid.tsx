import { FolderData } from '@/features/archive-sort'
import FolderItem from './FolderItem'

interface Props {
  data: FolderData[]
}

function FolderGrid({ data }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4 max-h-[120px] overflow-y-auto">
      <FolderItem
        folderName="사용자 이름"
        isUndo={true}
      />
      {data.map(item => (
        <FolderItem
          key={item.id}
          folderName={item.name}
          isUndo={false}
        />
      ))}
    </div>
  )
}
export default FolderGrid
