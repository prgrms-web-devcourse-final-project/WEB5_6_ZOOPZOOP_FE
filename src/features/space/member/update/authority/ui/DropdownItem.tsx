import { Authority } from '@/shared/types'
import {
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/shared/ui/shadcn/dropdown-menu'
import { Check } from 'lucide-react'
import { spaceMemberAuthority } from '../model/constant'
import { AuthorityType } from '../model/type'
import { tw } from '@/shared/lib'

interface Props {
  authority: AuthorityType
  index: number
  role: Authority
  onSelect: () => void
}
const DropdownItem = ({ authority, index, role, onSelect }: Props) => {
  const currentRole = role === authority.role

  const handleSelect = () => {
    if (currentRole) return
    onSelect()
  }

  return (
    <>
      <DropdownMenuItem
        className={tw(
          'cursor-pointer flex items-start',
          currentRole && 'bg-muted cursor-default'
        )}
        onClick={handleSelect}>
        <div className="h-full w-5">
          {currentRole && <Check className="text-green-500 size-5" />}
        </div>
        {/* 권한 정보를 담은 컨테이너 */}
        <div className="flex flex-col gap-2">
          {/* 권한명 */}
          <span className="font-semibold text-sm">{authority.label}</span>
          {/* 권한 설명 */}
          <p className="text-xs text-muted-foreground leading-relaxed">
            {authority.description}
          </p>
          {/* 구체적인 권한 목록 */}
          <ul className="text-xs text-muted-foreground space-y-1">
            {authority.permissions.map(permission => (
              <li
                key={permission}
                className="flex items-start gap-1.5">
                <span className="mt-0.5">•</span>
                <span>{permission}</span>
              </li>
            ))}
          </ul>
        </div>
      </DropdownMenuItem>

      {/* 마지막 항목이 아니면 구분선 추가 */}
      {index < spaceMemberAuthority.length - 1 && <DropdownMenuSeparator />}
    </>
  )
}
export default DropdownItem
