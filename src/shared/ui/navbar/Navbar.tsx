'use client'

import { navItems } from '@/shared/lib'
import NavHeader from './NavHeader'
import NavItems from './NavItems'
import { useState } from 'react'

function Navbar() {
  const [menuState, setMenuState] = useState<{
    main: string | null
    sub: string | null
  }>({ main: null, sub: null })

  const toggleMainMenu = (label: string) => {
    setMenuState(prev => ({
      main: prev.main === label ? null : label,
      sub: null
    }))
  }
  const toggleSubMenu = (label: string) => {
    setMenuState(prev => ({
      ...prev,
      sub: prev.sub === label ? null : label
    }))
  }
  return (
    <nav
      aria-label="Primary navigation"
      className="flex flex-col py-4 px-2 cursor-pointer border-r-1 min-h-screen">
      <NavHeader
        user={{
          username: '사용자',
          userProfile: '/zoopzoop.png'
        }}
      />
      <ul>
        {navItems.map(item => (
          <NavItems
            menuState={menuState}
            toggleMainMenu={toggleMainMenu}
            toggleSubMenu={toggleSubMenu}
            item={item}
            key={item.label}
          />
        ))}
      </ul>
    </nav>
  )
}
export default Navbar
