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

interface Props {
  members: Member[]
}

export const MemberTable = ({ members }: Props) => {
  const columns = createMemberColumns()

  const table = useReactTable<Member>({
    data: members,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <Table className="w-full">
      <TableHeader className="bg-gray-50">
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <TableHead
                key={header.id}
                className="px-6 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider text-center"
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
        {table.getRowModel().rows.map(row => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map(cell => (
              <TableCell
                key={cell.id}
                className="px-6 py-2 whitespace-nowrap">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
