import { httpClient } from '@/shared/lib'
import { NextFetchOptions } from '@/shared/types'
import { SpaceMemberResponse } from '../model/type'

// 스페이스 맴버 조회
export const fetchSpaceMemberServer = async (
  spaceId: string,
  options?: NextFetchOptions
): Promise<SpaceMemberResponse> => {
  return await httpClient.get<SpaceMemberResponse>(
    `/api/v1/space/member/${spaceId}`,
    options
  )
}
