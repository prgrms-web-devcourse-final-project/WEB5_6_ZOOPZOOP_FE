import { httpClient } from '@/shared/lib'
import { NextFetchOptions } from '@/shared/types'
import { AddMemberResponse } from '../model/type'

// 스페이스 새로운 맴버 초대
export const addSpaceMemberServer = async (
  payload: { memberNames: string[]; spaceId: string },
  options?: NextFetchOptions
): Promise<AddMemberResponse> => {
  const { spaceId, ...rest } = payload
  return httpClient.post<AddMemberResponse>(
    `/api/v1/space/member/${spaceId}`,
    rest,
    options
  )
}
