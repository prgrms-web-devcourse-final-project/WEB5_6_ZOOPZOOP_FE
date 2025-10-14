import { CustomTable } from '@/shared/ui'
import { getArchiveColumns, SpaceColumnType } from './SpaceColumn'
import { FileData } from '@/entities/archive/file'
import { SpaceFileMode } from '@/features/shared-archive'

interface Props {
  fileList: FileData[]
  mode: SpaceFileMode
  selectedFiles: number[]
  onSelect: (cardId: number) => void
  onSelectAll: (files: FileData[]) => void
}

function TableView({
  fileList,
  mode,
  selectedFiles,
  onSelect,
  onSelectAll
}: Props) {
  const tableData: SpaceColumnType[] = fileList.map(item => ({
    id: item.dataSourceId.toString(),
    title: item.title,
    category: item.category,
    createdAt: item.dataCreatedDate,
    origin: item.source,
    sourceUrl: item.sourceUrl
  }))

  const columns = getArchiveColumns(mode, selectedFiles, onSelect, () =>
    onSelectAll(fileList)
  )
  return (
    <div className="w-full">
      <CustomTable
        columns={columns}
        data={tableData}
      />
    </div>
  )
}

export default TableView
