import { httpClient } from '@/shared/lib'
import { createCookieHeader, getAccessToken } from '@/shared/lib/api-route'
import { SearchGetResponse, SearchQuery } from '../model/type'

//검색
export const searchArchiveFilesServer = async () => {
  const token = await getAccessToken()

  const response = await httpClient.get<SearchGetResponse>(`/api/v1/archive`, {
    headers: createCookieHeader(token!),
    next: { revalidate: 30 }
  })

  return response
}

//정렬
export const sortArchiveFilesServer = async ({
  sort,
  page,
  size
}: SearchQuery) => {
  const token = await getAccessToken()

  const response = await httpClient.get<SearchGetResponse>(
    `/api/v1/archive?page=${page}&size=${size}&sort=${sort}`,
    {
      headers: createCookieHeader(token!),
      next: { revalidate: 30 }
    }
  )

  return response
}

// 페이지네이션
