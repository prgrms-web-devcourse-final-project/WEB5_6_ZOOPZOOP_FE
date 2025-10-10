import { useDeleteManyArchiveFileQuery } from '@/entities/archive/file/model/queries'
import { useDeleteManySpaceFileQuery } from '@/entities/shared-archive/model/queries'
import { DeleteSpaceFileRequest } from '@/entities/shared-archive/model/type'
import { useModalStore } from '@/shared/lib'
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast
} from '@/shared/ui/toast/Toast'

export const useDeleteFileAction = () => {
  const closeModal = useModalStore(s => s.closeModal)
  const { deleteManyFile } = useDeleteManySpaceFileQuery()

  const handleDelete = ({ spaceId, dataSourceId }: DeleteSpaceFileRequest) => {
    deleteManyFile.mutate(
      { spaceId, dataSourceId },
      {
        onSuccess: res => {
          if (res?.status === 200) {
            showSuccessToast('파일 삭제 성공')
          } else {
            showInfoToast('파일 삭제 중 오류가 발생했습니다')
          }
          closeModal()
        },
        onError: err => {
          showErrorToast('파일 삭제 실패')
        }
      }
    )
  }

  return { handleDelete }
}
