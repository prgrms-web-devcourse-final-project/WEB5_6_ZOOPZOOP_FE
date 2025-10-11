import { useModalStore } from '@/shared/lib'
import { FileMode } from '../../list'
import { showInfoToast } from '@/shared/ui/toast/Toast'

function MoveToTrashButton() {
  const openModal = useModalStore(s => s.openModal)

  return (
    <button
      type="button"
      onClick={() => {
        openModal({ type: 'go-to-archive-trash' })
      }}
      className=" text-center px-3 text-gray-dark text-lg hover:bg-orange-accent hover:text-white">
      휴지통으로 이동
    </button>
  )
}
export default MoveToTrashButton
