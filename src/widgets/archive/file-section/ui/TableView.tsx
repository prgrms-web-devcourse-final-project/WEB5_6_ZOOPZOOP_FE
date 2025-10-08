import { CustomTable } from '@/shared/ui'
import { ArchiveColumn, ArchiveColumnType } from './ArchiveColumn'
import { FileData } from '@/entities/archive/file'

interface Props {
  fileList: FileData[]
  mode: 'archive' | 'trash'
}

function TableView({ fileList, mode }: Props) {
  const tableData: ArchiveColumnType[] = fileList.map(item => ({
    id: item.dataSourceId.toString(),
    title: item.title,
    category: item.category,
    createdAt: item.dataCreatedDate,
    origin: item.source
  }))

  return (
    <div className="w-full">
      <CustomTable
        columns={ArchiveColumn}
        data={tableData}
      />
    </div>
  )
}

export default TableView
