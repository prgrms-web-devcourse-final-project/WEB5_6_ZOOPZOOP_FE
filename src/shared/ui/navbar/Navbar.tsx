'use client'

import { navItems } from '@/shared/lib'
import NavHeader from './NavHeader'
import NavItems from './NavItems'

function Navbar() {
  return (
    <ul className="flex flex-col gap-2 p-4 cursor-pointer">
      <NavHeader
        user={{
          username: '사용자',
          userProfile: '/zoopzoop.png'
        }}
      />
      {navItems.map(item => (
        <NavItems
          item={item}
          key={item.label}
        />
      ))}
    </ul>
  )
}
export default Navbar
