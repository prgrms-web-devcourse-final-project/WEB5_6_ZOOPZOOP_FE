import { httpClient } from '@/shared/lib'
import { NextFetchOptions } from '@/shared/types'
import {
  SpaceAuthorityChangeRequest,
  SpaceAuthorityChangeResponse,
  SpaceMemberResponse,
  SpacePendingMemberResponse
} from '../model/type'

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
// 스페이스 펜딩 유저 조회
export const fetchSpacePendingMemberServer = async (
  spaceId: string,
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
