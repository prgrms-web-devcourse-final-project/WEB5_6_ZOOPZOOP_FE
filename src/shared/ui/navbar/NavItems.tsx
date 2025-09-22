import { MainNav } from '@/shared/lib/navigation'
import MainNavItem from './MainNavItem'
import SubNavItem from './SubNavItem'
import { useState } from 'react'
interface Props {
  item: MainNav
}

function NavItems({ item }: Props) {
  const [menuState, setMenuState] = useState<{
    main: string | null
    sub: string | null
  }>({ main: null, sub: null })

  const isMainMenuOpen = menuState.main === item.label

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
    <>
      <MainNavItem
        toggleMainMenu={toggleMainMenu}
        isMainMenuOpen={isMainMenuOpen}
        mainItem={item}
      />

      {isMainMenuOpen && item.children && (
        <ul className="flex flex-col gap-1 border-l-2 ml-4 border-green-normal">
          {item.children.map((child, idx) => {
            const isSubMenuOpen = menuState.sub === child.label
            return (
              <SubNavItem
                key={idx}
                isSubMenuOpen={isSubMenuOpen}
                toggleSubMenu={toggleSubMenu}
                subItem={child}
              />
            )
          })}
        </ul>
      )}
    </>
  )
}
export default NavItems
