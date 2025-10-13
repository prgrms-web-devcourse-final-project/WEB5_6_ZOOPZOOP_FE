import { useModalStore } from '@/shared/lib'
import { showInfoToast } from '@/shared/ui/toast/Toast'

interface Props {
  selectedIds: number[]
}

function RestoreSpaceFileButton({ selectedIds }: Props) {
  const openModal = useModalStore(s => s.openModal)

  return (
    <button
      type="button"
      onClick={() => {
        if (selectedIds.length === 0) {
          showInfoToast('한 개 이상의 파일을 선택해야 합니다')
        } else {
          openModal({
            type: 'restore-space-file',
            props: { dataSourceId: selectedIds }
          })
        }
      }}
      className="text-center cursor-pointer px-3 text-base hover:bg-gray-light-active border-r-2">
      복구하기
    </button>
  )
}
export default RestoreSpaceFileButton
