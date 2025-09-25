import { CustomTable } from '@/shared/ui/shadcn/CustomTable'
import { ArchiveColumn } from './ArchiveColumn'
import { ArchiveColumnType } from '@/entities/archive'
import { memo } from 'react'

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
export default memo(FileTable)
