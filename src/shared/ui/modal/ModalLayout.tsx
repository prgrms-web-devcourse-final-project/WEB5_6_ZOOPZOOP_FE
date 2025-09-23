import { tw, useModalStore } from '@/shared/lib'

import { LuCircleX } from 'react-icons/lu'

interface Props {
  children: React.ReactNode
  size?: 'sm' | 'md'
}

export const ModalLayout = ({ children, size }: Props) => {
  const closeModal = useModalStore(s => s.closeModal)

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title">
      <div
        className={tw(
          'bg-white rounded-2xl flex-center flex-col relative gap-5',
          size === 'sm' && 'w-[386px] p-4',
          size === 'md' && 'w-[500px] p-7.5'
        )}>
        <div className="absolute top-4 right-4">
          <LuCircleX
            className="text-3xl"
            onClick={closeModal}
          />
        </div>
        {children}
      </div>
    </div>
  )
}
