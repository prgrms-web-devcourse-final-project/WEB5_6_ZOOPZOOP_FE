'use client'
import { useState } from 'react'

<<<<<<< HEAD
import { useUserStore } from '@/entities/user'
import NavHeader from './NavHeader'
import NavItems from './NavItems'
import { usePathname } from 'next/navigation'
import { navItems } from '@/shared/routes'
=======
import { navItems } from '@/shared/lib'
import { useUserStore } from '@/entities/user'
import NavHeader from './NavHeader'
import NavItems from './NavItems'
>>>>>>> f4b8378 ([feat] 로그인 상태관리 마무리)

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
