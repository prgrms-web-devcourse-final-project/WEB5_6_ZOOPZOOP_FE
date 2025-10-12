import { CustomTable } from '@/shared/ui'
import { getArchiveColumns, SpaceColumnType } from './SpaceColumn'
import { FileData } from '@/entities/archive/file'
import { SpaceFileMode } from '@/features/shared-archive'

interface Props {
  fileList: FileData[]
  mode: SpaceFileMode
}

function TableView({ fileList, mode }: Props) {
  const tableData: SpaceColumnType[] = fileList.map(item => ({
    id: item.dataSourceId.toString(),
    title: item.title,
    category: item.category,
    createdAt: item.dataCreatedDate,
    origin: item.source
  }))

  const columns = getArchiveColumns(mode)

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
