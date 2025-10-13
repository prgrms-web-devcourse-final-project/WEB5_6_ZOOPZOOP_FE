import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  EditFileWithImgRequest,
  EditFileWithoutImgRequest,
  FileSearchParams,
  SearchGetResponse
} from './type'
import {
  deleteManyArchiveFileClient,
  deleteOneArchiveFileClient,
  editArchiveFileWithImgClient,
  editArchiveFileWithoutImgClient,
  fetchArchiveFilesByFolderClient,
  fetchArchiveFilesByPageClient,
  postArchiveFileClient
} from '../api/file.client'

export const useArchiveFilesByFolderQuery = (
  folderId: number,
  options?: { enabled?: boolean }
) => {
  const filesQuery = useQuery({
    queryKey: ['archiveFilesPage', folderId],
    queryFn: () => fetchArchiveFilesByFolderClient(folderId),
    // staleTime: 1000 * 60,
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
    queryKey: ['archiveFilesPage', folderId, page, sort, keyword, isActive], //쿼리 키를 다르게 설정
    queryFn: () =>
      fetchArchiveFilesByPageClient({
        folderId,
        page,
        size,
        keyword,
        sort,
        isActive
      }),
    // staleTime: 1000 * 60,
    initialData: initialData
  })
}

export const useDeleteOneArchiveFileQuery = () => {
  const queryClient = useQueryClient()
  const deleteOneFile = useMutation({
    mutationFn: (dataSourceId: number) =>
      deleteOneArchiveFileClient(dataSourceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveFilesPage'] })
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
      queryClient.invalidateQueries({ queryKey: ['archiveFilesPage'] })
    }
  })
  return { deleteManyFile }
}

//파일 수정
export const useEditArchiveFileQuery = () => {
  const queryClient = useQueryClient()
  const editFileWithoutImg = useMutation({
    mutationFn: (fileData: EditFileWithoutImgRequest) =>
      editArchiveFileWithoutImgClient(fileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveFilesPage'] })
    }
  })
  const editFileWithImg = useMutation({
    mutationFn: (fileData: EditFileWithImgRequest) =>
      editArchiveFileWithImgClient(fileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveFilesPage'] })
    }
  })

  return { editFileWithoutImg, editFileWithImg }
}

// 파일 업로드
export const useUploadArchiveFileQuery = () => {
  const queryClient = useQueryClient()
  const uploadFile = useMutation({
    mutationFn: ({
      folderId,
      sourceUrl
    }: {
      folderId: number
      sourceUrl: string
    }) => postArchiveFileClient(folderId, sourceUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveFilesPage'] })
    }
  })
  return { uploadFile }
}
