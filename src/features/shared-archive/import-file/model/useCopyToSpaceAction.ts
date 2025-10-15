import { showErrorToast, showSuccessToast } from '@/shared/ui/toast/Toast'
import { useModalStore } from '@/shared/lib'
import { useCopyToSpaceArchiveFilesQuery } from './queries'
import { SelectedFile } from '@/features/archive/move-file/model/type'
import { useRouter } from 'next/navigation'

export const useCopyToSpaceAction = () => {
  const router = useRouter()
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
      onSuccess: () => {
        showSuccessToast('스페이스로 복사 성공')
        closeModal()
        router.push(`/space/${spaceId}/detail`)
      },
      onError: () => {
        showErrorToast('스페이스 복사 실패')
      }
    })
  }

  return { handleCopyToSpace, isPending: copyToSpace.isPending }
}
