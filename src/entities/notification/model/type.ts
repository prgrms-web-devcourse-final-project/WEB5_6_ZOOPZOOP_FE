import { APIResponse, ListPayload } from '@/shared/types'

export interface Notification {
  id: number // 초대 아이디
  name: string // 초대 스페이스 이름
  thumbnailUrl: string // 초대 스페이스 썸네일
}

// 알림 리스트 { space : T[] } 형탸
export type NotificationList = ListPayload<'spaces', Notification>

// 알림 리스트 response
export type NotificationResponse = APIResponse<NotificationList>
