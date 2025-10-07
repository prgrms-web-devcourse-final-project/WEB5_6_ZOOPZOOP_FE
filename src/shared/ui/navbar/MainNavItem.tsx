import { tw } from '@/shared/lib'
import { MainNav } from '@/shared/routes'
import Link from 'next/link'

interface Props {
  isMainMenuOpen: boolean
  mainItem: MainNav
  isExpanded: boolean
}

function MainNavItem({ isMainMenuOpen, mainItem, isExpanded }: Props) {
  const { icon: Icon, href, label } = mainItem
  return (
    <li className="w-full">
      <Link
        href={href}
        className={tw(
          'flex items-center w-full rounded-md hover:bg-orange-accent h-10',
          !isMainMenuOpen
            ? 'bg-white text-black'
            : 'bg-green-normal text-white',
          !isExpanded && 'justify-center p-2 size-10',
          isExpanded && 'justify-start p-3'
        )}>
        <span title={!isExpanded ? label : undefined}>
          <Icon
            size={20}
            className={tw(!isMainMenuOpen ? 'text-darker' : 'text-white')}
            aria-hidden
          />
        </span>
        {isExpanded && (
          <span className="pl-4 overflow-hidden flex-1 font-medium text-sm whitespace-nowrap">
            {label}
          </span>
        )}
      </Link>
    </li>
  )
}

export default MainNavItem
