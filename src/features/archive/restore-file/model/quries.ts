import { useMutation, useQueryClient } from '@tanstack/react-query'
import { restoreManyArchiveFileClient } from '../api/restoreFile.client'

export const useRestoreArchiveFilesQuery = () => {
  const queryClient = useQueryClient()
  const restoreFile = useMutation({
    mutationFn: (dataSourceId: number[]) =>
      restoreManyArchiveFileClient(dataSourceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveFilesPage'] })
    }
  })

  return {
    restoreFile
  }
}
