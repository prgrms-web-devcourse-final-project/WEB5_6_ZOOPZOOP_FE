import { GridDataType } from '@/entities/archive'
import { FileCard } from '@/shared/ui'

interface Props {
  gridData: GridDataType[]
}

function FileGrid({ gridData }: Props) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {gridData.map(
        ({
          id,
          title,
          category,
          createAt,
          imageUrl,
          sourceUrl,
          ownerProfileUrl
        }) => (
          <FileCard
            key={id}
            id={id}
            title={title}
            category={category}
            createAt={createAt}
            imageUrl={imageUrl}
            sourceUrl={sourceUrl}
            ownerProfileUrl={ownerProfileUrl}
            isSelected={false}
            onSelect={(cardId: number) => {}}
          />
        )
      )}
    </div>
  )
}
export default FileGrid
