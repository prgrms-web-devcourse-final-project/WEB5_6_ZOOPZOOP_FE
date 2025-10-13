import { useModalStore } from '@/shared/lib'
import { showInfoToast } from '@/shared/ui/toast/Toast'
import { CheckedFile } from '../../move-file/model/type'

interface Props {
  selectedFiles: CheckedFile[]
}
function DeleteFileButton({ selectedFiles }: Props) {
  const openModal = useModalStore(s => s.openModal)

  return (
    <button
      type="button"
      onClick={() => {
        if (selectedFiles.length === 0) {
          showInfoToast('한 개 이상의 파일을 선택해야 합니다')
        } else {
          openModal({
            type: 'delete-archive-file',
            props: { selectedFiles: selectedFiles }
          })
        }
      }}
      className="text-center cursor-pointer px-3 text-base hover:bg-gray-light-active border-r-2">
      영구 삭제
    </button>
  )
}
export default DeleteFileButton
