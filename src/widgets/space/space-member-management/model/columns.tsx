// 컬럼 정의만 분리 - 순수 설정
import { ColumnDef } from '@tanstack/react-table'
import { Member } from '@/entities/member'
import { Avatar } from '@/shared/ui'
import { Button } from '@/shared/ui/shadcn/button'
import { Trash2 } from 'lucide-react'
import ChangeAuthorityDropDown from '@/features/space/change-authority/ui/ChangeAuthorityDropDown'

export const createMemberColumns = (): ColumnDef<Member>[] => [
  {
    accessorKey: 'profileUrl',
    header: '프로필',
    size: 100,
    minSize: 100,
    cell: info => (
      <Avatar
        url={info.getValue() as string}
        alt={''}
      />
    )
  },
  {
    accessorKey: 'name',
    header: '이름',
    size: 9999,
    cell: info => (
      <span className="font-medium">{info.getValue() as string}</span>
    )
  },
  {
    accessorKey: 'authority',
    header: '권한',
    size: 150,
    minSize: 150,
    maxSize: 150,
    cell: info => {
      const member = info.row.original
      return <ChangeAuthorityDropDown />
    }
  },
  {
    id: 'actions',
    header: '탈퇴',
    size: 80,
    maxSize: 80,
    cell: info => {
      const member = info.row.original
      return (
        <Button
          size="sm"
          className="bg-red-500">
          <Trash2 />
        </Button>
      )
    }
  }
]
