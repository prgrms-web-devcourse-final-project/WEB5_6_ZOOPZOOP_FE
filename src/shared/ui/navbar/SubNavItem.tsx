'use client'

import { tw } from '@/shared/lib'
import { matchPath } from '@/shared/lib/path'
import { NavItem } from '@/shared/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipTrigger } from '../shadcn/tooltip'

interface Props {
  subItem: NavItem
  isExpanded: boolean
}

function SubNavItem({ subItem, isExpanded }: Props) {
  const { icon: Icon, href, label } = subItem
  const pathname = usePathname()
  const isActive = matchPath(pathname, href)

  return (
    <Tooltip open={!isExpanded ? undefined : false}>
      <li>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={tw(
              'w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 text-gray-500',
              isActive && 'bg-green-light text-green-normal',
              !isActive && 'hover:text-gray-600 hover:bg-gray-50'
            )}>
            <Icon
              size={16}
              className={tw(
                'transition-transform duration-200 flex-shrink-0',
                isActive && 'text-green-normal',
                !isActive && 'text-gray-500'
              )}
            />
            <p className="whitespace-nowrap truncate">{label}</p>
          </Link>
        </TooltipTrigger>
        {!isExpanded && (
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        )}
      </li>
    </Tooltip>
  )
}
export default SubNavItem
