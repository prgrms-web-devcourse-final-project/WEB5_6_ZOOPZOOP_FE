import { SearchSpaceFileGetResponse, SpaceFileByPageRequest } from './type'
import {
  fetchSpaceFilesByFolderClient,
  fetchSpaceFilesClient
} from '../api/file.client'
import { useQuery } from '@tanstack/react-query'

interface PageQuery {
  query: SpaceFileByPageRequest
  initialData?: SearchSpaceFileGetResponse
}
//페이지 내 파일 조회
export const useSpaceFilesQuery = ({ query, initialData }: PageQuery) => {
  const { spaceId, page, sort, size, keyword, isActive } = query

  return useQuery({
    queryKey: ['spaceFile', spaceId, page, sort, keyword, isActive], //쿼리 키를 다르게 설정
    queryFn: () =>
      fetchSpaceFilesClient({
        spaceId,
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

//폴더 내 파일 조회
export const useSpaceFilesByFolderQuery = (
  spaceId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ['spaceFile', spaceId],
    queryFn: () => fetchSpaceFilesByFolderClient({ spaceId }),
    staleTime: 1000 * 60,
    enabled: options?.enabled
  })
}
