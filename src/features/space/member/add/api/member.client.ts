import { httpClient } from '@/shared/lib'
import { AddMemberRequest, AddMemberResponse } from '../model/type'

// 스페이스 새로운 맴버 초대
export const addSpaceMemberClient = async (
  payload: AddMemberRequest
): Promise<void> => {
  const { spaceId, ...restPayload } = payload
  const { data, msg, status } = await httpClient.post<AddMemberResponse>(
    `/api/space/${spaceId}/member`,
    restPayload
  )

  if (status !== 200 || !data) {
    throw new Error(msg)
  }
}
