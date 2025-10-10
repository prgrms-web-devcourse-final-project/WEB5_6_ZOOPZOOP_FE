import { useModalStore } from '@/shared/lib'

function MoveFileButton() {
  const openModal = useModalStore(s => s.openModal)

  return (
    <button
      type="button"
      onClick={() => {
        openModal({ type: 'move-file' })
      }}
      className="flex gap-1 items-center px-3 text-gray-dark text-lg hover:bg-orange-accent hover:text-white border-r-2">
      파일 위치 이동
    </button>
  )
}
export default MoveFileButton
