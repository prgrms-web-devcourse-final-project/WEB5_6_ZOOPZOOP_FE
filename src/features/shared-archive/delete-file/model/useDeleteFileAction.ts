import { useDeleteManySpaceFileQuery } from '@/entities/shared-archive/model/queries'
import { TrashSpaceFileRequest } from '@/entities/shared-archive/model/type'
import { useModalStore } from '@/shared/lib'
import { showErrorToast, showSuccessToast } from '@/shared/ui/toast/Toast'
import { useRouter } from 'next/navigation'

export const useDeleteFileAction = () => {
  const router = useRouter()
  const closeModal = useModalStore(s => s.closeModal)
  const { deleteManyFile } = useDeleteManySpaceFileQuery()

  const handleDelete = ({ spaceId, dataSourceId }: TrashSpaceFileRequest) => {
    deleteManyFile.mutate(
      { spaceId, dataSourceId },
      {
        onSuccess: () => {
          showSuccessToast('파일 삭제 성공')
          router.push(`/space/${spaceId}/trash`)
          closeModal()
        },
        onError: () => {
          showErrorToast('파일 삭제 실패')
        }
      }
    )
  }

  return { handleDelete, isPending: deleteManyFile.isPending }
}
