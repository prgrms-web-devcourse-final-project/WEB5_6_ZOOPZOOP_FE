import { httpClient } from '@/shared/lib'
import {
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
