import { Member } from '@/entities/member'
import ChangeAuthorityDropDown from '@/features/space/member/update-authority/ui/ChangeAuthorityDropDown'
import { Avatar } from '@/shared/ui'
import { Badge } from '@/shared/ui/shadcn/badge'
import { Button } from '@/shared/ui/shadcn/button'
import { ColumnDef } from '@tanstack/react-table'
import { Loader2, Trash2 } from 'lucide-react'
import { ActiveType } from './type'

export const createMemberColumns = (
  activeType: ActiveType = 'members'
): ColumnDef<Member>[] => {
  // 공통 컬럼: 프로필, 이름
  const baseColumns: ColumnDef<Member>[] = [
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
      header: () => <span className="text-start w-full"></span>,
      size: 9999,
      cell: info => (
        <span className="font-medium">{info.getValue() as string}</span>
      )
    }
  ]

  // Members 상태일 때만 권한 및 탈퇴 컬럼 추가
  if (activeType === 'members') {
    baseColumns.push(
      {
        accessorKey: 'authority',
        header: '권한',
        size: 150,
        minSize: 150,
        maxSize: 150,
        cell: info => {
          const member = info.row.original
          return <ChangeAuthorityDropDown role={member.authority} />
        }
      },
      {
        id: 'actions',
        header: '퇴출',
        size: 80,
        maxSize: 80,
        cell: () => {
          return (
            <Button
              size="sm"
              className="bg-red-500">
              <Trash2 />
            </Button>
          )
        }
      }
    )
  }

  // Pending 상태일 때는 초대 취소 버튼만 추가 (선택사항)
  if (activeType === 'pending') {
    baseColumns.push({
      id: 'cancel',
      header: '상태',
      size: 80,
      maxSize: 80,
      cell: () => {
        return (
          <Badge
            variant="secondary"
            className="gap-1">
            <Loader2 className="animate-spin h-3 w-3" />
            Pending
          </Badge>
        )
      }
    })
  }

  return baseColumns
}
