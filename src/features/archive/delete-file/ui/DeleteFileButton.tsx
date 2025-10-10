import { useModalStore } from '@/shared/lib'
import { showInfoToast } from '@/shared/ui/toast/Toast'

interface Props {
  selectedIds: number[]
}
function DeleteFileButton({ selectedIds }: Props) {
  const openModal = useModalStore(s => s.openModal)

  return (
    <button
      type="button"
      onClick={() => {
        if (selectedIds.length === 0) {
          showInfoToast('한 개 이상의 파일을 선택해야 합니다')
        } else {
          openModal({
            type: 'delete-archive-file',
            props: { dataSourceId: selectedIds }
          })
        }
      }}
      className=" text-center px-3 text-gray-dark text-lg hover:bg-orange-accent hover:text-white border-r-2">
      영구 삭제
    </button>
  )
}
export default DeleteFileButton
