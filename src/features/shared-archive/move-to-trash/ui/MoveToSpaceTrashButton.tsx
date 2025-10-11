import { useModalStore } from '@/shared/lib'

import { showInfoToast } from '@/shared/ui/toast/Toast'
import { SpaceFileMode } from '../../list/model/type'

interface Props {
  mode: SpaceFileMode
  dataSourceIds?: number[]
}
function MoveToSpaceTrashButton({ mode, dataSourceIds }: Props) {
  const openModal = useModalStore(s => s.openModal)

  return (
    <button
      type="button"
      onClick={() => {
        if (mode === 'space') {
          if (dataSourceIds!.length === 0) {
            showInfoToast('한 개 이상의 파일을 선택해야 합니다')
          } else {
            openModal({
              type: 'go-to-space-trash',
              props: { dataSourceId: dataSourceIds! }
            })
          }
        }
      }}
      className=" text-center px-3 text-gray-dark text-lg hover:bg-orange-accent hover:text-white">
      휴지통으로 이동
    </button>
  )
}
export default MoveToSpaceTrashButton
