'use client'

import { useFetchNotifications } from '@/features/notification'
import NotificationSkeletonList from './NotificationSkeletonList'
import { NotificationItem } from '@/entities/notification'

const NotificationList = () => {
  const { notifications, isPending } = useFetchNotifications()

  return (
    <div className="w-80 bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">알림</h3>
        </div>
      </div>

      {/* 바디 - 스크롤 영역 */}
      <ul className="max-h-80 overflow-y-auto">
        {isPending ? (
          <NotificationSkeletonList />
        ) : (
          <>
            {notifications.length > 0 ? (
              notifications.map(invite => (
                <NotificationItem
                  key={invite.id}
                  name={invite.name}
                  thumbnailUrl={invite.thumbnailUrl}
                  onSubmit={() => {}}
                  onCancel={() => {}}
                />
              ))
            ) : (
              <div className="py-12 px-4 text-center">
                <p className="text-xs text-slate-400">새로운 초대가 없습니다</p>
              </div>
            )}
          </>
        )}
      </ul>

      <div className="px-4 py-2.5 border-t border-slate-100">
        <button
          className="w-full text-xs text-slate-500 hover:text-slate-700
                     py-1 transition-colors">
          모든 알림 보기
        </button>
      </div>
    </div>
  )
}
export default NotificationList
