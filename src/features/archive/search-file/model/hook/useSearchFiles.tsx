import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { fetchSortedFilesClient } from '../../api/search.client'
import { SearchGetResponse, SearchQuery } from '../type'

export const useSearchFiles = (
  query: SearchQuery,
  options?: UseQueryOptions<SearchGetResponse>
) =>
  useQuery({
    queryKey: ['searchFiles', query],
    queryFn: () => fetchSortedFilesClient(query),
    staleTime: 1000 * 60,
    ...options
  })
