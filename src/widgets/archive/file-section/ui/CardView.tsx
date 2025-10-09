import { FileData } from '@/entities/archive/file'
import FileCard from './FileCard'
import { useContextMenu } from '@/shared/hooks'
import ArchiveFileContextMenu from '@/features/archive/list/ui/ArchiveFileContextMenu'

interface Props {
  fileList: FileData[]
  mode: 'archive' | 'trash'
  selectedIds: number[]
  onSelect: (dataSourceId: number) => void
}

function CardView({ fileList, mode, selectedIds, onSelect }: Props) {
  const { closeMenu, handleContextMenu, activeMenu } = useContextMenu()

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
                <ArchiveFileContextMenu
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
