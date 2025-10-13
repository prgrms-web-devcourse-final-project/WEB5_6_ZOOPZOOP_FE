import { useModalStore } from '@/shared/lib'
import { useRestoreArchiveFilesQuery } from './quries'
import { showInfoToast, showSuccessToast } from '@/shared/ui/toast/Toast'
import { useRouter } from 'next/navigation'

export const useRestoreFileAction = () => {
  const router = useRouter()
  const closeModal = useModalStore(s => s.closeModal)
  const { restoreFile } = useRestoreArchiveFilesQuery()

  const handelRestore = (dataSourceId: number[]) => {
    restoreFile.mutate(dataSourceId, {
      onSuccess: () => {
        showSuccessToast('파일 복구 성공')
        closeModal()
        router.push(`/archive`)
      },
      onError: () => {
        showInfoToast('파일 복구 실패')
      }
    })
  }

  return { handelRestore, isPending: restoreFile.isPending }
}
