import { CustomTable } from '@/shared/ui'
import { ArchiveColumn, ArchiveColumnType } from './ArchiveColumn'
import { FileData } from '@/entities/archive/file'

interface Props {
  fileList: FileData[]
}

function TableView({ fileList }: Props) {
  const tableData: ArchiveColumnType[] = fileList.map(item => ({
    id: item.dataSourceId.toString(),
    title: item.title,
    category: item.category,
    createdAt: item.createdAt,
    origin: item.source
  }))

  return (
    <CustomTable
      columns={ArchiveColumn}
      data={tableData}
    />
  )
}

export default TableView
