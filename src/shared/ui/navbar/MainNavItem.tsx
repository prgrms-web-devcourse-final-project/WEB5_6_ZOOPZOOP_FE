import { tw } from '@/shared/lib'
import { MainNav } from '@/shared/routes'
import Link from 'next/link'

interface Props {
  mainItem: MainNav
  isExpanded: boolean
  isActive: boolean
}

function MainNavItem({ mainItem, isExpanded, isActive }: Props) {
  const { icon: Icon, href, label } = mainItem

  return (
    <div className="w-full">
      <Link
        href={href}
        className={tw(
          'flex items-center rounded-md hover:bg-orange-accent transition-all duration-200 hover:text-white h-10 justify-start p-2',
          !isActive ? 'bg-white text-black' : 'bg-green-normal text-white'
        )}>
        <span
          title={!isExpanded ? label : undefined}
          className="flex-center">
          <Icon
            className={tw(!isActive ? 'text-darker' : 'text-white')}
            aria-hidden
          />
        </span>
        {isExpanded && (
          <span className="pl-4 overflow-hidden flex-1 font-medium text-sm whitespace-nowrap">
            {label}
          </span>
        )}
      </Link>
    </div>
  )
}

export default MainNavItem
