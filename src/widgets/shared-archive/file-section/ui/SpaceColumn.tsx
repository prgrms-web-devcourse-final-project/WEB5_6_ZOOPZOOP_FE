import { SpaceFileMode } from '@/features/shared-archive'
import { Badge } from '@/shared/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowRight, Calendar } from 'lucide-react'

export interface SpaceColumnType {
  id: string
  title: string
  category: string
  createdAt: string
  origin: string
}

export const getArchiveColumns = (
  mode: SpaceFileMode,
  selectedFiles: number[],
  onSelect: (cardId: number) => void,
  onSelectAll: () => void
): ColumnDef<SpaceColumnType>[] => {
  const columns: ColumnDef<SpaceColumnType>[] = [
    {
      accessorKey: 'title',
      header: '파일',
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
      header: () => (
        <input
          type="checkbox"
          className="checkbox"
          onChange={onSelectAll}
        />
      ),
      cell: ({ row }) => {
        const id = Number(row.original.id)

        const checked = selectedFiles.includes(id)

        return (
          <input
            type="checkbox"
            className="checkbox"
            checked={checked}
            onChange={() => onSelect(id)}
          />
        )
      }
    })
  }

  return columns
}
