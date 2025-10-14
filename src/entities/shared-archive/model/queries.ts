import {
  TrashSpaceFileRequest,
  SearchSpaceFileGetResponse,
  SpaceFileByPageRequest,
  EditSpaceFileWithoutImgRequest,
  EditSpaceFileWithImgRequest
} from './type'
import {
  deleteManySpaceFileClient,
  editSpaceFileWithImgClient,
  editSpaceFileWithoutImgClient,
  fetchSpaceFilesByFolderClient,
  fetchSpaceFilesClient
} from '../api/file.client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface PageQuery {
  query: SpaceFileByPageRequest
  initialData?: SearchSpaceFileGetResponse
}
//페이지 내 파일 조회
export const useSpaceFilesQuery = ({ query, initialData }: PageQuery) => {
  const { spaceId, page, sort, keyword, isActive } = query

  return useQuery({
    queryKey: ['spaceFile', spaceId, page, sort, keyword, isActive], //쿼리 키를 다르게 설정
    queryFn: () =>
      fetchSpaceFilesClient({
        spaceId,
        page,
        keyword,
        sort,
        isActive
      }),
    initialData: initialData
  })
}

//폴더 내 파일 조회
export const useSpaceFilesByFolderQuery = (
  spaceId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ['spaceFile', spaceId],
    queryFn: () => fetchSpaceFilesByFolderClient({ spaceId }),
    enabled: options?.enabled
  })
}

export const useDeleteManySpaceFileQuery = () => {
  const queryClient = useQueryClient()
  const deleteManyFile = useMutation({
    mutationFn: ({ spaceId, dataSourceId }: TrashSpaceFileRequest) =>
      deleteManySpaceFileClient({ spaceId, dataSourceId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spaceFile'] })
    }
  })
  return { deleteManyFile }
}

// 파일 수정
export const useEditSpaceFileQuery = () => {
  const queryClient = useQueryClient()
  const editFileWithoutImg = useMutation({
    mutationFn: (fileData: EditSpaceFileWithoutImgRequest) =>
      editSpaceFileWithoutImgClient(fileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spaceFile'] })
    }
  })
  const editFileWithImg = useMutation({
    mutationFn: (fileData: EditSpaceFileWithImgRequest) =>
      editSpaceFileWithImgClient(fileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spaceFile'] })
    }
  })

  return { editFileWithoutImg, editFileWithImg }
}
