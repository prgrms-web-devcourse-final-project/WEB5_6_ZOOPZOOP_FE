import { tw, useModalStore } from '@/shared/lib'
import { X } from 'lucide-react'

interface Props {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export const ModalLayout = ({ children, size }: Props) => {
  const closeModal = useModalStore(s => s.closeModal)

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={closeModal}>
      <div
        className={tw(
          'bg-white rounded-2xl flex-center flex-col relative gap-5',
          size === 'sm' && 'w-[386px] p-4',
          size === 'md' && 'w-[500px] p-7.5',
          size === 'lg' && 'w-[1000px] p-7.5'
        )}
        onClick={e => e.stopPropagation()}>
        <button
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-900 z-50"
          type="button"
          aria-label="팝업창 닫기">
          <X
            className="text-3xl"
            onClick={closeModal}
          />
        </button>
        {children}
      </div>
    </div>
  )
}
