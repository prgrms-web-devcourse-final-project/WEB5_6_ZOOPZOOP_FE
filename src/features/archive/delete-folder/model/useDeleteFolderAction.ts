import { useDeleteArchiveFolderQuery } from '@/entities/archive/folder'
import { useModalStore } from '@/shared/lib'
import { showSuccessToast } from '@/shared/ui/toast/Toast'
import { useRouter } from 'next/navigation'

export const useDeleteFolderAction = () => {
  const router = useRouter()
  const { deleteFolder } = useDeleteArchiveFolderQuery()

  const closeModal = useModalStore(s => s.closeModal)

  const handleDelete = (folderId: number) => {
    deleteFolder.mutate(folderId, {
      onSuccess: () => {
        showSuccessToast('폴더 삭제 성공')
        closeModal()
        router.push('/archive')
      }
    })
  }
  return {
    handleDelete,
    isPending: deleteFolder.isPending
  }
}
