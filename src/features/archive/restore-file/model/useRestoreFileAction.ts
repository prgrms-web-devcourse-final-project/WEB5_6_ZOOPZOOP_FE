import { useModalStore } from '@/shared/lib'
import { useRestoreArchiveFilesQuery } from './quries'
import { showInfoToast, showSuccessToast } from '@/shared/ui/toast/Toast'

export const useRestoreFileAction = () => {
  const closeModal = useModalStore(s => s.closeModal)
  const { restoreFile } = useRestoreArchiveFilesQuery()

  const handelRestore = (dataSourceId: number[]) => {
    restoreFile.mutate(dataSourceId, {
      onSuccess: res => {
        if (res?.status === 200) {
          showSuccessToast('파일 복구 성공')
        } else {
          showInfoToast('파일 복구 중 오류가 발생했습니다')
        }
        closeModal()
      },
      onError: err => {
        showInfoToast('파일 복구 실패')
      }
    })
  }

  return { handelRestore }
}
