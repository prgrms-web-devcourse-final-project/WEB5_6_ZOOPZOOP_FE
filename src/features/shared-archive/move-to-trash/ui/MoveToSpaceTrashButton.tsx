import { useModalStore } from '@/shared/lib'

import { showInfoToast } from '@/shared/ui/toast/Toast'
import { SpaceFileMode } from '../../list/model/type'
import { CheckedFile } from '@/features/archive/move-file/model/type'

interface Props {
  mode: SpaceFileMode
  selectedFiles: CheckedFile[]
}
function MoveToSpaceTrashButton({ mode, selectedFiles }: Props) {
  const openModal = useModalStore(s => s.openModal)

  return (
    <button
      type="button"
      onClick={() => {
        if (mode === 'space') {
          if (selectedFiles!.length === 0) {
            showInfoToast('한 개 이상의 파일을 선택해야 합니다')
          } else {
            openModal({
              type: 'go-to-space-trash',
              props: { selectedFiles: selectedFiles! }
            })
          }
        }
      }}
      className="text-center cursor-pointer px-3 text-base hover:bg-gray-light-active border-r-2">
      휴지통으로 이동
    </button>
  )
}
export default MoveToSpaceTrashButton
