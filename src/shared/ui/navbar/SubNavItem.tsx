'use client'

import { tw } from '@/shared/lib'
import Link from 'next/link'
import { NavItem } from '@/shared/routes'
import { matchPath } from '@/shared/lib/path'
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
          'flex items-center gap-4 px-3 py-2 rounded-r-md rounded-br-md text-sm font-medium hover:bg-gray-100 text-black',
          !isActive ? 'bg-white' : 'bg-green-normal text-white'
        )}>
        <Icon
          size={20}
          className={tw(!isActive ? 'text-dark' : 'text-white')}
        />
        <p className="whitespace-nowrap">{label}</p>
      </Link>
    </li>
  )
}
export default SubNavItem
