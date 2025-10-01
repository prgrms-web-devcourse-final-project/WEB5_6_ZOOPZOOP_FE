'use client'

import { useUserStore } from '@/entities/user'
import NavHeader from './NavHeader'
import NavItems from './NavItems'
import { usePathname } from 'next/navigation'
import { navItems } from '@/shared/routes'
import { tw } from '@/shared/lib'
import { ChevronsLeft } from 'lucide-react'
import { useNavbarStore } from '@/shared/hooks'
function Navbar() {
  const pathName = usePathname()
  const user = useUserStore(state => state.user)

  const { isExpanded, toggleNavbar } = useNavbarStore()

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className={tw(
          'fixed flex flex-col py-4 px-2 border-r-1 h-screen z-40 bg-white transition-all duration-300',
          'max-sm:translate-x-[-100%]',
          isExpanded && 'max-sm:translate-x-0 max-sm:w-full max-sm:shadow-xl',
          'sm:max-lg:transition-all',
          isExpanded ? 'sm:max-lg:w-60' : 'sm:max-lg:w-20',
          isExpanded ? 'lg:w-60' : 'lg:w-16'
        )}>
        {/* 토글 버튼 */}
        {isExpanded && (
          <button
            onClick={toggleNavbar}
            className={tw(
              'absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full mb-2',
              'max-sm:absolute max-sm:top-2 max-sm:right-2',
              !isExpanded && 'max-sm:hidden',
              'sm:mx-auto'
            )}
            aria-label="메뉴 닫기">
            <ChevronsLeft size={24} />
          </button>
        )}
        <NavHeader
          user={user}
          isExpanded={isExpanded}
          toggleNavbar={toggleNavbar}
        />
        <ul>
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
    </>
  )
}
export default Navbar
