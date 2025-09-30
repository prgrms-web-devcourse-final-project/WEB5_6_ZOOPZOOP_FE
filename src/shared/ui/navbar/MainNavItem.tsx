import { tw } from '@/shared/lib'
import { MainNav } from '@/shared/routes'
import Link from 'next/link'

interface Props {
  isMainMenuOpen: boolean
  mainItem: MainNav
  isDashboard: boolean
}

function MainNavItem({ isMainMenuOpen, mainItem, isDashboard }: Props) {
  const { icon, href, label, count } = mainItem
  const Icon = icon

  return (
    <li>
      <Link
        href={href}
        className={tw(
          'flex items-center justify-center sm:justify-start px-2.5 py-2 rounded-md font-bold text-base hover:bg-orange-accent  mb-2',
          !isMainMenuOpen
            ? 'bg-white text-black'
            : 'bg-green-normal text-white',
          ' px-2.5 py-2 w-10 h-10',
          !isDashboard && 'px-3 w-auto h-auto gap-4'
        )}>
        {Icon && (
          <span title={label}>
            <Icon
              size={20}
              className={tw(!isMainMenuOpen ? 'text-darker' : 'text-white')}
            />
          </span>
        )}
        <p className={tw('hidden  flex-1', !isDashboard && 'block')}>{label}</p>
        {typeof count !== 'undefined' && (
          <span className={tw('hidden', !isDashboard && 'block')}>{count}</span>
        )}
      </Link>
    </li>
  )
}
export default MainNavItem
