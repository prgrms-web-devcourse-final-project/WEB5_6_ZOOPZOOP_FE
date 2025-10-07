import { httpClient } from '@/shared/lib'
import { NotificationResponse } from '../model'
import { NextFetchOptions } from '@/shared/types'

// 알림 리스트 서버 함수
export const fetchNotificationsServer = async (
  options: NextFetchOptions
): Promise<NotificationResponse> => {
  return await httpClient.get<NotificationResponse>('/api/v1/invite', options)
}
