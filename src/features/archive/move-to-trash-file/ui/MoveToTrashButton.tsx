import { useModalStore } from '@/shared/lib'

function MoveToTrashButton() {
  const openModal = useModalStore(s => s.openModal)

  return (
    <button
      type="button"
      onClick={() => {
        openModal({ type: 'go-to-archive-trash' })
      }}
      className="text-center cursor-pointer px-3 text-base hover:bg-gray-light-active border-r-2">
      휴지통으로 이동
    </button>
  )
}
export default MoveToTrashButton
