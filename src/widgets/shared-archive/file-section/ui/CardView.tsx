import { FileData } from '@/entities/archive/file'
import FileCard from './SpaceFileCard'
import { useContextMenu } from '@/shared/hooks'
import { SpaceFileContextMenu, SpaceFileMode } from '@/features/shared-archive'

interface Props {
  fileList: FileData[]
  mode: SpaceFileMode
  selectedIds: number[]
  onSelect: (dataSourceId: number) => void
}

function CardView({ fileList, mode, selectedIds, onSelect }: Props) {
  const { closeMenu, handleContextMenu, activeMenu } = useContextMenu()

  return (
    <div className="grid grid-cols-4 gap-10 w-full ">
      {fileList.map(
        ({
          dataSourceId,
          title,
          category,
          dataCreatedDate,
          imageUrl,
          sourceUrl,
          tags,
          summary,
          source
        }) => (
          // mode가 아카이브 일때만 컨텍스트 메뉴 생김
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
            onContextMenu={(x, y) => handleContextMenu(dataSourceId, x, y)}
            contextMenu={
              activeMenu.targetId === dataSourceId ? (
                <SpaceFileContextMenu
                  fileData={{
                    dataSourceId,
                    tags,
                    title,
                    summary,
                    sourceUrl,
                    imageUrl,
                    dataCreatedDate,
                    source,
                    category
                  }}
                  position={activeMenu.position}
                  onClose={closeMenu}
                />
              ) : undefined
            }
          />
        )
      )}
    </div>
  )
}
export default CardView
