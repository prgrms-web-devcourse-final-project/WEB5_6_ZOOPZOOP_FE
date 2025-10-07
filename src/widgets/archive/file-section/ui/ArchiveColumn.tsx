import { Badge } from '@/shared/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowRight, Calendar } from 'lucide-react'

export interface ArchiveColumnType {
  id: string
  title: string
  category: string
  createdAt: string
  origin: string
}

// 컬럼 정의
export const ArchiveColumn: ColumnDef<ArchiveColumnType>[] = [
  {
    accessorKey: 'title',
    header: '파일 선택',
    cell: ({ row }) => (
      <div className="flex  items-center gap-2">
        <Badge name={row.getValue('category')} />
        <p className="text-base text-gray-darker">{row.getValue('title')}</p>
      </div>
    )
  },
  {
    accessorKey: 'category',
    header: () => null, // 헤더는 표시하지 않음
    cell: () => null // 필요 없다면 아예 내용도 안 렌더링
  },
  {
    accessorKey: 'createdAt',
    header: '작성일',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Calendar
          size={16}
          className="text-gray-normal"
        />
        <p className="text-base text-gray-darker">
          {row.getValue('createdAt')}
        </p>
      </div>
    )
  },
  {
    accessorKey: 'origin',
    header: '출처',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <ArrowRight
          size={16}
          className="text-gray-normal"
        />
        <p className="text-base text-gray-darker">{row.getValue('origin')}</p>
      </div>
    )
  }
]
