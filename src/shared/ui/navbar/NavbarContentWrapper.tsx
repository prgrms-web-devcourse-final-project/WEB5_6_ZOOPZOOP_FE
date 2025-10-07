'use client'

import { useNavbarStore } from '@/shared/hooks'
import { tw } from '@/shared/lib'

interface Props {
  children: React.ReactNode
}

export default function NavbarContentWrapper({ children }: Props) {
  const { isExpanded } = useNavbarStore()

  return (
    <div
      className={tw(
        'transition-all duration-300 flex-1 flex-col flex-center',
        'max-sm:ml-0',
        'sm:max-lg:ml-16',
        isExpanded ? 'lg:ml-60' : 'lg:ml-14'
      )}>
      {children}
    </div>
  )
}
