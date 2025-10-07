import { httpClient } from '@/shared/lib'
import { Notification, NotificationResponse } from '../model'

// 알림 리스트 패치
export const fetchNotificationsClient = async (): Promise<
  Notification[] | null
> => {
  const { data, msg, status } =
    await httpClient.get<NotificationResponse>('/api/notification')

  if (status !== 200 || !data) {
    throw new Error(msg)
  }

  // { space: Notification[] }에서 Notification[]를 바로 전달해준다.
  return data.spaces ?? null
}
