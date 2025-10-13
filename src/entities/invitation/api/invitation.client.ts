import { httpClient } from '@/shared/lib'
import {
  AcceptInviteResponse,
  InviteResult,
  Invitation,
  InvitationsResponse,
  CancelInviteResponse,
  InviteRequest
} from '../model'

// 알림 리스트 패치
export const fetchInvitationsClient = async (): Promise<
  Invitation[] | null
> => {
  const { data, msg, status } =
    await httpClient.get<InvitationsResponse>('/api/invites')

  if (status !== 200 || !data) {
    throw new Error(msg)
  }

  // { space: Notification[] }에서 Notification[]를 바로 전달해준다.
  return data.spaces ?? null
}

// 초대 수락
export const acceptInvitationClient = async (
  payload: InviteRequest
): Promise<InviteResult | null> => {
  const { inviteId, ...restPayload } = payload
  const { data, msg, status } = await httpClient.post<AcceptInviteResponse>(
    `/api/invites/${inviteId}/accept`,
    restPayload
  )

  if (status !== 200) {
    throw new Error(msg)
  }

  return data
}

// 초대 거절
export const cancelInvitationClient = async (
  payload: InviteRequest
): Promise<InviteResult | null> => {
  const { inviteId, ...restPayload } = payload
  const { data, msg, status } = await httpClient.post<CancelInviteResponse>(
    `/api/invites/${inviteId}/reject`,
    restPayload
  )

  if (status !== 200) {
    throw new Error(msg)
  }

  return data
}
