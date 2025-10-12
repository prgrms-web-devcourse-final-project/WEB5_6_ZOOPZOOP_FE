import {
  showErrorToast,
  showInfoToast,
  showSuccessToast
} from '@/shared/ui/toast/Toast'
import { useModalStore } from '@/shared/lib'
import { useCopyToSpaceArchiveFilesQuery } from './queries'
import { SelectedFile } from '@/features/archive/move-file/model/type'

export const useCopyToSpaceAction = () => {
  const closeModal = useModalStore(s => s.closeModal)
  const { copyToSpace } = useCopyToSpaceArchiveFilesQuery()

  const handleCopyToSpace = (
    spaceId: number | null,
    selectedFiles: SelectedFile[]
  ) => {
    const dataSourceId = selectedFiles.flatMap(item =>
      item.files.map(f => f.fileId)
    )

    const payload = {
      spaceId: spaceId,
      dataSourceId: dataSourceId,
      targetFolderId: 0
    }

    copyToSpace.mutate(payload, {
      onSuccess: res => {
        if (res?.status === 200) {
          showSuccessToast('스페이스로 복사 성공')
        } else {
          showInfoToast('스페이스로 복사 중 오류가 발생했습니다')
        }
        closeModal()
      },
      onError: err => {
        showErrorToast('스페이스 복사 실패')
      }
    })
  }

  return { handleCopyToSpace }
}
