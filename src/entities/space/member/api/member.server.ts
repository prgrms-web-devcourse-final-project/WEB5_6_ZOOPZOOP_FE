import { httpClient } from '@/shared/lib'
import { NextFetchOptions } from '@/shared/types'
import {
  AddMemberResponse,
  ExpelMemberRequest,
  ExpelMemberResponse,
  SpaceAuthorityChangeRequest,
  SpaceAuthorityChangeResponse,
  SpaceMemberResponse,
  SpacePendingMemberResponse
} from '../model/type'

// 스페이스 맴버 조회
export const fetchSpaceMembersServer = async (
  spaceId: number,
  options?: NextFetchOptions
): Promise<SpaceMemberResponse> => {
  return await httpClient.get<SpaceMemberResponse>(
    `/api/v1/space/member/${spaceId}`,
    options
  )
}
// 스페이스 펜딩 유저 조회
export const fetchSpacePendingMembersServer = async (
  spaceId: number,
  options?: NextFetchOptions
): Promise<SpacePendingMemberResponse> => {
  return await httpClient.get<SpacePendingMemberResponse>(
    `/api/v1/space/member/invite/${spaceId}`,
    options
  )
}

// 업데이트 맴버 권한 업데이트
export const updateMemberAuthorityServer = async (
  payload: SpaceAuthorityChangeRequest,
  options?: NextFetchOptions
): Promise<SpaceAuthorityChangeResponse> => {
  const { spaceId, ...restPayload } = payload
  return await httpClient.put<SpaceAuthorityChangeResponse>(
    `/api/v1/space/member/${spaceId}`,
    restPayload,
    options
  )
}

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

// 스페이스 맴버 퇴출
export const expelMemberServer = async (
  payload: ExpelMemberRequest,
  options?: NextFetchOptions
): Promise<ExpelMemberResponse> => {
  const { spaceId, ...restPayload } = payload
  return httpClient.delete<ExpelMemberResponse>(
    `/api/v1/space/member/${spaceId}`,
    restPayload,
    options
  )
}
