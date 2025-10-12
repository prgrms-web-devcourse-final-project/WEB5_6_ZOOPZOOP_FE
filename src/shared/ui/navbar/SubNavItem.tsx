'use client'

import { tw } from '@/shared/lib'
import { matchPath } from '@/shared/lib/path'
import { NavItem } from '@/shared/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  subItem: NavItem
}

function SubNavItem({ subItem }: Props) {
  const { icon: Icon, href, label } = subItem
  const pathname = usePathname()
  const isActive = matchPath(pathname, href)

  return (
    <li>
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
    </li>
  )
}
export default SubNavItem
