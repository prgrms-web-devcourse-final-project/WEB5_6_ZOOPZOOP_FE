import { useUploadArchiveFileQuery } from '@/entities/archive/file/model/queries'
import { useModalStore } from '@/shared/lib'
import { showErrorToast, showSuccessToast } from '@/shared/ui/toast/Toast'
import { useRouter } from 'next/navigation'

export const useUrlUploadAction = () => {
  const router = useRouter()
  const { uploadFile } = useUploadArchiveFileQuery()
  const closeModal = useModalStore(s => s.closeModal)
  const handlePost = async ({
    folderId,
    folderName,
    sourceUrl
  }: {
    folderId: number
    folderName: string
    sourceUrl: string
  }) => {
    if (uploadFile.isPending) return
    uploadFile.mutate(
      {
        folderId: folderId,
        sourceUrl: sourceUrl
      },
      {
        onSuccess: () => {
          showSuccessToast('파일 업로드 완료')
          if (folderName === 'default') {
            router.push(`/archive`)
          } else {
            router.push(`/archive/${folderId}?name=${folderName}`)
          }
          closeModal()
        },
        onError: () => {
          showErrorToast('파일 업로드 실패')
          closeModal()
        }
      }
    )
  }
  return { handlePost, isPending: uploadFile.isPending }
}
