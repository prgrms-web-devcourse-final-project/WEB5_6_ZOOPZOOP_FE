import { FileData } from '@/entities/archive/file'
import FileCard from './FileCard'

interface Props {
  fileList: FileData[]
  mode: 'archive' | 'trash'
  selectedIds: number[]
  onSelect: (dataSourceId: number) => void
}

function CardView({ fileList, mode, selectedIds, onSelect }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4 w-full">
      {fileList.map(
        ({
          dataSourceId,
          title,
          category,
          dataCreatedDate,
          imageUrl,
          sourceUrl,
          tags,
          summary
        }) => (
          <FileCard
            mode={mode}
            key={dataSourceId}
            id={dataSourceId}
            tags={tags}
            summary={summary}
            title={title}
            category={category}
            createdAt={dataCreatedDate}
            imageUrl={imageUrl}
            sourceUrl={sourceUrl}
            isSelected={selectedIds.includes(dataSourceId)}
            onSelect={() => onSelect(dataSourceId)}
          />
        )
      )}
    </div>
  )
}
export default CardView
