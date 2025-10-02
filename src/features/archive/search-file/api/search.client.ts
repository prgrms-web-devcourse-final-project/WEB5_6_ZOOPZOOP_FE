import { httpClient } from '@/shared/lib'
import { SearchGetResponse, SearchQuery } from '../model/type'

export const fetchSortedFilesClient = async ({
  sort,
  page,
  size
}: SearchQuery): Promise<SearchGetResponse> => {
  const response = httpClient.get<SearchGetResponse>(
    `/api/archive/search?page=${page}&size=${size}&sort=${sort}`
  )
  return response
}
