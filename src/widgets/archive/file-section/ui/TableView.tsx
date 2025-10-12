import { CustomTable } from '@/shared/ui'
import { getArchiveColumns, ArchiveColumnType } from './ArchiveColumn'
import { FileData } from '@/entities/archive/file'
import { FileMode } from '@/features/archive'

interface Props {
  fileList: FileData[]
  mode: FileMode
}

function TableView({ fileList, mode }: Props) {
  const tableData: ArchiveColumnType[] = fileList.map(item => ({
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
