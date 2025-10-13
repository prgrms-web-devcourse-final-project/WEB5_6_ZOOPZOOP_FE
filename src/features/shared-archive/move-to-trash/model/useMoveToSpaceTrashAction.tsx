import { showErrorToast, showSuccessToast } from '@/shared/ui/toast/Toast'
import { useMoveToTrashSpaceFilesQuery } from './quries'
import { SpaceSoftDeleteRequest } from './type'
import { useModalStore } from '@/shared/lib'
import { useRouter } from 'next/navigation'

export const useMoveToSpaceTrashAction = () => {
  const router = useRouter()
  const closeModal = useModalStore(s => s.closeModal)
  const { moveToTrash } = useMoveToTrashSpaceFilesQuery()
  const handleMoveToTrash = ({
    spaceId,
    dataSourceId
  }: SpaceSoftDeleteRequest) => {
    moveToTrash.mutate(
      {
        spaceId: spaceId,
        dataSourceId: dataSourceId
      },
      {
        onSuccess: () => {
          showSuccessToast('휴지통으로 이동 완료')
          closeModal()
          router.push(`/space/${spaceId}/trash`)
        },
        onError: () => {
          showErrorToast('휴지통으로 이동 실패')
        }
      }
    )
  }
  return { handleMoveToTrash, isPending: moveToTrash.isPending }
}
