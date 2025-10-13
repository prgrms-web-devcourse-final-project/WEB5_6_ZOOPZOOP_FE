import { useDeleteManyArchiveFileQuery } from '@/entities/archive/file/model/queries'
import { useModalStore } from '@/shared/lib'
import { showErrorToast, showSuccessToast } from '@/shared/ui/toast/Toast'

export const useDeleteFileAction = () => {
  const closeModal = useModalStore(s => s.closeModal)

  const { deleteManyFile } = useDeleteManyArchiveFileQuery()

  const handleDelete = (dataSourceId: number[]) => {
    deleteManyFile.mutate(dataSourceId, {
      onSuccess: () => {
        showSuccessToast('파일 삭제 성공')
        closeModal()
      },
      onError: () => {
        showErrorToast('파일 삭제 실패')
      }
    })
  }

  return { handleDelete, isPending: deleteManyFile.isPending }
}
