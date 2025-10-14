import { useMutation, useQueryClient } from '@tanstack/react-query'
import { softDeleteArchiveFileClient } from '../api/soft-delete.client'

export const useMoveToTrashArchiveFilesQuery = () => {
  const queryClient = useQueryClient()
  const moveToTrash = useMutation({
    mutationFn: (dataSourceId: number[]) =>
      softDeleteArchiveFileClient(dataSourceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveFilesPage'] })
    }
  })

  return {
    moveToTrash
  }
}
