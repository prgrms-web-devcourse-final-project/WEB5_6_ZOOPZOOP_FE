import { FolderDataType } from '@/entities/archive'
import FolderItem from './FolderItem'
import { useParams } from 'next/navigation'

interface Props {
  data: FolderDataType[]
}

function FolderGrid({ data }: Props) {
  const { folder } = useParams()

  return (
    <div className="grid grid-cols-4 gap-4 max-h-[120px] overflow-y-auto">
      <FolderItem
        folderName="사용자 이름"
        isUndo={true}
        isActive={false}
      />
      {data.map(item => {
        const isActive = folder === item.name
        return (
          <FolderItem
            key={item.id}
            folderName={item.name}
            isUndo={false}
            isActive={isActive}
          />
        )
      })}
    </div>
  )
}
export default FolderGrid
