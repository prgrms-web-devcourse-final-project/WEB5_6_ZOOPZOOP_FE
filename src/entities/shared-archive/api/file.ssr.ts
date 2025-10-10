import { requireAuth } from '@/shared/lib/api-route'
import {
  SearchSpaceFileGetResponse,
  SpaceFileByPageRequest
} from '../model/type'

import { fetchSpaceFilesByPageServer } from './file.server'

// 페이지 내 파일 조회
export const getInitialSpaceFileList = async (
  params: SpaceFileByPageRequest = {}
): Promise<SearchSpaceFileGetResponse> => {
  const response = await requireAuth(async token => {
    return fetchSpaceFilesByPageServer(params, {
      token,
      next: { revalidate: 60, tags: ['spaceFiles'] }
    })
  })

  if (response.status !== 200) {
    throw new Error(response.msg)
  }

  /* TODO: 백엔드랑 데이터 구조 맞춰야함 */
  return response as SearchSpaceFileGetResponse
}
