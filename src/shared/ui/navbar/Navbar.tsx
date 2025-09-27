'use client'

import { navItems } from '@/shared/ui/routes'
import NavHeader from './NavHeader'
import NavItems from './NavItems'
import { usePathname } from 'next/navigation'

function Navbar() {
  const pathName = usePathname()

  return (
    <nav
      aria-label="Primary navigation"
      className="flex flex-col py-4 px-2 cursor-pointer border-r-1 h-screen">
      <NavHeader
        user={{
          username: '사용자',
          userProfile: '/zoopzoop.png'
        }}
      />
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
