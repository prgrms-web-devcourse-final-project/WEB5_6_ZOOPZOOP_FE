import { useModalStore } from '@/shared/lib'

function CopyToSpaceButton() {
  const openModal = useModalStore(s => s.openModal)
  return (
    <button
      type="button"
      onClick={() => {
        openModal('url-upload')
      }}
      className=" text-center px-3 text-gray-dark text-lg hover:bg-orange-accent hover:text-white border-r-2">
      스페이스에 복사
    </button>
  )
}
export default CopyToSpaceButton
