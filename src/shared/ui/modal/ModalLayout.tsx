import { tw } from '@/shared/lib'

import { LuCircleX } from 'react-icons/lu'

interface Props {
  children: React.ReactNode
  size?: 'sm' | 'md'
}

export const ModalLayout = ({ children, size }: Props) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40">
      <div
        className={tw(
          'bg-white rounded-2xl flex-center h-full relative',
          size === 'sm' && 'min-w-[386px]',
          size === 'md' && 'min-w-[500px]'
        )}>
        <div className="absolute top-4 right-4">
          <LuCircleX className="text-3xl" />
        </div>
        {children}
      </div>
    </div>
  )
}
