'use client'

import { useUserStore } from '@/entities/user'
import { useNavbarStore } from '@/shared/hooks'
import { tw } from '@/shared/lib'
import { usePathname } from 'next/navigation'
import NavHeader from './NavHeader'
import { useProcessedNavItems } from '@/shared/hooks/useProcessedNavItems'
import NavItemGroup from './NavItemGroup'

interface Props {
  notificationSlot?: React.ReactNode
}

function Navbar({ notificationSlot }: Props) {
  const pathName = usePathname()
  const user = useUserStore(state => state.user)
  const processedNavItems = useProcessedNavItems()
  const { isExpanded, toggleNavbar } = useNavbarStore()

  return (
    <aside
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
        slot={notificationSlot}
      />
      {/* 메뉴 리스트 */}
      <nav className="flex flex-col gap-1 items-center">
        {processedNavItems.map((item, index) => (
          <NavItemGroup
            key={index}
            mainItem={item}
            currentPath={pathName}
            isExpanded={isExpanded}
          />
        ))}
      </nav>
    </aside>
  )
}
export default Navbar
