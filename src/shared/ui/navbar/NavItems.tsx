import { MainNav } from '@/shared/routes'
import MainNavItem from './MainNavItem'
import SubNavItem from './SubNavItem'

interface Props {
  item: MainNav
  pathName: string
  isExpanded: boolean
}

function NavItems({ item, pathName, isExpanded }: Props) {
  const isMainMenuOpen = pathName.startsWith(item.href)

  return (
    <>
      <MainNavItem
        isMainMenuOpen={isMainMenuOpen}
        mainItem={item}
        isExpanded={isExpanded}
      />

      {isMainMenuOpen && item.children && isExpanded && (
        <ul className="flex flex-col gap-1 border-l-2 ml-4 border-green-normal">
          {item.children.map((child, idx) => {
            const isSubMenuOpen = pathName === child.href
            return (
              <SubNavItem
                key={idx}
                isSubMenuOpen={isSubMenuOpen}
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
