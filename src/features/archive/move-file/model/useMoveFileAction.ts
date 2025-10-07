import { showErrorToast, showSuccessToast } from '@/shared/ui/toast/Toast'
import { useModalStore } from '@/shared/lib'
import {
  useMoveOneArchiveFilesQuery,
  useMoveManyArchiveFilesQuery
} from '../model/queries'
import { SelectedFile } from './type'

export const useMoveFileAction = () => {
  const closeModal = useModalStore(s => s.closeModal)
  const { moveFile } = useMoveOneArchiveFilesQuery()
  const { moveFiles } = useMoveManyArchiveFilesQuery()

  const handleMoveFiles = async (selectedFiles: SelectedFile[]) => {
    try {
      const promises = selectedFiles.map(item => {
        if (item.files.length === 1) {
          return moveFile.mutateAsync({
            dataSourceId: item.files[0].fileId,
            folderId: item.folderId
          })
        }
        return moveFiles.mutateAsync({
          folderId: item.folderId,
          dataSourceId: item.files.map(f => f.fileId)
        })
      })

      await Promise.all(promises)
      showSuccessToast('파일 이동 완료')
      closeModal()
    } catch {
      showErrorToast('파일 이동 중 오류 발생')
    }
  }

  return { handleMoveFiles }
}
