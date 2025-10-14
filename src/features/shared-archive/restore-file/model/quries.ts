import { useMutation, useQueryClient } from '@tanstack/react-query'
import { restoreSpaceFileClient } from '../api/restoreFile.client'
import { TrashSpaceFileRequest } from '@/entities/shared-archive/model/type'

export const useRestoreArchiveFilesQuery = () => {
  const queryClient = useQueryClient()
  const restoreFile = useMutation({
    mutationFn: ({ spaceId, dataSourceId }: TrashSpaceFileRequest) =>
      restoreSpaceFileClient({ spaceId, dataSourceId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spaceFiles'] })
    }
  })

  return {
    restoreFile
  }
}
