import { useQuery } from '@tanstack/react-query'
import { fetchArchiveFilesClient } from '../../api/file.client'

export const useArchiveFiles = (
  folderId: number,
  options?: { enabled?: boolean }
) => {
  const filesQuery = useQuery({
    queryKey: ['archiveFiles', folderId],
    queryFn: () => fetchArchiveFilesClient(folderId),
    staleTime: 1000 * 60,
    enabled: options?.enabled
  })

  return { filesQuery }
}
