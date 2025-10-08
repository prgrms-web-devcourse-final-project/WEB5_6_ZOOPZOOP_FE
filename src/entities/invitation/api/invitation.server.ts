import { httpClient } from '@/shared/lib'
import { InvitationsResponse } from '../model'
import { NextFetchOptions } from '@/shared/types'

// 알림 리스트 서버 함수
export const fetchInvitationsServer = async (
  options: NextFetchOptions
): Promise<InvitationsResponse> => {
  return await httpClient.get<InvitationsResponse>('/api/v1/invite', options)
}
