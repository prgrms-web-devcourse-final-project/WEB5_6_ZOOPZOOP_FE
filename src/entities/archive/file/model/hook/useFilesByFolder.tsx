import { useQuery } from '@tanstack/react-query'
import { fetchArchiveFilesByFolderClient } from '../../api/file.client'

export const useArchiveFilesByFolder = (
  folderId: number,
  options?: { enabled?: boolean }
) => {
  const filesQuery = useQuery({
    queryKey: ['archiveFiles', folderId],
    queryFn: () => fetchArchiveFilesByFolderClient(folderId),
    staleTime: 1000 * 60,
    enabled: options?.enabled
  })

  return { filesQuery }
}
