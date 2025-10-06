import { useQuery } from '@tanstack/react-query'
import { FileData, FileSearchParams, SearchGetResponse } from './type'
import {
  fetchArchiveFilesByFolderClient,
  fetchArchiveFilesByPageClient
} from '../api/file.client'

export const useArchiveFilesByFolderQuery = (
  folderId: number,
  options?: { enabled?: boolean }
) => {
  const filesQuery = useQuery({
    queryKey: ['archiveFilesFolder', folderId],
    queryFn: () => fetchArchiveFilesByFolderClient(folderId),
    staleTime: 1000 * 60,
    enabled: options?.enabled
  })

  return { filesQuery }
}

// initial data 받아서 모든 쿼리 다 받아야됨
interface PageQuery {
  query: FileSearchParams
  initialData?: SearchGetResponse
}

export const useArchiveFilesByPageQuery = ({
  query,
  initialData
}: PageQuery) => {
  const { folderId, page, sort, size, keyword, isActive } = query
  return useQuery({
    queryKey: ['archiveFilesPage', folderId, page, sort], //쿼리 키를 다르게 설정
    queryFn: () =>
      fetchArchiveFilesByPageClient({
        folderId,
        page,
        size,
        keyword,
        sort,
        isActive
      }),
    staleTime: 1000 * 60,
    initialData: initialData
  })
}
