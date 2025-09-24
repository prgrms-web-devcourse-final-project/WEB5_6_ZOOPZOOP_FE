import { FolderData } from '@/features/archive-sort'
import FolderItem from './FolderItem'

interface Props {
  data: FolderData[]
}

function FolderGrid({ data }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4 ">
      {data.map(item => (
        <FolderItem
          key={item.id}
          folderName={item.name}
        />
      ))}
    </div>
  )
}
export default FolderGrid
