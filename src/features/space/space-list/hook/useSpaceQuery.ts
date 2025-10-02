import { fetchSpaceListClient, SpacePagination } from '@/entities/space'
import { useQuery } from '@tanstack/react-query'

interface SpaceQuery {
  pagination: { currentPage: number; size?: number; sort?: string[] }
  initialData: SpacePagination
}

export const useSpaceQuery = ({ pagination, initialData }: SpaceQuery) => {
  return useQuery({
    queryKey: ['space', pagination.currentPage],
    queryFn: () =>
      fetchSpaceListClient({
        page: pagination.currentPage,
        size: pagination.size,
        sort: pagination.sort
      }),
    initialData: initialData,
    staleTime: 60
  })
}
