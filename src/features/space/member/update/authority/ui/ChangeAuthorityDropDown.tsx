'use client'

import { Authority } from '@/shared/types'
import { Button } from '@/shared/ui/shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/shared/ui/shadcn/dropdown-menu'
import { spaceMemberAuthority } from '../model/constant'
import { getAuthorityLabel } from '../model/util'

import { useUpdateAuthority } from '../model/useUpdateAuthority'
import DropdownItem from './DropdownItem'
import { useSpaceStore } from '@/entities/space'
import { Check, Loader2, X } from 'lucide-react'

interface Props {
  role: Authority
  memberId: number
}

const ChangeAuthorityDropDown = ({ role, memberId }: Props) => {
  const currentSpace = useSpaceStore(state => state.currentSpace)
  const { handleSelect, isUpdating, isError, isSuccess } = useUpdateAuthority(
    String(currentSpace?.spaceId)
  )

  const displayRole = getAuthorityLabel(role)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex-center gap-1 ">
          <Button
            className="px-3 py-1 rounded-sm"
            variant="outline"
            size="sm">
            Role : {displayRole}
          </Button>
          {isUpdating && <Loader2 className="animate-spin" />}
          {isSuccess && <Check className="text-green-normal" />}
          {isError && <X className="text-red-500" />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72"
        align="start">
        <DropdownMenuLabel>권한 선택</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="px-1">
          {spaceMemberAuthority.map((authority, index) => (
            <DropdownItem
              key={authority.role}
              authority={authority}
              index={index}
              role={role}
              onSelect={() => {
                if (!currentSpace) return
                handleSelect({
                  memberId,
                  newAuthority: authority.role,
                  spaceId: currentSpace?.spaceId
                })
              }}
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default ChangeAuthorityDropDown
