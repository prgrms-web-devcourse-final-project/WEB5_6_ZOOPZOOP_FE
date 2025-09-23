'use client'

import { CategoryTag } from '@/shared/ui'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowRight, Calendar } from 'lucide-react'

// 데이터 타입 정의
export type ArchiveColumnType = {
  id: string
  title: string
  category: string
  createdAt: string
  origin: string
}

// 컬럼 정의
export const ArchiveColumn: ColumnDef<ArchiveColumnType>[] = [
  {
    id: 'select', // 체크박스 컬럼 id
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
  },
  {
    accessorKey: 'title',
    header: '파일 이동',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <CategoryTag
          name={row.getValue('category')} // 컬럼 존재하므로 사용 가능
          color="bg-red-100" // TODO: 색상 추후 변경해야됨
        />
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
