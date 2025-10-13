import { useEditArchiveFolderNameQuery } from '@/entities/archive/folder'
import { useModalStore } from '@/shared/lib'
import { showErrorToast, showSuccessToast } from '@/shared/ui/toast/Toast'
import { useRouter } from 'next/navigation'

export const useRenameAction = () => {
  const router = useRouter()
  const closeModal = useModalStore(s => s.closeModal)
  const { updateFolderName } = useEditArchiveFolderNameQuery()

  const handleRename = (folderId: number, folderName: string) => {
    updateFolderName.mutate(
      {
        folderId: folderId,
        folderName: folderName
      },
      {
        onSuccess: () => {
          showSuccessToast('폴더 이름 수정 완료')
          closeModal()
          router.push(`/archive/${folderId}?name=${folderName}`)
        },
        onError: () => {
          showErrorToast('폴더 이름 수정 실패')
          closeModal()
        }
      }
    )
  }
  return {
    handleRename,
    isPending: updateFolderName.isPending
  }
}
