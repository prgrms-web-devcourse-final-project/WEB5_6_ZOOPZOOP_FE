import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { fetchNotificationsClient } from '../api'
import { Notification } from './type'

// 알림 목록 데이터 패칭
export const useNotificationQuery = (): UseQueryResult<
  Notification[] | null,
  Error
> => {
  return useQuery<Notification[] | null>({
    queryKey: ['notification'],
    queryFn: fetchNotificationsClient
  })
}
