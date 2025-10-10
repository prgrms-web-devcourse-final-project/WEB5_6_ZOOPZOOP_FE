import { MainNav } from '@/shared/routes'
import MainNavItem from './MainNavItem'
import SubNavItem from './SubNavItem'

interface Props {
  item: MainNav
  pathName: string
  isExpanded: boolean
}

function NavItems({ item, pathName, isExpanded }: Props) {
  const isMainMenuOpen = item.showSubMenuOnBase
    ? pathName.startsWith(item.href)
    : pathName.startsWith(item.href) && pathName !== item.href

  const isActive = pathName.startsWith(item.href)

  return (
    <>
      <MainNavItem
        mainItem={item}
        isExpanded={isExpanded}
        isActive={isActive}
      />

      {item.children && (
        <ul
          className={`
          flex flex-col gap-1 border-l-2 border-gray-200 w-5/6
          overflow-hidden transition-all duration-300
          ${isMainMenuOpen && isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}>
          {item.children.map((child, idx) => (
            <SubNavItem
              key={idx}
              subItem={child}
            />
          ))}
        </ul>
      )}
    </>
  )
}

export default NavItems
