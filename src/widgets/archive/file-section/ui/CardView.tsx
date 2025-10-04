import { FileData } from '@/entities/archive/file'
import FileCard from './FileCard'

interface Props {
  fileList: FileData[]
}

function CardView({ fileList }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4 w-full">
      {fileList.map(
        ({
          dataSourceId,
          title,
          category,
          createdAt,
          imageUrl,
          sourceUrl,
          tags,
          summary
        }) => (
          <FileCard
            key={dataSourceId}
            id={dataSourceId}
            tags={tags}
            summary={summary}
            title={title}
            category={category}
            createdAt={createdAt}
            imageUrl={imageUrl}
            sourceUrl={sourceUrl}
            //   isSelected={isSelected}
            //   onSelect={() => handleCheckbox(dataSourceId)}
          />
        )
      )}
    </div>
  )
}
export default CardView
