'use client'

import { useUserStore } from '@/entities/user'
import NavHeader from './NavHeader'
import NavItems from './NavItems'
import { usePathname } from 'next/navigation'
import { navItems } from '@/shared/routes'

function Navbar() {
  const pathName = usePathname()
  const user = useUserStore(state => state.user)

  return (
    <nav
      aria-label="Primary navigation"
      className="flex flex-col py-4 px-2 cursor-pointer border-r-1 h-screen">
      <NavHeader user={user} />
      <ul>
        {navItems.map(item => (
          <NavItems
            pathName={pathName}
            item={item}
            key={item.label}
          />
        ))}
      </ul>
    </nav>
  )
}
export default Navbar
