import { httpClient } from '@/shared/lib'
import {
  AddMemberRequest,
  AddMemberResponse,
  AuthorityChange,
  SpaceAuthorityChangeRequest,
  SpaceAuthorityChangeResponse,
  SpaceMember,
  SpaceMemberResponse,
  SpacePendingMember,
  SpacePendingMemberResponse
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

/**
 * 스페이스 멤버 목록 클라이언트 fetch api
 */
export const fetchSpaceMembersClient = async (
  spaceId: string
): Promise<SpaceMember> => {
  const { data, status, msg } = await httpClient.get<SpaceMemberResponse>(
    `/api/space/${spaceId}/member`
  )

  if (status !== 200 || !data) {
    throw new Error(msg)
  }

  return data
}

/**
 * 스페이스 멤버 목록 클라이언트 fetch api
 */
export const fetchSpacePendingMembersClient = async (
  spaceId: string
): Promise<SpacePendingMember> => {
  const { data, status, msg } =
    await httpClient.get<SpacePendingMemberResponse>(
      `/api/space/${spaceId}/member/invite`
    )

  if (status !== 200 || !data) {
    throw new Error(msg)
  }

  return data
}
