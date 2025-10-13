import { useModalStore } from '@/shared/lib'

function MoveFileButton() {
  const openModal = useModalStore(s => s.openModal)

  return (
    <button
      type="button"
      onClick={() => {
        openModal({ type: 'move-archive-file' })
      }}
      className="text-center cursor-pointer px-3 text-base hover:bg-gray-light-active border-r-2">
      파일 위치 이동
    </button>
  )
}
export default MoveFileButton
