import { showSuccessToast } from '@/shared/ui/toast/Toast'
import { useMoveToTrashSpaceFilesQuery } from './quries'
import { SpaceSoftDeleteRequest } from './type'
import { useModalStore } from '@/shared/lib'

export const useMoveToSpaceTrashAction = () => {
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
        }
      }
    )
  }
  return { handleMoveToTrash }
}
