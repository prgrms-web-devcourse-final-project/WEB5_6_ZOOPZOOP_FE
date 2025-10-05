import { Member } from '@/entities/member'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/shared/ui/shadcn/table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { createMemberColumns } from '../model/columns'
import { ActiveType } from '../model/type'

interface Props {
  members: Member[]
  activeType: ActiveType
}

export const MemberTable = ({ members, activeType }: Props) => {
  const columns = createMemberColumns(activeType)

  const table = useReactTable<Member>({
    data: members,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const rows = table.getRowModel().rows
  const isEmpty = rows.length === 0

  return (
    <Table className="w-full">
      <TableHeader className="bg-gray-50">
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <TableHead
                key={header.id}
                className="text-center px-6 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider"
                style={{ width: header.getSize() }}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody className="bg-white divide-y divide-gray-200">
        {isEmpty ? (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="text-center py-3.5 text-gray-500">
              맴버가 없습니다
            </TableCell>
          </TableRow>
        ) : (
          rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell
                  key={cell.id}
                  className="px-6 py-2 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
