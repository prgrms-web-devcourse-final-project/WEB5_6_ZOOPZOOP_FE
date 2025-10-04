'use client'

import { Member } from '@/entities/member'
import { Authority } from '@/shared/types'
import { Avatar } from '@/shared/ui'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useMemo } from 'react'

interface Props {
  members: Member[]
}

const SpaceMemberTable = ({ members }: Props) => {
  const columns = useMemo<ColumnDef<Member>[]>(
    () => [
      {
        accessorKey: 'profileUrl',
        header: '프로필',
        size: 80,
        cell: info => (
          <Avatar
            url={info.getValue() as string}
            alt={info.getValue() as string}
          />
        )
      },
      {
        accessorKey: 'name',
        header: '이름',
        cell: info => (
          <span className="font-medium">{info.getValue() as string}</span>
        )
      },
      {
        accessorKey: 'authority',
        header: '권한',
        // 드롭다운이 포함된 셀
        cell: info => {
          const member = info.row.original // 현재 행의 전체 데이터
          const currentAuthority = info.getValue() as Authority

          return (
            <select
              value={currentAuthority}
              onChange={e => {}}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="ADMIN">관리자</option>
              <option value="MEMBER">멤버</option>
              <option value="VIEWER">뷰어</option>
            </select>
          )
        }
      }
    ],
    []
  )
  const table = useReactTable<Member>({
    data: members,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <section className="w-full">
      <h2 className="text-xl font-bold mb-4">스페이스 멤버 관리</h2>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{ width: header.getSize() }}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className="hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
export default SpaceMemberTable
