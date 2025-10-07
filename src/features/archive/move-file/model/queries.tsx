import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  moveManyArchiveFilesClient,
  moveOneArchiveFilesClient
} from '../api/moveFile.client'
import { ManyFileMove, OneFileMove } from './type'

// 파일 다건 이동
export const useMoveManyArchiveFilesQuery = () => {
  const queryClient = useQueryClient()
  const moveFiles = useMutation({
    mutationFn: ({ dataSourceId, folderId }: ManyFileMove) =>
      moveManyArchiveFilesClient({ dataSourceId, folderId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveFilesPage'] })
    }
  })

  return {
    moveFiles
  }
}

export const useMoveOneArchiveFilesQuery = () => {
  const queryClient = useQueryClient()
  const moveFile = useMutation({
    mutationFn: ({ dataSourceId, folderId }: OneFileMove) =>
      moveOneArchiveFilesClient({ dataSourceId, folderId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveFilesPage'] })
    }
  })

  return {
    moveFile
  }
}
