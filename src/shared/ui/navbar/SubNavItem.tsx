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
          'flex items-center gap-4 px-3 py-2 rounded-r-md rounded-br-md text-sm font-medium hover:bg-green-normal hover:text-white text-black',
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
