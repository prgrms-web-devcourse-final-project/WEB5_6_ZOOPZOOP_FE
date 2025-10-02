import { useQuery } from '@tanstack/react-query'
import { fetchArchiveFilesByPageClient } from '../../api/file.client'

type UseArchiveFilesByPageOptions = {
  folderId: number
  page: number
  size: number
  enabled?: boolean
}

export const useArchiveFilesByPage = ({
  folderId,
  page,
  size,
  enabled = true
}: UseArchiveFilesByPageOptions) => {
  const filesQuery = useQuery({
    queryKey: ['archiveFiles', 'page', folderId, page, size],
    queryFn: () => fetchArchiveFilesByPageClient({ folderId, page, size }),
    staleTime: 1000 * 60,
    enabled
  })

  return { filesQuery }
}
