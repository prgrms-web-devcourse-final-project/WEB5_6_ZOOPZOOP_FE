import { useMutation, useQueryClient } from '@tanstack/react-query'
import { softDeleteSpaceFileClient } from '../api/soft-delete.client'
import { SpaceSoftDeleteRequest } from './type'

export const useMoveToTrashSpaceFilesQuery = () => {
  const queryClient = useQueryClient()
  const moveToTrash = useMutation({
    mutationFn: ({ spaceId, dataSourceId }: SpaceSoftDeleteRequest) =>
      softDeleteSpaceFileClient({ spaceId, dataSourceId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spaceFiles'] })
    }
  })

  return {
    moveToTrash
  }
}
