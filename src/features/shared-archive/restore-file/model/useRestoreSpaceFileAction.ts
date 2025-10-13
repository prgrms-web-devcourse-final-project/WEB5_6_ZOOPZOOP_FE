import { useModalStore } from '@/shared/lib'
import { useRestoreArchiveFilesQuery } from './quries'
import { showInfoToast, showSuccessToast } from '@/shared/ui/toast/Toast'
import { TrashSpaceFileRequest } from '@/entities/shared-archive/model/type'
import { useRouter } from 'next/navigation'

export const useRestoreSpaceFileAction = () => {
  const router = useRouter()
  const closeModal = useModalStore(s => s.closeModal)
  const { restoreFile } = useRestoreArchiveFilesQuery()

  const handelRestore = ({ spaceId, dataSourceId }: TrashSpaceFileRequest) => {
    restoreFile.mutate(
      { spaceId, dataSourceId },
      {
        onSuccess: () => {
          showSuccessToast('파일 복구 성공')
          closeModal()
          router.push(`/space/${spaceId}/detail`)
        },
        onError: () => {
          showInfoToast('파일 복구 실패')
        }
      }
    )
  }

  return { handelRestore, isPending: restoreFile.isPending }
}
