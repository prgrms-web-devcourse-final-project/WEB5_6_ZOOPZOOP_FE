import { tw } from '@/shared/lib'
import { MainNav } from '@/shared/routes'
import Link from 'next/link'

interface Props {
  isMainMenuOpen: boolean
  mainItem: MainNav
  isExpanded: boolean
}

function MainNavItem({ isMainMenuOpen, mainItem, isExpanded }: Props) {
  const { icon: Icon, href, label, count } = mainItem
  return (
    <li>
      <Link
        href={href}
        className={tw(
          'flex items-center rounded-md font-bold text-base hover:bg-orange-accent transition-all',
          !isMainMenuOpen
            ? 'bg-white text-black'
            : 'bg-green-normal text-white',
          // 축소 상태: 아이콘만 중앙 정렬
          !isExpanded && 'justify-center w-10 h-10 p-2.5 mx-auto',
          // 확장 상태: 전체 내용 표시
          isExpanded && 'justify-start px-3 py-2 gap-4'
        )}>
        {Icon && (
          <span title={!isExpanded ? label : undefined}>
            <Icon
              size={20}
              className={tw(!isMainMenuOpen ? 'text-darker' : 'text-white')}
            />
          </span>
        )}

        <div
          className={tw(
            'flex justify-between w-full transition-all duration-500 overflow-hidden',
            isExpanded ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'
          )}>
          <span className="flex-1 whitespace-nowrap">{label}</span>
          {typeof count !== 'undefined' && (
            <span className="whitespace-nowrap">{count}</span>
          )}
        </div>
      </Link>
    </li>
  )
}

export default MainNavItem
