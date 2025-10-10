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

export const getArchiveColumns = (
  mode: 'archive' | 'trash'
): ColumnDef<ArchiveColumnType>[] => {
  const columns: ColumnDef<ArchiveColumnType>[] = [
    {
      accessorKey: 'title',
      header: '파일 선택',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Badge name={row.getValue('category')} />
          <p className="text-base text-gray-darker">{row.getValue('title')}</p>
        </div>
      )
    },
    {
      accessorKey: 'category',
      header: () => null,
      cell: () => null
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

  // trash 모드일 때만 체크박스 컬럼 추가
  if (mode === 'trash') {
    columns.unshift({
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          className="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      )
    })
  }

  return columns
}
