import { tw } from '@/shared/lib'
import MainNavItem from './MainNavItem'
import { MainNav } from '@/shared/routes'
import SubNavItem from './SubNavItem'

interface Props {
  mainItem: MainNav
  isExpanded: boolean
  currentPath: string
}

function NavItemGroup({ mainItem, isExpanded, currentPath }: Props) {
  const isMainActive = currentPath.startsWith(mainItem.href)

  const shouldShowSubMenu = mainItem.showSubMenuOnBase
    ? currentPath.startsWith(mainItem.href)
    : currentPath.startsWith(mainItem.href) && currentPath !== mainItem.href

  return (
    <div className="w-full">
      {/* 메인 네비게이션 아이템 */}
      <MainNavItem
        mainItem={mainItem}
        isExpanded={isExpanded}
        isActive={isMainActive}
      />
      {/* 서브메뉴 - 확장/축소 상태 모두에서 표시 */}
      {mainItem.children && (
        <div
          className={tw(
            'overflow-hidden transition-all duration-300 ease-in-out',
            shouldShowSubMenu && 'max-h-96 opacity-100',
            !shouldShowSubMenu && 'max-h-0 opacity-0'
          )}>
          <ul
            className={tw(
              'space-y-1 mt-1',
              isExpanded && 'ml-4 pl-2 border-l-2 border-gray-200'
            )}>
            {mainItem.children.map((child, idx) => (
              <SubNavItem
                key={idx}
                subItem={child}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default NavItemGroup
