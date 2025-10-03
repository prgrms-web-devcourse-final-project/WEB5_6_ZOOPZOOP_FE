import { requireAuth } from '@/shared/lib/api-route'
import { fetchSpaceListServer } from './space.server'
import { FetchSpaceListParams, SpacePagination } from '../model/type'

// 서버 컴포넌트  API 호출 함수

/**
 *  space list initial data
 */
export const getInitialSpaceList = async (
  params: FetchSpaceListParams = {}
): Promise<SpacePagination | null> => {
  const response = await requireAuth(async token => {
    return fetchSpaceListServer(params, {
      token,
      next: { revalidate: 60, tags: ['space'] }
    })
  })
  if (response.status !== 200) {
    throw new Error(response.msg)
  }

  return response.data
}
