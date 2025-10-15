import { useModalStore } from '@/shared/lib'

function CopyToSpaceButton() {
  const openModal = useModalStore(s => s.openModal)
  return (
    <button
      type="button"
      onClick={() => {
        openModal({ type: 'copy-to-space' })
      }}
      className="text-center cursor-pointer px-3 text-base hover:bg-gray-light-active border-r-2">
      스페이스에 복사
    </button>
  )
}
export default CopyToSpaceButton
