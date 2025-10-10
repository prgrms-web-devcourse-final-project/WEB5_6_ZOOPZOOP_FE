import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { MainNav, navItems } from '../routes'

const createRegexFromTemplate = (template: string): RegExp | null => {
  if (!template.includes(':id')) return null
  const regexString =
    '^' +
    template.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace(':id', '([^/]+)')
  return new RegExp(regexString)
}

export const useProcessedNavItems = (): MainNav[] => {
  const pathName = usePathname()

  return useMemo(() => {
    // 1. 모든 하위 메뉴를 부모 메뉴(mainItem) 정보와 함께 1차원 배열로 만듭니다.
    const allChildItems = navItems.flatMap(mainItem =>
      mainItem.children
        ? mainItem.children.map(child => ({ ...child, parent: mainItem }))
        : []
    )

    // 2. reduce를 사용해 URL과 일치하는 첫 항목을 찾아 id와 부모 메뉴를 추출합니다.
    const activeItemInfo = allChildItems.reduce(
      (acc, childItem) => {
        // 이미 찾았다면 더 이상 계산하지 않고 이전 값을 그대로 반환합니다.
        if (acc.foundId) return acc

        const regex = createRegexFromTemplate(childItem.href)
        if (regex) {
          const match = pathName.match(regex)
          if (match) {
            // 일치하는 항목을 찾으면, id와 부모 메뉴 정보를 담은 새 객체를 반환합니다.
            return { foundId: match[1], activeMainItem: childItem.parent }
          }
        }
        // 일치하는 항목이 없으면 이전 값을 그대로 다음 순회로 넘깁니다.
        return acc
      },
      // 초기값
      { foundId: null as string | null, activeMainItem: null as MainNav | null }
    )

    const { foundId, activeMainItem } = activeItemInfo

    // 3. 일치하는 항목이 없으면 원본 메뉴를 반환합니다.
    if (!foundId || !activeMainItem) {
      return navItems
    }

    // 4. 찾은 정보를 바탕으로 최종 메뉴 배열을 생성합니다.
    return navItems.map(item => {
      if (item.href === activeMainItem.href && item.children) {
        const newChildren = item.children.map(child =>
          child.href.includes(':id')
            ? { ...child, href: child.href.replace(':id', foundId) }
            : child
        )
        return { ...item, children: newChildren }
      }
      return item
    })
  }, [pathName])
}
