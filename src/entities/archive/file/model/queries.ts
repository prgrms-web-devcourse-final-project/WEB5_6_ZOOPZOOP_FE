import { useQuery } from '@tanstack/react-query'

import { UseArchiveFilesByPageOptions } from './type'
import {
  fetchArchiveFilesByFolderClient,
  fetchArchiveFilesByPageClient
} from '../api/file.client'

export const useArchiveFilesByFolderQuery = (
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

export const useArchiveFilesByPageQuery = ({
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
