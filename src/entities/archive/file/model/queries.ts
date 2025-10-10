import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FileSearchParams, SearchGetResponse } from './type'
import {
  deleteManyArchiveFileClient,
  deleteOneArchiveFileClient,
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
    queryKey: ['archiveFilesPage', folderId, page, sort, keyword], //쿼리 키를 다르게 설정
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

export const useDeleteOneArchiveFileQuery = () => {
  const queryClient = useQueryClient()
  const deleteOneFile = useMutation({
    mutationFn: (dataSourceId: number) =>
      deleteOneArchiveFileClient(dataSourceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveDelete'] })
    }
  })
  return { deleteOneFile }
}

export const useDeleteManyArchiveFileQuery = () => {
  const queryClient = useQueryClient()
  const deleteManyFile = useMutation({
    mutationFn: (dataSourceId: number[]) =>
      deleteManyArchiveFileClient(dataSourceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveDelete'] })
    }
  })
  return { deleteManyFile }
}
