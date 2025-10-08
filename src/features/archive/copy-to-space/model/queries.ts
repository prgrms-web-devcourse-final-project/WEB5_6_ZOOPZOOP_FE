import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { postCopyFileToSpaceClient } from '../api/copyToSpace.client'
import { fetchSpaceListClient } from '@/entities/space'

//스페이스로 복사
export const useCopyToSpaceArchiveFilesQuery = () => {
  const queryClient = useQueryClient()
  const copyToSpace = useMutation({
    mutationFn: (payload: {
      spaceId: number | null
      dataSourceId: number[]
      targetFolderId: number
    }) => postCopyFileToSpaceClient(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['copyToSpace'] })
    }
  })

  return {
    copyToSpace
  }
}

// 스페이스 전체 목록
export const useFetchAllSpacesQuery = () => {
  const { data, isPending, isFetching } = useQuery({
    queryKey: ['spaceList'],
    queryFn: () =>
      fetchSpaceListClient({
        page: 0,
        size: 1000
      })
  })

  return {
    spaces: data,
    isPending,
    isFetching
  }
}
