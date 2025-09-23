import { CustomTable } from '@/shared/ui/shadcn/CustomTable'
import { ArchiveColumn, ArchiveColumnType } from './ArchiveColumn'

function FileTable() {
  const users: ArchiveColumnType[] = [
    {
      id: '1',
      category: '경제',
      title:
        'You can’t compress the program without quantifying the open-source SSD...',
      createdAt: '2024-03-15',
      origin: '동아일보'
    },
    {
      id: '2',
      category: '길게 말하기 대횝니다',
      title:
        'You can’t compress the program without quantifying the open-source SSD...',
      createdAt: '2024-03-15',
      origin: '동아일보'
    }
  ]
  return (
    <CustomTable
      columns={ArchiveColumn}
      data={users}
    />
  )
}
export default FileTable
