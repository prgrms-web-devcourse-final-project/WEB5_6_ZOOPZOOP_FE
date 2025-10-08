import {
  useDeleteManyArchiveFileQuery,
  useDeleteOneArchiveFileQuery
} from '@/entities/archive/file/model/queries'
import { useModalStore } from '@/shared/lib'
import { showInfoToast, showSuccessToast } from '@/shared/ui/toast/Toast'

export const useDeleteFileAction = () => {
  const closeModal = useModalStore(s => s.closeModal)
  const { deleteOneFile } = useDeleteOneArchiveFileQuery()
  const { deleteManyFile } = useDeleteManyArchiveFileQuery()

  const handleDelete = (dataSourceId: number[]) => {
    //     if (dataSourceId.length === 1) {
    //       deleteOneFile.mutate(dataSourceId[0], {
    //         onSuccess: res => {
    //           if (res?.status === 200) {
    //             showSuccessToast('파일 삭제 성공')
    //           } else {
    //             showInfoToast('파일 삭제 중 오류가 발생했습니다')
    //           }
    //           closeModal()
    //         },
    //         onError: err => {
    //           showInfoToast('파일 삭제 실패')
    //         }
    //       })
    //     } else {
    //       deleteManyFile.mutate(dataSourceId, {
    //         onSuccess: res => {
    //           if (res?.status === 200) {
    //             showSuccessToast('파일 삭제 성공')
    //           } else {
    //             showInfoToast('파일 삭제 중 오류가 발생했습니다')
    //           }
    //           closeModal()
    //         },
    //         onError: err => {
    //           showInfoToast('파일 삭제 실패')
    //         }
    //       })
    //     }
    //   }

    deleteManyFile.mutate(dataSourceId, {
      onSuccess: res => {
        if (res?.status === 200) {
          showSuccessToast('파일 삭제 성공')
        } else {
          showInfoToast('파일 삭제 중 오류가 발생했습니다')
        }
        closeModal()
      },
      onError: err => {
        showInfoToast('파일 삭제 실패')
      }
    })
  }

  return { handleDelete }
}
