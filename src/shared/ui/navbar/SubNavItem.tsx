'use client'

import { tw } from '@/shared/lib'
import Link from 'next/link'
import { NavItem } from '@/shared/ui/routes'

interface Props {
  subItem: NavItem
  isSubMenuOpen: boolean
}

function SubNavItem({ subItem, isSubMenuOpen }: Props) {
  const { icon, href, label } = subItem
  const Icon = icon

  return (
    <li>
      <Link
        href={href}
        className={tw(
          'flex items-center gap-4 px-3 py-2 rounded-r-md rounded-br-md  text-base  hover:bg-gray-100',
          !isSubMenuOpen
            ? 'bg-white text-dark'
            : 'bg-green-light-active font-bold text-black'
        )}>
        {Icon && (
          <Icon
            size={20}
            className={tw(!isSubMenuOpen ? 'text-dark' : 'text-black')}
          />
        )}
        <p className="hidden sm:block">{label}</p>
      </Link>
    </li>
  )
}
export default SubNavItem
