import { showErrorToast, showSuccessToast } from '@/shared/ui/toast/Toast'
import { useModalStore } from '@/shared/lib'
import {
  useMoveOneArchiveFilesQuery,
  useMoveManyArchiveFilesQuery
} from '../model/queries'
import { SelectedFile } from './type'
import { useRouter } from 'next/navigation'
import { SelectedFolder } from '../../upload-file/model/type'

export const useMoveFileAction = () => {
  const router = useRouter()
  const closeModal = useModalStore(s => s.closeModal)
  const { moveFile } = useMoveOneArchiveFilesQuery()
  const { moveFiles } = useMoveManyArchiveFilesQuery()

  const handleMoveFiles = async (
    selectedFiles: SelectedFile[],
    selectedSaveFolder: SelectedFolder
  ) => {
    try {
      const promises = selectedFiles.map(item => {
        if (item.files.length === 1) {
          return moveFile.mutateAsync({
            dataSourceId: item.files[0].fileId,
            folderId: selectedSaveFolder.folderId
          })
        }
        return moveFiles.mutateAsync({
          folderId: selectedSaveFolder.folderId,
          dataSourceId: item.files.map(f => f.fileId)
        })
      })

      await Promise.all(promises)
      showSuccessToast('파일 이동 완료')
      router.push(
        `/archive/${selectedSaveFolder.folderId}?name=${selectedSaveFolder.folderName}`
      )
      closeModal()
    } catch {
      showErrorToast('파일 이동 중 오류 발생')
    }
  }

  return { handleMoveFiles, isPending: moveFile.isPending }
}
