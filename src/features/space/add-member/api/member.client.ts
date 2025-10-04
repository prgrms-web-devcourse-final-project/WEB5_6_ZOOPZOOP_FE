import { httpClient } from '@/shared/lib'
import { AddMemberRequest, AddMemberResponse } from '../model/type'

// 스페이스 새로운 맴버 초대
export const addSpaceMemberClient = async ({
  memberNames,
  spaceId
}: AddMemberRequest): Promise<void> => {
  const { data, msg, status } = await httpClient.post<AddMemberResponse>(
    '/api/space/member',
    {
      memberNames,
      spaceId
    }
  )

  if (status !== 200 || !data) {
    throw new Error(msg)
  }
}
