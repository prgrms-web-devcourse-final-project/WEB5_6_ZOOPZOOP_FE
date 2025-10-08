import { httpClient } from '@/shared/lib'
import {
  AddMemberRequest,
  AddMemberResponse,
  AuthorityChange,
  SpaceAuthorityChangeRequest,
  SpaceAuthorityChangeResponse
} from '../model'

// 스페이스 권한 업로드
export const updateMemberAuthorityClient = async (
  payload: SpaceAuthorityChangeRequest
): Promise<AuthorityChange | null> => {
  const { spaceId, ...restPayload } = payload

  const { data, msg, status } =
    await httpClient.put<SpaceAuthorityChangeResponse>(
      `/api/space/${spaceId}/member`,
      restPayload
    )

  if (status !== 200) {
    throw new Error(msg)
  }

  return data
}

// 스페이스 새로운 맴버 초대
export const addSpaceMemberClient = async (
  payload: AddMemberRequest
): Promise<void> => {
  const { spaceId, ...restPayload } = payload
  const { data, msg, status } = await httpClient.post<AddMemberResponse>(
    `/api/space/${spaceId}/member/invite`,
    restPayload
  )

  if (status !== 200 || !data) {
    throw new Error(msg)
  }
}
