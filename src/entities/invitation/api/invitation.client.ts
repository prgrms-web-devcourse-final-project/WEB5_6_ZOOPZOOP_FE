import { httpClient } from '@/shared/lib'
import {
  AcceptInviteResponse,
  InviteResult,
  Invitation,
  InvitationsResponse
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

// 알림 수락
export const acceptInvitationClient = async (
  inviteId: number
): Promise<InviteResult | null> => {
  const { data, msg, status } = await httpClient.post<AcceptInviteResponse>(
    `/api/invites/${inviteId}/accept`
  )

  if (status !== 200) {
    throw new Error(msg)
  }

  return data
}
