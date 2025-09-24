import { CustomTable } from '@/shared/ui/shadcn/CustomTable'
import { ArchiveColumn, ArchiveColumnType } from './ArchiveColumn'

interface Props {
  rowData: ArchiveColumnType[]
}
function FileTable({ rowData }: Props) {
  return (
    <CustomTable
      columns={ArchiveColumn}
      data={rowData}
    />
  )
}
export default FileTable
