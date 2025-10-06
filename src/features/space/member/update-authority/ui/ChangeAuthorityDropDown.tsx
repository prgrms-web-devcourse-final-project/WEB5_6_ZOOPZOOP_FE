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

import DropdownItem from './DropdownItem'

interface Props {
  role: Authority
}

const ChangeAuthorityDropDown = ({ role }: Props) => {
  const displayRole = getAuthorityLabel(role)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="px-3 py-1 rounded-sm"
          variant="outline"
          size="sm">
          Role : {displayRole}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72"
        align="start">
        <DropdownMenuLabel>권한 선택</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="px-1">
          {spaceMemberAuthority.map((authority, index) => (
            <DropdownItem
              key={index}
              authority={authority}
              index={index}
              role={role}
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default ChangeAuthorityDropDown
