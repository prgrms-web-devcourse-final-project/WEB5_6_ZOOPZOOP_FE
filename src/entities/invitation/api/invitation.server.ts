import { httpClient } from '@/shared/lib'
import {
  AcceptInviteResponse,
  CancelInviteResponse,
  InvitationsResponse
} from '../model'
import { NextFetchOptions } from '@/shared/types'

// 알림 리스트 서버 함수
export const fetchInvitationsServer = async (
  options: NextFetchOptions
): Promise<InvitationsResponse> => {
  return await httpClient.get<InvitationsResponse>('/api/v1/invite', options)
}

// 알림 수락
export const acceptInvitationsServer = async (
  inviteId: number,
  options: NextFetchOptions
): Promise<AcceptInviteResponse> => {
  return await httpClient.post<AcceptInviteResponse>(
    `/api/v1/invite/${inviteId}/accept`,
    {},
    options
  )
}

// 알림 거절
export const cancelInvitationsServer = async (
  inviteId: number,
  options: NextFetchOptions
): Promise<CancelInviteResponse> => {
  return await httpClient.post<CancelInviteResponse>(
    `/api/v1/invite/${inviteId}/reject`,
    {},
    options
  )
}
