import { CustomTable } from '@/shared/ui'
import { getArchiveColumns, ArchiveColumnType } from './ArchiveColumn'
import { FileData } from '@/entities/archive/file'
import { FileMode } from '@/features/archive'
import { CheckedFile } from '@/features/archive/move-file/model/type'

interface Props {
  fileList: FileData[]
  mode: FileMode
  selectedFiles: CheckedFile[]
  onSelect: (dataSourceId: number, fileName: string) => void
  onSelectAll: (files: FileData[]) => void
}

function TableView({
  fileList,
  mode,
  selectedFiles,
  onSelect,
  onSelectAll
}: Props) {
  const tableData: ArchiveColumnType[] = fileList.map(item => ({
    id: item.dataSourceId.toString(),
    title: item.title,
    category: item.category,
    createdAt: item.dataCreatedDate,
    origin: item.source
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
