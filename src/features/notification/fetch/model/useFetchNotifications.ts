import { Notification, useNotificationQuery } from '@/entities/notification'
import { useEffect } from 'react'

export const useFetchNotifications = () => {
  const { data, isPending } = useNotificationQuery()

  useEffect(() => {
    // sse 구독
  }, [])

  return {
    isPending,
    notifications: (data ?? []) as Notification[]
  }
}
