'use client'

import { useUserStore } from '@/entities/user'
import { useNavbarStore } from '@/shared/hooks'
import { tw } from '@/shared/lib'
import { navItems } from '@/shared/routes'
import { usePathname } from 'next/navigation'
import NavHeader from './NavHeader'
import NavItems from './NavItems'

function Navbar() {
  const pathName = usePathname()
  const user = useUserStore(state => state.user)

  const { isExpanded, toggleNavbar } = useNavbarStore()

  return (
    <nav
      aria-label="Primary navigation"
      className={tw(
        'fixed flex flex-col py-4 px-2 border-r-1 h-screen z-10 bg-white transition-all duration-300',
        'max-sm:translate-x-[-100%]',
        isExpanded && 'max-sm:translate-x-0 max-sm:w-full max-sm:shadow-xl',
        'sm:max-lg:transition-all',
        isExpanded ? 'sm:max-lg:w-60' : 'sm:max-lg:w-14',
        isExpanded ? 'lg:w-60' : 'lg:w-14'
      )}>
      {/* 헤더 */}
      <NavHeader
        user={user}
        isExpanded={isExpanded}
        toggleNavbar={toggleNavbar}
      />
      {/* 메뉴 리스트 */}
      <ul className="flex flex-col gap-2 items-center">
        {navItems.map(item => (
          <NavItems
            pathName={pathName}
            item={item}
            key={item.label}
            isExpanded={isExpanded}
          />
        ))}
      </ul>
    </nav>
  )
}
export default Navbar
